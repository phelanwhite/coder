import Loader from "@/components/form/loader";
import CheckboxField from "@/components/form/CheckboxField";
import InputField from "@/components/form/InputField";
import TextAreaField from "@/components/form/TextAreaField";
import axiosConfig from "@/configs/axios-config";
import { useAddressStore } from "@/stores/address-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";

const AddressBookCreateUpdatePage = () => {
  const { id } = useParams();

  const { createAddress, updateAddressById } = useAddressStore();
  const createUpdateResult = useMutation({
    mutationFn: async () => {
      if (isAdd) {
        return await createAddress(formValue);
      } else if (!isAdd && id) {
        return await updateAddressById(id, formValue);
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
    queryKey: ["address", id],
    queryFn: async () => {
      const url = `address/get-id/${id}`;
      return (await axiosConfig.get(url)).data;
    },
    enabled: !!id,
  });
  useEffect(() => {
    getDataById.data && setFormValue(getDataById.data?.data);
  }, [getDataById.data]);

  const location = useLocation();
  const [isAdd, setIsAdd] = useState(true);
  useEffect(() => {
    if (location.pathname.includes(`edit`)) {
      setIsAdd(false);
    } else setIsAdd(true);
  }, [location.pathname]);

  const [formValue, setFormValue] = useState({
    name: "",
    company: "",
    phone: "",
    address: "",
    ward: "",
    district: "",
    city: "",
    country: "",
    state: "",
    isDefault: false,
  });
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createUpdateResult.mutate();
  };

  if (createUpdateResult.isPending) return <Loader />;

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <InputField
          required
          label="Name"
          name="name"
          value={formValue.name || ""}
          onChange={handleInputChange}
        />
        <InputField
          label="company"
          name="company"
          value={formValue.company || ""}
          onChange={handleInputChange}
        />

        <InputField
          label="phone"
          name="phone"
          value={formValue.phone || ""}
          onChange={handleInputChange}
        />
        <InputField
          label="Ward"
          name="ward"
          value={formValue.ward || ""}
          onChange={handleInputChange}
        />
        <InputField
          label="district"
          name="district"
          value={formValue.district || ""}
          onChange={handleInputChange}
        />
        <InputField
          label="Province/City"
          name="city"
          value={formValue.city || ""}
          onChange={handleInputChange}
        />
        <InputField
          label="country"
          name="country"
          value={formValue.country || ""}
          onChange={handleInputChange}
        />
        <TextAreaField
          required
          label="address"
          name="address"
          value={formValue.address || ""}
          onChange={handleInputChange}
        />
        <CheckboxField
          label="Set as default address"
          name="isDefault"
          checked={formValue.isDefault}
          onChange={(e) =>
            setFormValue((prev) => ({ ...prev, isDefault: e.target.checked }))
          }
        />

        <button
          type="submit"
          disabled={createUpdateResult.isPending}
          className="btn btn-primary"
        >
          {isAdd ? `Add` : `Update`}
        </button>
      </form>
    </div>
  );
};

export default AddressBookCreateUpdatePage;
