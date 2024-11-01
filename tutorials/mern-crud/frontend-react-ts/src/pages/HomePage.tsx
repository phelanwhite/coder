import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTaskStore } from "../stores/task-store";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";
import { useState } from "react";

const HomePage = () => {
  const { getTasks, tasks } = useTaskStore();
  const [filterBy, setFilterBy] = useState("");
  const getTasksResult = useQuery({
    queryKey: ["tasks", filterBy],
    queryFn: async () => {
      return await getTasks(`_filter=${filterBy}`);
    },
    placeholderData: keepPreviousData,
  });

  if (getTasksResult.isLoading) return <div>Loader...</div>;
  return (
    <div>
      <div className="flex items-center gap-8 justify-between mb-8">
        <select
          name="sort"
          id="sort"
          className="border px-4 py-1.5 text-xs font-medium rounded-full"
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="">All</option>
          <option value="done">Done</option>
          <option value="todo">Todo</option>
        </select>
        <Link to={`/create-task`} className="button text-xs">
          Add
        </Link>
      </div>
      <div>
        {tasks.map((item) => (
          <TaskCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
