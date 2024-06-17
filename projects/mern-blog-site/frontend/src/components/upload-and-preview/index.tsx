import React, { FC, memo, useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";

interface IUploadAndPreview extends React.ComponentProps<"input"> {
  previewUrl: string;
  setFileData: (file: File) => void;
}
const UploadAndPreview: FC<IUploadAndPreview> = ({
  id,
  previewUrl,
  setFileData,
  ...props
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>(null);
  useEffect(() => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setFileData(file);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [file]);

  return (
    <div className="aspect-video rounded-lg overflow-hidden relative cursor-pointer">
      <label htmlFor={id}>
        <input
          className="hidden"
          type="file"
          id={id}
          onChange={(e) => setFile(e.target.files?.[0] as File)}
          {...props}
        />
        {file || previewUrl ? (
          <img src={file ? preview : previewUrl} alt="" loading="lazy" />
        ) : (
          <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-stone-100 text-black cursor-pointer">
            <div className="text-xs font-semibold flex flex-col gap-2 items-center">
              <div>Upload And Preview</div>
              <FaUpload size={24} />
            </div>
          </div>
        )}
      </label>
    </div>
  );
};

export default memo(UploadAndPreview);
