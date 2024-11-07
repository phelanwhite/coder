import clsx from "clsx";
import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField: FC<Props> = ({ name, label, required, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className={clsx(`capitalize`)}>
          {required && "*"} {label}
        </label>
      )}
      <input
        name={name}
        id={name}
        required={required}
        {...props}
        className="border px-3 py-1.5 rounded outline-blue-500 hover:border-blue-500 transition"
      />
    </div>
  );
};

export default InputField;
