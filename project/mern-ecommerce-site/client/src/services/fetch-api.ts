import axiosConfig from "@/configs/axios-config";

export const fetchCategories = async () => {
  const url = "category/get-all";
  const resp = (await axiosConfig.get(url)).data;
  const datas: any[] = resp?.data?.results?.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
  datas?.unshift({
    label: "---Select category---",
    value: "",
  });
  return datas;
};

export const fetchBrands = async () => {
  const url = "brand/get-all";
  const resp = (await axiosConfig.get(url)).data;
  const datas: any[] = resp?.data?.results?.map((item: any) => ({
    label: item.name,
    value: item._id,
  }));
  datas?.unshift({
    label: "---Select brand---",
    value: "",
  });
  return datas;
};
