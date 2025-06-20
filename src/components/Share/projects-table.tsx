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
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function ProjectsTable({
  projects,
  onDelete,
}: {
  projects: any;
  onDelete: any;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProjects = projects?.filter(
    (project: any) =>
      project?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project?.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project?.technologies.some((tech: any) =>
        tech?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  //   const handleEdit = (project) => {
  //     setEditingProject(project);
  //     setOpen(true);
  //   };

  return (
    <div className="rounded-md border shadow-sm">
      <div className="p-4 flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8 w-full md:max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          {filteredProjects?.length} project
          {filteredProjects?.length !== 1 ? "s" : ""}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Technologies</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No projects found.
              </TableCell>
            </TableRow>
          ) : (
            filteredProjects?.map((project: any) => (
              <TableRow key={project?._id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{project?.title}</div>
                    <div className="text-sm text-muted-foreground md:hidden">
                      {project?.createdAt}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {project?.technologies?.map((tech: any, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {project?.createdAt}
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
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(project?._id)}>
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
      {/* {editingProject && <EditProjectDialog open={open} setOpen={setOpen} project={editingProject} />} */}
    </div>
  );
}
