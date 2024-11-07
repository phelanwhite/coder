import clsx from "clsx";
import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextAreaField: FC<Props> = ({ name, label, required, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className={clsx(`capitalize`)}>
          {required && "*"} {label}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        {...props}
        className="border px-3 py-1.5 rounded outline-blue-500 hover:border-blue-500 transition"
      />
    </div>
  );
};

export default TextAreaField;
