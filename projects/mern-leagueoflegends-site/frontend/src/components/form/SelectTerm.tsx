import React, { FC, SelectHTMLAttributes } from "react";

interface ISelectTerm extends SelectHTMLAttributes<HTMLSelectElement> {
  datalist: [
    {
      title: string;
      value: string;
    }
  ];
}

const SelectTerm: FC<ISelectTerm> = ({ ...props }) => {
  return (
    <select name="" id="" {...props} className="input-box capitalize">
      {props.datalist?.map((item, index) => (
        <option key={index} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
};

export default SelectTerm;
