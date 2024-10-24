import React, { FC, memo, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { v4 } from "uuid";

interface Props {
  listData?: string[];
  setListData?: (data: string[]) => void;
}

const TopicInput: FC<Props> = ({ listData, setListData }) => {
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
  }, [list]);

  return (
    <div className="w-full bg-bgSecondaryColor p-3 flex flex-wrap gap-2 rounded">
      {list.map((item) => (
        <span
          className="bg-white py-1 px-2 rounded flex items-center gap-2"
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
        className="bg-transparent border-none outline-none w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === `Enter` && value) {
            const newItem = {
              id: v4(),
              value: value.trim(),
            };

            const newList = [...list, newItem];
            setList(newList);
            setValue("");
          }
        }}
      />
    </div>
  );
};

export default memo(TopicInput);
