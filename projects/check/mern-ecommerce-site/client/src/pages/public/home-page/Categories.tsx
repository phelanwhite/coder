import clsx from "clsx";
import { Link } from "react-router-dom";

const Categories = ({ data }: { data: any }) => {
  return (
    <ul className="bg-white p-2 rounded-lg overflow-x-auto">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
        {data.map((item: any) => {
          return (
            <li key={item._id}>
              <Link
                to={`/category/` + item?._id}
                className={clsx([
                  `h-full flex flex-col items-center gap-4 text-center px-4 py-2 rounded-lg hover:bg-gray-100 transition`,
                ])}
              >
                <div className="w-6">
                  <img src={item?.thumbnail} loading="lazy" alt="" />
                </div>
                <div className="">{item?.name}</div>
              </Link>
            </li>
          );
        })}
      </div>
    </ul>
  );
};

export default Categories;
