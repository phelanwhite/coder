import React, { useEffect, useState } from "react";
import { TaskType } from "../libs/types/task";
import { useLocation, useParams } from "react-router-dom";
import { useTaskStore } from "../stores/task-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosConfig from "../configs/axios-config";

const TaskCreateUpdate = () => {
  const { id } = useParams();
  const getTaskIdResult = useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const url = `task/${id}`;
      return (await axiosConfig.get(url)).data;
    },
    enabled: !!id,
  });
  useEffect(() => {
    if (getTaskIdResult.data) {
      setFormValue(getTaskIdResult.data);
    }
  }, [getTaskIdResult.data]);

  const [isCreate, setIsCreate] = useState(true);
  const location = useLocation();
  useEffect(() => {
    location.pathname.includes(`update`)
      ? setIsCreate(false)
      : setIsCreate(true);
  }, [location.pathname]);

  const { addTask, updateTask } = useTaskStore();
  const addUpdateTaskResult = useMutation({
    mutationFn: async () => {
      if (isCreate) {
        return addTask(formValue);
      } else {
        return updateTask(id as string, formValue);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [formValue, setFormValue] = useState<TaskType>({
    title: "",
    description: "",
    completed: false,
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addUpdateTaskResult.mutate();
  };

  if (addUpdateTaskResult.isPending) return <div>Lodaer...</div>;

  return (
    <div>
      <div className="font-medium text-blue-600 text-xl mb-4">
        {isCreate ? `Create Task` : `Update Task`}
      </div>
      <form
        action=""
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          className="input-field"
          name="title"
          value={formValue.title}
          onChange={handleInputChange}
          placeholder="Title"
        />
        <textarea
          className="input-field"
          name="description"
          value={formValue.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <label htmlFor="completed" className="flex items-center gap-2">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={formValue.completed}
            onChange={(e) =>
              setFormValue((prev) => ({
                ...prev,
                completed: !formValue.completed,
              }))
            }
          />
          Completed
        </label>
        <button className="button">Submit</button>
      </form>
    </div>
  );
};

export default TaskCreateUpdate;
