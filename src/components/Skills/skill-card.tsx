"use client";

import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
        <div className="flex items-center gap-3">
          <img
            src={skill?.image}
            alt={skill?.category}
            className="w-12 h-12 rounded object-cover border"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              {skill.name}
            </h3>
            <p className="text-xs text-gray-500 break-all">{skill.category}</p>
          </div>
        </div>
      </CardContent>

      <EditSkillDialog open={open} setOpen={setOpen} skill={skill} />
    </Card>
  );
}
