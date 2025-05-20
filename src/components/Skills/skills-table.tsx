"use client";

import { useState } from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
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
import { EditSkillDialog } from "./edit-skill-dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function SkillsTable({
  skills,
  onDelete,
}: {
  skills: any;
  onDelete: any;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);
  const [open, setOpen] = useState(false);

  const filteredSkills = skills.filter((skill: any) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (skill: any) => {
    setEditingSkill(skill);
    setOpen(true);
  };

  return (
    <div className="rounded-md border shadow-sm">
      <div className="p-4 flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search skills..."
            className="pl-8 w-full md:max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ml-auto text-sm text-muted-foreground">
          {filteredSkills.length} skill{filteredSkills.length !== 1 ? "s" : ""}
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Skill</TableHead>
            <TableHead>Proficiency</TableHead>
            <TableHead className="hidden md:table-cell">Experience</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSkills.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No skills found.
              </TableCell>
            </TableRow>
          ) : (
            filteredSkills.map((skill: any) => (
              <TableRow key={skill.id}>
                <TableCell className="font-medium">{skill.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={skill.level}
                      className="h-2 w-full max-w-[100px]"
                      style={
                        {
                          background:
                            "linear-gradient(to right, rgb(251, 191, 36, 0.2), rgb(245, 158, 11, 0.2))",
                          "--progress-background":
                            "linear-gradient(to right, rgb(251, 191, 36), rgb(245, 158, 11))",
                        } as any
                      }
                    />
                    <span className="text-xs font-medium text-amber-600">
                      {skill.level}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {skill.yearsOfExperience}{" "}
                  {skill.yearsOfExperience === 1 ? "year" : "years"}
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
                      <DropdownMenuItem onClick={() => handleEdit(skill)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(skill.id)}>
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
      {editingSkill && (
        <EditSkillDialog open={open} setOpen={setOpen} skill={editingSkill} />
      )}
    </div>
  );
}
