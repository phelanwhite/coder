import { memo } from "react";

const ComparisonProductSlide = ({ title, items }) => {
  return (
    <div>
      <div className="mb-2 font-semibold text-base">{title}</div>
      <div>
        <table>
          <thead>
            <tr>
              {items?.map((item, index) => (
                <th className="p-2" key={item?.spid || item?.super_id}>
                  <div className="flex flex-col gap-1 items-center">
                    <div className="w-16">
                      <img
                        src={item?.thumbnail_url}
                        alt={item?.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="font-semibold">{item?.name}</div>
                    <div className="font-normal">{item?.options}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items?.[0]?.attributes?.map((_, index) => (
              <tr key={index}>
                {items?.map((itemC, indexC) => (
                  <td key={indexC} className="py-2 border-t px-2">
                    <div>{itemC?.name}</div>
                    <div>{itemC?.value}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(ComparisonProductSlide);
