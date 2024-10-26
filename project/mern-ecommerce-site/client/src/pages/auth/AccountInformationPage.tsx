import IMAGES_DEFAULT from "@/assets/constants/image";
import { ChangeEvent, useEffect, useState } from "react";
import InputField from "@/components/form/InputField";
import SelectField from "@/components/form/SelectField";
import { getCountries } from "@/services/country-api";
import { gender } from "@/assets/constants/common";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "@/components/form/loader";

const AccountInformationPage = () => {
  const { user, getMe, updateProfile } = useAuthStore();
  const updateProfileResult = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      Object.entries(formValue).forEach((item) => {
        formData.append(item[0], item[1]);
      });
      if (file) {
        formData.append("file", file);
      }
      return await updateProfile(formData);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const getMeResult = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      return await getMe();
    },
    enabled: !!user,
  });
  useEffect(() => {
    if (getMeResult.data) {
      setFormValue(getMeResult.data?.data);
    }
  }, [getMeResult.data]);

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    avatar: "",
    dob: "",
    gender: "",
    phone: "",
    nationality: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfileResult.mutate();
  };

  const [countries, setCountries] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const resp = await getCountries();
      const makeData: any[] = resp?.map((item: any) => {
        return {
          value: item?.name?.common,
          label: item?.name?.common,
        };
      });
      makeData?.unshift({
        value: "",
        label: "---Select Nationality---",
      });
      setCountries(makeData);
    })();
  }, []);

  if (updateProfileResult.isPending || getMeResult.isPending) return <Loader />;

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label
          htmlFor="file"
          className="mx-auto block w-24 h-24 overflow-hidden rounded-full border cursor-pointer"
        >
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : formValue.avatar
                ? formValue.avatar
                : IMAGES_DEFAULT.account_notfound
            }
            loading="lazy"
            alt=""
          />
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files?.[0] as File)}
            accept="images/*"
            className="hidden"
          />
        </label>

        <InputField
          label="Name"
          name="name"
          value={formValue.name || ""}
          onChange={handleInputChange}
        />
        <InputField
          label="Email"
          name="email"
          value={formValue.email || ""}
          onChange={handleInputChange}
        />
        <InputField
          label="Date of Birth"
          name="dob"
          value={formValue.dob || ""}
          onChange={handleInputChange}
          type="date"
        />
        <InputField
          label="Phone"
          name="phone"
          value={formValue.phone || ""}
          onChange={handleInputChange}
        />
        <SelectField
          label="gender"
          name="gender"
          value={formValue.gender}
          options={gender as any}
          onChange={handleInputChange}
        />
        <SelectField
          label="Nationality"
          name="nationality"
          value={formValue.nationality}
          options={countries as any}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={updateProfileResult.isPending}
          className="btn btn-primary"
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default AccountInformationPage;
