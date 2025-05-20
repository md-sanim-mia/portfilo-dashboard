import { cn } from "@/lib/utils";
import { Input } from "../../input";
import React from "react";
type TImageUploader = {
  label?: string;
  className?: string;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
};
const NMImageUploader = ({
  label = "Upload Images",
  className,
  setImageFiles,
  setImagePreview,
}: TImageUploader) => {
  const handileChengeIame = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageFiles((prven) => [...prven, file]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prevn) => [...prevn, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  };
  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handileChengeIame}
      />
      <label
        htmlFor="image-upload"
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
      >
        {label}
      </label>
    </div>
  );
};

export default NMImageUploader;
