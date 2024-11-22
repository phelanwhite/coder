import clsx from "clsx";
import React, { FC, useMemo } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface Props extends React.ComponentProps<"button"> {
  variant?: "text" | "contained" | "outlined";
  color?: "black" | "secondary" | "success" | "error" | "primary";
  size?: "xs" | "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

const ButtonComponent: FC<Props> = ({ className, ...props }) => {
  const variantClass = useMemo(() => {
    let style = ``;
    if (props.variant === "text") style = `bg-none`;
    return style;
  }, [props.variant]);

  const colorClass = useMemo(() => {
    let style = ``;
    if (props.color === "error")
      style = `bg-red-600 hover:bg-red-500 text-white`;
    if (props.color === "success")
      style = `bg-green-600 hover:bg-green-500 text-white`;
    if (props.color === "secondary")
      style = `bg-gray-200 hover:bg-gray-100 text-black`;
    if (props.color === "black")
      style = `bg-black hover:bg-gray-800 text-white`;
    if (props.color === "primary")
      style = `bg-blue-600 hover:bg-blue-500 text-white`;
    return style;
  }, [props.color]);

  const sizeClass = useMemo(() => {
    let style = ``;
    if (props.size === "xs") style = `text-xs`;
    if (props.size === "sm") style = `text-sm`;
    if (props.size === "lg") style = `text-lg`;
    return style;
  }, [props.size]);

  const disabledClass = useMemo(() => {
    let style = ``;
    if (props.disabled) style = `opacity-50 cursor-not-allowed`;
    return style;
  }, [props.disabled]);

  return (
    <button
      className={clsx(
        "px-3 py-1.5 rounded",
        "flex items-center justify-center gap-2",
        colorClass,
        variantClass,
        sizeClass,
        disabledClass,
        className
      )}
      {...props}
    >
      {props.icon && props.icon}
      {props.children}
    </button>
  );
};

export default ButtonComponent;
