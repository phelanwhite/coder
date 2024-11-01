import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const QueryPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const todosResult = useQuery({
    queryKey: ["todos", page],
    queryFn: () =>
      fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`
      ).then((res) => res.json()),
    enabled: true, // Nếu bạn muốn vô hiệu hóa truy vấn khỏi việc tự động chạy, bạn có thể sử dụng tùy chọn enabled = false . Tùy chọn enabled cũng chấp nhận lệnh gọi lại trả về boolean.
    retry: 10, // Sẽ thử lại các yêu cầu thất bại 10 lần trước khi hiển thị lỗi
    retryDelay: 1000, // Sẽ luôn đợi 1000ms để thử lại, bất kể thử lại bao nhiêu lần
    placeholderData: keepPreviousData, // Không bị nhảy UI
  });

  return (
    <div>
      <div className="font-medium text-xl text-center">Todos</div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <strong>page:{page}</strong>
        <strong>limit:{limit}</strong>
      </div>
      <ul>
        {todosResult.data?.map((item: any) => (
          <li key={item?.id} style={{ listStyle: "none", textAlign: "left" }}>
            {item?.id} - {item?.title}
          </li>
        ))}
      </ul>
      <div className="text-center">
        <button
          className="text-xs text-blue-500 underline"
          onClick={() => setPage((prev) => prev + 1)}
        >
          view more
        </button>
      </div>
    </div>
  );
};

export default QueryPage;
