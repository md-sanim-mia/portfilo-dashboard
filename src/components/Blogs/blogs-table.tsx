"use client";

import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditBlogDialog } from "./edit-blog-dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function BlogsTable({ blogs, onDelete }: { blogs: any; onDelete: any }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [open, setOpen] = useState(false);

  const filteredBlogs = blogs.filter(
    (blog: any) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag: any) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleEdit = (blog: any) => {
    setEditingBlog(blog);
    setOpen(true);
  };

  return (
    <div className="rounded-md border shadow-sm">
      <div className="p-4 flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search blogs..."
            className="pl-8 w-full md:max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? "s" : ""}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Tags</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBlogs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No blogs found.
              </TableCell>
            </TableRow>
          ) : (
            filteredBlogs.map((blog: any) => (
              <TableRow key={blog.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{blog.title}</div>
                    <div className="text-sm text-muted-foreground md:hidden">
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.map((tag: any, index: any) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(blog.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(blog)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(blog.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {editingBlog && (
        <EditBlogDialog open={open} setOpen={setOpen} blog={editingBlog} />
      )}
    </div>
  );
}
