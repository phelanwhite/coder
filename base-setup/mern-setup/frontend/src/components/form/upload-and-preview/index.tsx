import React, { FC, memo, useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
interface IUploadAndPreview extends React.ComponentProps<"input"> {
  avatar?: boolean;
  dataListURL?: string[];
  setDataListURL?: React.Dispatch<React.SetStateAction<FileList | null>>;
}

const UploadAndPreview: FC<IUploadAndPreview> = ({
  avatar,
  dataListURL,
  setDataListURL,
  ...props
}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (dataListURL) {
      setPreviews(dataListURL);
    }
  }, [dataListURL]);

  // previews
  useEffect(() => {
    if (files) {
      const newUrl = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviews(newUrl);
    }
  }, [files]);

  useEffect(() => {
    if (files && setDataListURL) {
      setDataListURL(files);
    }
  }, [files]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {/* input upload */}
        <div className="relative aspect-video w-[150px] border rounded cursor-pointer">
          <label htmlFor="file">
            <input
              accept="image/*"
              type="file"
              id="file"
              name="file"
              className="hidden"
              onChange={(e) => setFiles(e.target.files)}
              {...props}
            />
            <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center cursor-pointer">
              <div className="flex flex-col gap-2 items-center">
                <div className="font-semibold text-xs">Upload And Preview</div>
                <FaUpload size={20} />
                <div className="font-semibold text-[10px]">
                  Browse files to upload
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* previews  */}
        {previews.map((preview, index) => (
          <div key={index} className="aspect-video w-[150px]">
            <img src={preview} alt={preview} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(UploadAndPreview);
