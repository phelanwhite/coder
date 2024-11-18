import ColumnList from "@/components/common/column/ColumnList";
import TaskForm from "@/components/common/task/TaskForm";
import { useColumnStore } from "@/stores/column-store";
import { useTaskStore } from "@/stores/task-store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const BoardIdPage = () => {
  const { id } = useParams();
  const { getColumns } = useColumnStore();
  const { getTasks } = useTaskStore();
  const getColumnsResult = useQuery({
    queryKey: ["columns", id],
    queryFn: async () => {
      return await getColumns();
    },
  });
  const getTasksResult = useQuery({
    queryKey: ["tasks", id],
    queryFn: async () => {
      return await getTasks();
    },
  });
  return (
    <div>
      <TaskForm />
      <ColumnList />
    </div>
  );
};

export default BoardIdPage;
