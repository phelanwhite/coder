import React, { FC, memo } from "react";

interface Props extends React.ComponentProps<"input"> {
  label?: string;
}

const InputField: FC<Props> = ({ name, ...props }) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      {props.label && (
        <label htmlFor={name} className="text-sm">
          {props.label}
        </label>
      )}
      <input
        className="border rounded px-3 py-1.5"
        name={name}
        id={name}
        {...props}
      />
    </div>
  );
};

export default memo(InputField);
