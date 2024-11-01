import IMAGES_DEFAULT from "@/assets/constants/image";
import InputField from "@/components/form/InputField";
import Loader from "@/components/form/loader";
import TextEditor from "@/components/form/text-editor";
import axiosConfig from "@/configs/axios-config";
import { useBrandStore } from "@/stores/brand-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";

const BrandPageCreateUpdatePage = () => {
  const { id } = useParams();

  const { createBrand, updateBrandById } = useBrandStore();
  const createUpdateResult = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      Object.entries(formValue).forEach((item) => {
        formData.append(item[0], item[1]);
      });
      if (file) {
        formData.append("file", file);
      }
      if (isCreate) {
        return await createBrand(formData);
      } else if (!isCreate && id) {
        return await updateBrandById(id, formData);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const getDataById = useQuery({
    queryKey: ["category", id],
    queryFn: async () => {
      const url = `category/get-id/${id}`;
      return (await axiosConfig.get(url)).data;
    },
    enabled: !!id,
  });
  useEffect(() => {
    getDataById.data && setFormValue(getDataById.data?.data);
  }, [getDataById.data]);

  const location = useLocation();
  const [isCreate, setIsCreate] = useState(true);
  useEffect(() => {
    if (location.pathname.includes(`update`)) {
      setIsCreate(false);
    } else setIsCreate(true);
  }, [location.pathname]);

  const [file, setFile] = useState<File | null>(null);

  const [formValue, setFormValue] = useState({
    name: "",
    thumbnail: "",
    description: ``,
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUpdateResult.mutate();
  };

  if (getDataById.isLoading || createUpdateResult.isPending) return <Loader />;

  return (
    <div>
      <form
        action=""
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {/* file */}
        <label
          htmlFor="file"
          className="block w-[150px] aspect-video overflow-hidden rounded cursor-pointer"
        >
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : formValue.thumbnail
                ? formValue.thumbnail
                : IMAGES_DEFAULT.thumbnail_notFound
            }
            loading="lazy"
            alt=""
          />
          <input
            type="file"
            id="file"
            name="file"
            accept="images/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] as File)}
          />
        </label>
        <InputField
          required
          label="name"
          name="name"
          value={formValue.name}
          onChange={handleInputChange}
        />
        <TextEditor label="description" />
        <button
          type="submit"
          disabled={createUpdateResult.isPending}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BrandPageCreateUpdatePage;
