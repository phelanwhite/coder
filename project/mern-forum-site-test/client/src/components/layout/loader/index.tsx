import style from "./style.module.css";

const Loader = () => {
  return (
    <div className="z-[1000] bg-black/50 text-white inset-0 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
      <div>
        <div className={style.loader}></div>
        <div>Loader...</div>
      </div>
    </div>
  );
};

export default Loader;
