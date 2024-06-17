export const getCurrency = (value, locales = "vn-VN") => {
  const VND = new Intl.NumberFormat(locales, {
    style: "currency",
    currency: "VND",
    // maximumFractionDigits: 0,
    // minimumFractionDigits: 0,
    currencyDisplay: "symbol",
    useGrouping: true,
  });
  return VND.format(value);
};
