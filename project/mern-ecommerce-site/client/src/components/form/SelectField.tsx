import React, { FC, SelectHTMLAttributes } from "react";
interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: [{ value: string; label: string }];
}
const SelectField: FC<Props> = ({ name, label, options, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="capitalize">
        {label}
      </label>
      <select
        name={name}
        id={name}
        {...props}
        className="border px-4 py-1.5 rounded outline-blue-500 hover:border-blue-500 transition"
      >
        {options?.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectField;
