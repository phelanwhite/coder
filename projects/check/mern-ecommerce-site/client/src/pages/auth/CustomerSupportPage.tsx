import { data_helper } from "@/assets/constants/common";
import { Link } from "react-router-dom";

const CustomerSupportPage = () => {
  return (
    <div>
      <div className="font-medium text-base">
        {data_helper.customer_care.label}
      </div>
      <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-3">
        {data_helper.customer_care.list.map((item) => (
          <div
            key={item.label}
            className="bg-gray-100 p-4 rounded-lg flex flex-col gap-3 items-center"
          >
            <div className="text-4xl">{item.icon}</div>
            <div className="font-medium text-secondary-2">{item.label}</div>
            <div className="font-medium text-base">{item.value}</div>
            <div className="text-xs text-secondary-2">{item.description}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 font-medium text-base">
        {data_helper.lookup_information.label}
      </div>
      <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
        {data_helper.lookup_information.list.map((item) => (
          <div
            key={item.label}
            className="bg-gray-100 p-4 rounded-lg space-y-2"
          >
            <div className="text-4xl">{item.icon}</div>
            <div className="font-medium">{item.label}</div>
            <div className="text-secondary-2">{item.description}</div>
            <div>
              <Link to={item.value} className="text-xs font-medium text-link">
                See details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerSupportPage;
