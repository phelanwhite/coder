import clsx from "clsx";
import { ComponentProps, FC, memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { v4 } from "uuid";

interface Props extends ComponentProps<"div"> {
  listData?: string[];
  setListData?: (data: string[]) => void;
}

const TopicInput: FC<Props> = ({ listData, setListData, ...props }) => {
  const [list, setList] = useState<
    {
      id: string;
      value: string;
    }[]
  >(() => {
    return listData
      ? listData.map((item) => ({
          id: v4(),
          value: item,
        }))
      : [];
  });

  const [value, setValue] = useState("");

  const handleDelete = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  useEffect(() => {
    setListData && setListData(list.map((item) => item.value));
    return () => {};
  }, [list]);

  return (
    <div {...props}>
      <div className={clsx([`w-full p-3 flex flex-wrap gap-2 rounded border`])}>
        {list.map((item) => (
          <span
            className="bg-gray-100 py-1 px-2 rounded flex items-center gap-2 capitalize"
            key={item.id}
          >
            {item.value}
            <button type="button" onClick={() => handleDelete(item.id)}>
              <MdClose size={10} />
            </button>
          </span>
        ))}
        <input
          type="text"
          placeholder="Add a topic..."
          className="bg-transparent border-none outline-none flex-1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === `Enter` && value) {
              const newItem = {
                id: v4(),
                value: value.trim(),
              };
              if (list.find((item) => item.value === value)) {
                toast.error(`You have added this tag`);
                return;
              }
              const newList = [...list, newItem];
              setList(newList);
              setValue("");
            }
          }}
        />
      </div>
    </div>
  );
};

export default memo(TopicInput);
