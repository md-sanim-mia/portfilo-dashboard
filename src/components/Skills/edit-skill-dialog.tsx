"use client";

import { useState, useEffect } from "react";

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

export function EditSkillDialog({
  open,
  setOpen,
  skill,
}: {
  open: any;
  setOpen: any;
  skill: any;
}) {
  const [formData, setFormData] = useState({
    name: "",
    level: 50,
    yearsOfExperience: 1,
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name || "",
        level: skill.level || 50,
        yearsOfExperience: skill.yearsOfExperience || 1,
      });
    }
  }, [skill]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (value: any) => {
    setFormData((prev) => ({ ...prev, level: value[0] }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // In a real app, you would update the skill here
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
            <DialogDescription>Make changes to your skill.</DialogDescription>
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
                value={[formData.level]}
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
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
