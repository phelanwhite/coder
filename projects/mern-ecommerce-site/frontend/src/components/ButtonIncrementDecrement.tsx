import React, { FC, memo, useState } from "react";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";

interface IButtonIncrementDecrement extends React.ComponentProps<"button"> {
  max: number;
  min: number;
  value: number;
  setValue: React.Dispatch<any>;
}

const ButtonIncrementDecrement: FC<IButtonIncrementDecrement> = ({
  min,
  max,
  value,
  setValue,
  ...props
}) => {
  // const [value, setValue] = useState<any>(1);
  const handleIncrement = () => {
    setValue((prev: any) => (Number(prev) === max ? max : prev + 1));
  };
  const handleDecrement = () => {
    setValue((prev: any) => (Number(prev) === min ? min : prev - 1));
  };

  return (
    <div className="flex items-stretch gap-1">
      <button
        onClick={handleDecrement}
        className="flex items-center justify-center p-2 border rounded"
      >
        <CgMathMinus />
      </button>
      <input
        className="flex-1 px-4 border rounded outline-blue-500"
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={handleIncrement}
        className="flex items-center justify-center p-2 border rounded"
      >
        <CgMathPlus />
      </button>
    </div>
  );
};

export default memo(ButtonIncrementDecrement);
