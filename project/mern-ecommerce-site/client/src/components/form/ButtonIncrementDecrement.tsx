import { FC, useEffect, useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
interface Props {
  number: number;
  onChangeNumber?: (value: number) => void;
  min?: number;
  max?: number;
}
const ButtonIncrementDecrement: FC<Props> = ({
  max,
  min,
  number,
  onChangeNumber,
}) => {
  const [value, setValue] = useState(() => number || 0);
  const handleIncrement = () =>
    setValue((prev: number) => (prev === max ? prev : prev + 1));
  const handleDecrement = () =>
    setValue((prev: number) => (prev === min ? prev : prev - 1));
  useEffect(() => {
    onChangeNumber && onChangeNumber(value);
  }, [value]);
  return (
    <div className="flex items-stretch gap-1">
      <button
        disabled={min && Number(value) <= min ? true : false}
        onClick={handleDecrement}
        className="border rounded p-1 px-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <IoIosRemove />
      </button>
      <input
        type="number"
        className="flex-1 border rounded px-2 py-1"
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
