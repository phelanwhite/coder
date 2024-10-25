import style from "./style.module.css";

const Loader = () => {
  return (
    <div className="z-[999] relative">
      <div className="absolute top-4 left-[50%] -translate-x-[50%] px-4 py-1.5 rounded-lg bg-gray-100 shadow flex items-center gap-4">
        <div className={style?.loader}></div>
        <div>Loading...</div>
      </div>
    </div>
  );
};

export default Loader;
