const location = "vn-VN";

export const currencyChange = ({ value }: { value: string | number }) => {
  return Intl.NumberFormat(location, {
    style: "currency",
    currency: "VND",
  }).format(Number(value));
};
