"use client";

import { useState } from "react";
import { LayoutGrid, Plus, TableIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initialBlogs } from "@/lib/data/data";
import { AddBlogDialog } from "@/components/Blogs/add-blog-dialog";
import { DashboardShell } from "@/components/Share/dashboard-shell";
import { BlogCard } from "@/components/Blogs/blog-card";
import { DashboardHeader } from "@/components/Share/dashboard-header";
import { BlogsTable } from "@/components/Blogs/blogs-table";
import { deleteblog } from "@/services/blogs";
import { toast } from "sonner";

export default function BlogsPage({ data }: { data: any }) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [open, setOpen] = useState(false);

  const addBlog = (blog: any) => {
    setBlogs([
      ...blogs,
      { ...blog, id: Date.now().toString(), date: new Date().toISOString() },
    ]);
    setOpen(false);
  };

  const handileClickDelete = async (id: string) => {
    const reuslt = await deleteblog(id);
    if (reuslt.success) {
      toast.success(reuslt?.message);
    }
  };
  return (
    <DashboardShell>
      <DashboardHeader heading="Blogs" description="Manage your blog posts.">
        <Button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Blog
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex justify-end mb-4">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Grid View</span>
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <TableIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Table View</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((blog: any) => (
              <BlogCard
                key={blog?._id}
                blog={blog}
                onDelete={handileClickDelete}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-0">
          <BlogsTable blogs={blogs} onDelete={handileClickDelete} />
        </TabsContent>
      </Tabs>

      <AddBlogDialog open={open} setOpen={setOpen} onAdd={addBlog} />
    </DashboardShell>
  );
}
