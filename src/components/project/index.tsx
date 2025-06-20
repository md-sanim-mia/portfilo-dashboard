"use client";

import { LayoutGrid, Plus, TableIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/Share/dashboard-header";
import { DashboardShell } from "@/components/Share/dashboard-shell";
import { ProjectCard } from "@/components/Share/project-card";
import { ProjectsTable } from "@/components/Share/projects-table";
import { deleteProject } from "@/services/project";
import { toast } from "sonner";
import Link from "next/link";

export default function ProjectsPage({ projects }: { projects: any }) {
  // const addProject = (project) => {
  //   setProjects([...projects, { ...project, id: Date.now().toString() }]);
  //   setOpen(false);
  // };

  const handileClickDelete = async (id: string) => {
    const reuslt = await deleteProject(id);
    if (reuslt?.success) {
      toast.success(reuslt?.message);
    }
  };
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Projects"
        description="Manage your portfolio projects."
      >
        <Link href={"/dashboard/add-project"}>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </Link>
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
            {projects?.map((project: any) => (
              <ProjectCard
                key={project?._id}
                project={project}
                onDelete={deleteProject}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-0">
          <ProjectsTable projects={projects} onDelete={handileClickDelete} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
