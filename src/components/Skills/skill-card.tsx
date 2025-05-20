"use client";

import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Progress } from "@/components/ui/progress";
import { EditSkillDialog } from "./edit-skill-dialog";

export function SkillCard({ skill, onDelete }: { skill: any; onDelete: any }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="border-none shadow-md transition-all hover:shadow-lg">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{skill.name}</CardTitle>
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
              <DropdownMenuItem onClick={() => onDelete(skill.id)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium">Proficiency</span>
          <span className="text-sm font-medium text-amber-600">
            {skill.level}%
          </span>
        </div>
        <Progress
          value={skill.level}
          className="h-2"
          style={
            {
              background:
                "linear-gradient(to right, rgb(251, 191, 36, 0.2), rgb(245, 158, 11, 0.2))",
              "--progress-background":
                "linear-gradient(to right, rgb(251, 191, 36), rgb(245, 158, 11))",
            } as any
          }
        />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="text-sm text-muted-foreground">
          {skill.yearsOfExperience}{" "}
          {skill.yearsOfExperience === 1 ? "year" : "years"} of experience
        </div>
      </CardFooter>
      <EditSkillDialog open={open} setOpen={setOpen} skill={skill} />
    </Card>
  );
}
