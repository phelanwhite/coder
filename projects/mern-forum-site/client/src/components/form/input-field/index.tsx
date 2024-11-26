import clsx from "clsx";
import React, { FC, forwardRef, memo } from "react";

interface Props extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
}

const InputField: FC<Props> = forwardRef(({ name, ...props }, ref) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      {props.label && (
        <label htmlFor={name} className="text-sm">
          {props.label}
        </label>
      )}
      <input
        className={clsx([
          `border rounded px-3 py-1.5`,
          props.error && `border-red-500`,
        ])}
        name={name}
        id={name}
        ref={ref}
        {...props}
      />
      {props.error && <div className="text-sm text-red-600">{props.error}</div>}
    </div>
  );
});

export default memo(InputField);
