import clsx from "clsx";
import React, { FC, SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  layout?: "horizontal" | "vertical";
  options?: { value: string; label: string }[];
}

const SelectField: FC<Props> = ({
  name,
  label,
  options,
  className,
  layout,
  ...props
}) => {
  return (
    <div
      className={clsx([
        `flex gap-1 w-full`,
        !layout && `flex-col`,
        layout === "horizontal" && `flex-row items-center`,
        layout === "vertical" && `flex-col`,
        className,
      ])}
    >
      {label && (
        <label htmlFor={name} className="capitalize">
          {label}
        </label>
      )}
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
