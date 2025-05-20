"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export function AddSkillDialog({
  open,
  setOpen,
  onAdd,
}: {
  open: any;
  setOpen: any;
  onAdd: any;
}) {
  const [formData, setFormData] = useState({
    name: "",
    level: 50,
    yearsOfExperience: 1,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (value: any) => {
    setFormData((prev) => ({ ...prev, level: value[0] }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      level: 50,
      yearsOfExperience: 1,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
            <DialogDescription>
              Add a new skill to your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="level">Proficiency Level</Label>
                <span className="text-sm">{formData.level}%</span>
              </div>
              <Slider
                id="level"
                defaultValue={[formData.level]}
                max={100}
                step={1}
                onValueChange={handleSliderChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="yearsOfExperience">Years of Experience</Label>
              <Input
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="number"
                min={0}
                step={0.5}
                value={formData.yearsOfExperience}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Skill</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
