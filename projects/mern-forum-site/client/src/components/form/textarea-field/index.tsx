import React, { FC, forwardRef, memo } from "react";

interface Props extends React.ComponentProps<"textarea"> {
  label?: string;
}

const TextareaField: FC<Props> = forwardRef(({ name, ...props }, ref) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      {props.label && (
        <label htmlFor={name} className="tex-sm">
          {props.label}
        </label>
      )}
      <textarea
        className="border rounded px-3 py-1.5"
        name={name}
        id={name}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default memo(TextareaField);
