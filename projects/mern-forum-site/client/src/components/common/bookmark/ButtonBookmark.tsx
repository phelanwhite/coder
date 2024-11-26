import React, { memo, useState } from "react";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";

const ButtonBookmark = () => {
  const [checked, setChecked] = useState(false);
  return <div>{checked ? <GoBookmarkFill /> : <GoBookmark />}</div>;
};

export default memo(ButtonBookmark);
