import { MdDelete, MdEdit } from "react-icons/md";
import { TaskType } from "../libs/types/task";
import { Link } from "react-router-dom";
import { useTaskStore } from "../stores/task-store";

const TaskCard = ({ data }: { data: TaskType }) => {
  const { completedTask, deleteTask } = useTaskStore();

  return (
    <div className="py-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data?.completed}
            onChange={(e) => completedTask(data._id as string, !data.completed)}
          />
          <div className={data.completed ? `line-through` : ``}>
            {data?.title}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to={`update-task/${data._id}`}>
            <MdEdit />
          </Link>
          <button onClick={() => deleteTask(data._id as string)}>
            <MdDelete />
          </button>
        </div>
      </div>
      <div className="text-gray-500 italic">{data?.description}</div>
    </div>
  );
};

export default TaskCard;
