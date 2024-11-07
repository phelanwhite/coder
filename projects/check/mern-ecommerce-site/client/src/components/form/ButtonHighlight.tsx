import React, { FC, useEffect, useState } from "react";
import InputField from "./InputField";
import { MdDelete } from "react-icons/md";
import { v4 as uuid } from "uuid";

interface Props {
  label: string;
  datas?: string[];
  setDatas?: (value: any) => void;
}

const ButtonHighlight: FC<Props> = ({ label, datas, setDatas }) => {
  const [values, setValues] = useState<{ id: string; value: string }[]>(() => {
    return [];
  });

  const handleInputChange = (id: string, value: string) => {
    const newValues = values.map((item) =>
      item.id === id ? { ...item, value: value } : item
    );
    setValues(newValues);
  };

  const handleDelete = (id: string) => {
    const newValues = values.filter((item) => item.id !== id);
    setValues(newValues);
  };

  const handleAdd = () => {
    const newItem = { id: uuid(), value: "" };
    setValues((prev) => [...prev, newItem]);
  };

  useEffect(() => {
    if (datas) {
      const newDatas = datas.map((item) => {
        return {
          id: uuid(),
          value: item,
        };
      });
      console.log({ newDatas });

      //   setValues(newDatas);
    }
  }, [datas]);

  useEffect(() => {
    const newDatas = values
      .filter((item) => item.value)
      .map((item) => item.value);
    setDatas && setDatas(newDatas);
  }, [values]);

  return (
    <div className="flex flex-col gap-1">
      <div>{label}</div>
      {values?.map((item) => {
        return (
          <div key={item.id} className="flex items-center gap-4">
            <InputField
              className="flex-1"
              value={item.value}
              onChange={(e) => handleInputChange(item.id, e.target.value)}
            />
            <button onClick={() => handleDelete(item.id)}>
              <MdDelete />
            </button>
          </div>
        );
      })}
      <div>
        <button
          type="button"
          onClick={handleAdd}
          className="btn btn-sm btn-primary"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ButtonHighlight;
