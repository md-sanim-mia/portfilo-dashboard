"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProject } from "@/services/project";

export default function AddProductsForm() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      duration: "",
      completionDate: "",
      technologies: [""],
      github: "",
      live: "",
      features: [{ title: "", description: "" }],
      challenges: [{ title: "", description: "", solution: "" }],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const { append: appendSpec, fields: specFields } = useFieldArray({
    control: form.control,
    name: "features",
  });
  const { append: appendChallenges, fields: ChallengesFields } = useFieldArray({
    control: form.control,
    name: "challenges",
  });

  const addChallenge = () => {
    appendChallenges({ title: "", description: "", solution: "" });
  };
  const addSpec = () => {
    appendSpec({ title: "", description: "" });
  };

  // console.log(specFields);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const [categoriesData, brandsData] = await Promise.all([
  //       getAllCategorys(),
  //       getAllBrands(),
  //     ]);

  //     setCategories(categoriesData?.data);
  //     setBrands(brandsData?.data);
  //   };
  //   fetchData();
  // }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    // console.log({ availableColors, keyFeatures, specification });

    const modifiedData = {
      ...data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));

    for (const file of imageFiles) {
      formData.append("images", file);
    }
    try {
      const res = await createProject(formData);
      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/projects");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto flex justify-center">
      <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 ">
        <div className="flex items-center space-x-4 mb-5 ">
          {/* <Logo /> */}

          <h1 className="text-xl font-bold">Add Project</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center border-t border-b py-3 my-5">
              <p className="text-primary font-bold text-xl">
                Basic Information
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Completion Date</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github Link </FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="live"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Link</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="my-5">
              <FormField
                control={form.control}
                name="technologies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Technologies</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="my-5">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-36 resize-none"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <div className="flex justify-between items-center border-t border-b py-3 my-5">
                <p className="text-primary font-bold text-xl">Images</p>
              </div>
              <div className="flex gap-4 ">
                <NMImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Image"
                  className="w-fit mt-0"
                />
                <ImagePreviewer
                  className="flex flex-wrap gap-4"
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center border-t border-b py-3 my-5">
                <p className="text-primary font-bold text-xl">Key Features</p>
                <Button
                  onClick={addSpec}
                  variant="outline"
                  className="size-10"
                  type="button"
                >
                  <Plus className="text-primary" />
                </Button>
              </div>

              {specFields.map((specField, index) => (
                <div key={specField.id} className="grid grid-cols-1 gap-5 my-5">
                  <FormField
                    control={form.control}
                    name={`features.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feature title {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`features.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feature Description {index + 1}</FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-28 resize-none"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="flex justify-between items-center border-t border-b py-3 my-5">
                <p className="text-primary font-bold text-xl">Challenges </p>
                <Button
                  onClick={addChallenge}
                  variant="outline"
                  className="size-10"
                  type="button"
                >
                  <Plus className="text-primary" />
                </Button>
              </div>

              {ChallengesFields.map((specField, index) => (
                <div key={specField.id} className="grid grid-cols-1 gap-5 my-5">
                  <FormField
                    control={form.control}
                    name={`challenges.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Challenge Title {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`challenges.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Challenge Description {index + 1}</FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-28 resize-none"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`challenges.${index}.solution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Challenge Solution {index + 1}</FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-28 resize-none"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <Button
              type="submit"
              className="mt-5 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Project....." : "Add Project"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
