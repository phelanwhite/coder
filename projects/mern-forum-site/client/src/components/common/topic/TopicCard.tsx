import React from "react";
import { Link } from "react-router-dom";

const TopicCard = ({ data }: { data: any }) => {
  return (
    <Link
      to={`/topic/${data}`}
      className="inline-block capitalize px-2.5 py-1 rounded-full font-medium bg-bg-secondary-color"
    >
      {data}
    </Link>
  );
};

export default TopicCard;
