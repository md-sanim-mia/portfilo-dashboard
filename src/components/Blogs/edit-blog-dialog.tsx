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
import { Textarea } from "@/components/ui/textarea";

export function EditBlogDialog({
  open,
  setOpen,
  blog,
}: {
  open: any;
  setOpen: any;
  blog: any;
}) {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    image: "",
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        tags: blog.tags ? blog.tags.join(", ") : "",
        image: blog.image || "",
      });
    }
  }, [blog]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // In a real app, you would update the blog here
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Make changes to your blog post.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="A brief summary of your blog post"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="min-h-[120px]"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="React, Web Development, JavaScript"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Featured Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
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
