import clsx from "clsx";
import { memo, useCallback, useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const ButtonScrollBackToTop = () => {
  const [show, setShow] = useState(false);
  const handleToTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  return (
    <button
      title="Go to top"
      className={clsx(
        "z-10 fixed bottom-4 right-4 p-2 rounded bg-black hover:bg-black/70 text-white",
        show ? "block" : "hidden"
      )}
      onClick={handleToTop}
    >
      <FaAngleUp />
    </button>
  );
};

export default memo(ButtonScrollBackToTop);
