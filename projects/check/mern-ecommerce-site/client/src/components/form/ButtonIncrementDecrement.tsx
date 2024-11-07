import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
interface Props {
  number: number;
  onChangeNumber?: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: "sm";
}
const ButtonIncrementDecrement: FC<Props> = ({
  max,
  min,
  number,
  className,
  onChangeNumber,
  size,
}) => {
  const [value, setValue] = useState(0);
  const handleIncrement = () =>
    setValue((prev: number) => (prev === max ? prev : prev + 1));
  const handleDecrement = () =>
    setValue((prev: number) => (prev === min ? prev : prev - 1));
  const newNumber = number === min ? min : number - 1;
  onChangeNumber && onChangeNumber(newNumber);
  useEffect(() => {
    onChangeNumber && onChangeNumber(value);
  }, [value]);

  useEffect(() => {
    number && setValue(number);
  }, [number]);

  return (
    <div
      className={clsx([
        `flex items-stretch gap-1`,
        size === `sm` && `text-xs`,
        className,
      ])}
    >
      <button
        disabled={min && Number(value) <= min ? true : false}
        onClick={handleDecrement}
        className="border rounded p-1 px-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <IoIosRemove />
      </button>
      <input
        type="number"
        className="w-full border rounded px-2 py-1"
        value={value}
        min={min}
        max={max}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <button
        disabled={max && Number(value) >= max ? true : false}
        onClick={handleIncrement}
        className="border rounded p-1 px-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <IoIosAdd />
      </button>
    </div>
  );
};

export default ButtonIncrementDecrement;
