"use client";

import { useState } from "react";
import { LayoutGrid, Plus, TableIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardShell } from "@/components/Share/dashboard-shell";
import { DashboardHeader } from "@/components/Share/dashboard-header";
import { AddSkillDialog } from "@/components/Skills/add-skill-dialog";
import { SkillsTable } from "@/components/Skills/skills-table";
import { SkillCard } from "@/components/Skills/skill-card";
import { deleteskill } from "@/services/skill";
import { toast } from "sonner";

export default function SkillsPage({ skills }: { skills: any }) {
  const [open, setOpen] = useState(false);

  const handileClickDelete = async (id: string) => {
    const reuslt = await deleteskill(id);
    if (reuslt?.success) {
      toast.success(reuslt?.message);
    }
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
            {skills?.map((skill: any) => (
              <SkillCard
                key={skill?._id}
                skill={skill}
                onDelete={handileClickDelete}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-0">
          <SkillsTable skills={skills} onDelete={handileClickDelete} />
        </TabsContent>
      </Tabs>

      <AddSkillDialog
        open={open}
        setOpen={setOpen}
        onAdd={handileClickDelete}
      />
    </DashboardShell>
  );
}
