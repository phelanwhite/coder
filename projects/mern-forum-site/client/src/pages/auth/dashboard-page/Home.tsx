import React from "react";

const Home = () => {
  return (
    <div>
      <ul className="grid gap-4 grid-cols-4">
        {[
          `Total post reactions`,
          `Total post comments`,
          `Total post views`,
        ].map((item) => (
          <li className="p-6 rounded bg-gray-100">
            <div className="font-medium text-2xl">0</div>
            <div className="text-text-secondary-color">{item}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
