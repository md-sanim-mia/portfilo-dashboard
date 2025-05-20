"use client";

import { useState } from "react";
import { Edit, ExternalLink, MoreHorizontal, Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
// import { EditProjectDialog } from "./edit-project-dialog";
// '']
export function ProjectCard({
  project,
  onDelete,
}: {
  project: any;
  onDelete: any;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="group overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg?height=192&width=384"}
          alt={project.title}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <h3 className="text-lg font-bold">{project.title}</h3>
        </div>
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1 text-lg">
            {project.title}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(project.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2 mt-1">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech: any, index: number) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="text-sm text-muted-foreground">
          {new Date(project.date).toLocaleDateString()}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 group-hover:bg-purple-600 group-hover:text-white transition-colors"
          asChild
        >
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            View
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardFooter>
      {/* <EditProjectDialog open={open} setOpen={setOpen} project={project} /> */}
    </Card>
  );
}
