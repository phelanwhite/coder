import IMAGES_DEFAULT from "@/assets/constants/image";
import ButtonHighlight from "@/components/form/ButtonHighlight";
import CheckboxField from "@/components/form/CheckboxField";
import InputField from "@/components/form/InputField";
import Loader from "@/components/form/loader";
import SelectField from "@/components/form/SelectField";
import TextEditor from "@/components/form/text-editor";
import axiosConfig from "@/configs/axios-config";
import { useProductStore } from "@/stores/product-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";

const ProductCreateUpdatePage = () => {
  const { id } = useParams();

  const { createProduct, updateProductById } = useProductStore();
  const createUpdateResult = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      Object.entries(formValue).forEach((item) => {
        if (Array.isArray(item[1])) {
          item[1].forEach((value) => {
            formData.append(item[0], value);
          });
        } else if (item[1]) {
          formData.append(item[0], item[1] as string);
        }
      });
      if (file_thumbnail) {
        formData.append("file_thumbnail", file_thumbnail);
      }
      if (file_images) {
        Array.from(file_images).forEach((item) =>
          formData.append(`file_images`, item)
        );
      }
      if (isCreate) {
        return await createProduct(formData);
      } else if (!isCreate && id) {
        return await updateProductById(id, formData);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const getDataByIdResult = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const url = `product/get-id/${id}`;
      return (await axiosConfig.get(url)).data;
    },
    enabled: !!id,
  });
  useEffect(() => {
    getDataByIdResult.data &&
      setFormValue((prev) => ({
        ...prev,
        ...getDataByIdResult.data?.data,
        brand: getDataByIdResult.data?.data?.brand?._id,
        category: getDataByIdResult.data?.data?.category?._id,
      }));
  }, [getDataByIdResult.data]);

  const location = useLocation();
  const [isCreate, setIsCreate] = useState(true);
  useEffect(() => {
    if (location.pathname.includes(`update`)) {
      setIsCreate(false);
    } else setIsCreate(true);
  }, [location.pathname]);

  const [file_thumbnail, setFile_thumbnail] = useState<File | null>(null);
  const [file_images, setFile_images] = useState<FileList | null>(null);

  const [formValue, setFormValue] = useState({
    name: "",
    thumbnail: "",
    images: [],
    quantity: 0,
    price: 0,
    original_price: 0,
    discount: 0,
    description: ``,
    brand: ``,
    category: ``,
    imported: ``,

    configurable_options: ``,
    specifications: ``,
    highlight: [],

    isActive: true,
  });
  console.log({ formValue });

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

  const categoriesResult = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const url = "category/get-all";
      return (await axiosConfig.get(url)).data;
    },
  });
  const categoriesData = useMemo(() => {
    const data: any[] = categoriesResult.data?.data?.results?.map(
      (item: any) => ({
        label: item.name,
        value: item._id,
      })
    );
    data?.unshift({
      label: "---Select Brand---",
      value: "",
    });
    return data;
  }, [categoriesResult.data]);

  const brandsResult = useQuery({
    queryKey: ["brand"],
    queryFn: async () => {
      const url = "brand/get-all";
      return (await axiosConfig.get(url)).data;
    },
  });
  const brandsData = useMemo(() => {
    const data: any[] = brandsResult.data?.data?.results?.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));
    data?.unshift({
      label: "---Select Brand---",
      value: "",
    });
    return data;
  }, [brandsResult.data]);

  if (getDataByIdResult.isLoading || createUpdateResult.isPending)
    return <Loader />;

  return (
    <div>
      <form
        action=""
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {/* file_thumbnail */}
        <label
          htmlFor="file_thumbnail"
          className="block p-1 border w-[150px] aspect-video overflow-hidden rounded cursor-pointer"
        >
          <img
            src={
              file_thumbnail
                ? URL.createObjectURL(file_thumbnail)
                : formValue.thumbnail
                ? formValue.thumbnail
                : IMAGES_DEFAULT.thumbnail_notFound
            }
            loading="lazy"
            alt=""
          />
          <input
            type="file"
            id="file_thumbnail"
            name="file_thumbnail"
            accept="images/*"
            className="hidden"
            onChange={(e) => setFile_thumbnail(e.target.files?.[0] as File)}
          />
        </label>
        <InputField
          required
          label="name"
          name="name"
          value={formValue.name}
          onChange={handleInputChange}
        />
        <InputField
          label="Quantity"
          name="quantity"
          type="number"
          min={0}
          value={formValue.quantity}
          onChange={handleInputChange}
        />
        <InputField
          label="Price"
          name="original_price"
          type="number"
          min={0}
          value={formValue.original_price}
          onChange={handleInputChange}
        />
        <InputField
          label="Discount"
          name="discount"
          type="number"
          min={0}
          value={formValue.discount}
          onChange={handleInputChange}
        />
        <SelectField
          label="brand"
          name="brand"
          value={formValue.brand}
          onChange={handleInputChange}
          options={brandsData}
        />
        <SelectField
          label="category"
          name="category"
          value={formValue.category}
          onChange={handleInputChange}
          options={categoriesData}
        />
        <InputField
          label="images"
          name="file_images"
          type="file"
          multiple
          onChange={(e) => setFile_images(e.target.files)}
        />
        {/* preview images  */}
        <div>
          {file_images && file_images?.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              {Array.from(file_images)?.map((file, index) => (
                <div
                  key={index}
                  className="block w-[150px] overflow-hidden rounded cursor-pointer p-1 border"
                >
                  <img src={URL.createObjectURL(file)} loading="lazy" alt="" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-2 flex-wrap">
              {formValue.images?.map((file, index) => (
                <div
                  key={index}
                  className="block w-[100px] md:w-[150px] aspect-video overflow-hidden rounded cursor-pointer p-1 border"
                >
                  <img src={file} loading="lazy" alt="" />
                </div>
              ))}
            </div>
          )}
        </div>
        <CheckboxField
          label="Set as is active"
          name="isActive"
          checked={formValue.isActive}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, isActive: e.target.checked }))
          }
        />
        <ButtonHighlight
          label="Highlight"
          datas={formValue.highlight}
          setDatas={(e) => {
            setFormValue((prev) => ({ ...prev, highlight: e }));
          }}
        />
        <TextEditor
          label="description"
          value={formValue?.description}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, description: e }))
          }
        />
        <button
          disabled={createUpdateResult.isPending}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductCreateUpdatePage;
