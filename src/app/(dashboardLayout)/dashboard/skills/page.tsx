"use client";

import { useState } from "react";
import { LayoutGrid, Plus, TableIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initialSkills } from "@/lib/data/data";
import { DashboardShell } from "@/components/Share/dashboard-shell";
import { DashboardHeader } from "@/components/Share/dashboard-header";
import { AddSkillDialog } from "@/components/Skills/add-skill-dialog";
import { SkillsTable } from "@/components/Skills/skills-table";
import { SkillCard } from "@/components/Skills/skill-card";

export default function SkillsPage() {
  const [skills, setSkills] = useState(initialSkills);
  const [open, setOpen] = useState(false);

  const addSkill = (skill: any) => {
    setSkills([...skills, { ...skill, id: Date.now().toString() }]);
    setOpen(false);
  };

  const deleteSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Skills"
        description="Manage your professional skills."
      >
        <Button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} onDelete={deleteSkill} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-0">
          <SkillsTable skills={skills} onDelete={deleteSkill} />
        </TabsContent>
      </Tabs>

      <AddSkillDialog open={open} setOpen={setOpen} onAdd={addSkill} />
    </DashboardShell>
  );
}
