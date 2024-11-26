import ButtonComponent from "@/components/form/button-component";
import React, { useState } from "react";

const ButtonFollow = () => {
  const [checked, setChecked] = useState(false);
  return (
    <ButtonComponent color="black" className="rounded-full" size="xs">
      {checked ? `Un Follow` : `Follow`}
    </ButtonComponent>
  );
};

export default ButtonFollow;
