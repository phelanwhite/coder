"use client";
import Loader from "@/components/feedback/loader";
import { uploadImage } from "@/config/cloudinary-config";
import { useFileStore } from "@/store/file-store";
import { useMutation } from "@tanstack/react-query";
import { memo, useState } from "react";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";

const FileForm = ({ id }: { id: string }) => {
  const { createFile } = useFileStore();
  const createFileResult = useMutation({
    mutationFn: async () => {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await uploadImage(formData);

        return await createFile({
          taskId: id,
          file: response,
        });
      }
    },
    onSuccess: (data) => {
      toast.success("File uploaded successfully!");
      setFile(null);
    },
    onError: (error) => {
      console.log({ error });
      toast.error("File upload failed!");
    },
  });
  const [file, setFile] = useState<File | null>(null);
  if (createFileResult.isPending) return <Loader />;
  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        id="file"
        name="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files?.[0] as File);
        }}
      />
      {file && (
        <button
          onClick={() => createFileResult.mutate()}
          className="flex items-center gap-2 bg-gray-300 text-xs px-2.5 py-1.5 rounded"
        >
          <FaUpload /> Upload File
        </button>
      )}
    </div>
  );
};

export default memo(FileForm);
