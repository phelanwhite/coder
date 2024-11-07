import clsx from "clsx";
import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const CheckboxField: FC<Props> = ({ name, label, required, ...props }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer w-max">
      <input
        name={name}
        id={name}
        required={required}
        {...props}
        type="checkbox"
        className="border px-3 py-1.5 rounded outline-blue-500 hover:border-blue-500 transition"
      />
      <label htmlFor={name} className={clsx(`capitalize`)}>
        {required && "*"} {label}
      </label>
    </div>
  );
};

export default CheckboxField;
