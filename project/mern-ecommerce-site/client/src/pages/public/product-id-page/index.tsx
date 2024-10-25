import Left from "./Left";
import Right from "./Right";
import Main from "./Main";

const ProductByIdPage = () => {
  return (
    <div className="flex items-start gap-6 flex-col md:flex-row">
      <Left />
      <Main />
      <Right />
    </div>
  );
};

export default ProductByIdPage;
