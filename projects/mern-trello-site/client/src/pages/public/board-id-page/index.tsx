import ColumnList from "@/components/common/column/ColumnList";
import TaskModal from "@/components/common/task/TaskModal";
import { useColumnStore } from "@/stores/column-store";
import { useTaskModalStore } from "@/stores/modal-store";
import { useTaskStore } from "@/stores/task-store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const BoardIdPage = () => {
  const { id } = useParams();
  const { getColumns } = useColumnStore();
  const { getTasks } = useTaskStore();
  const { isOpen, closeModal } = useTaskModalStore();
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
      <TaskModal />
      <ColumnList />
    </div>
  );
};

export default BoardIdPage;
