import { Fragment } from "react";
import { Task } from "../../../schema/TaskSchema";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "@/server/taskAPI";
import { toast } from "react-toastify";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
  task: Task;
  userId: string;
  canEdit: boolean;
}

export default function TaskCard({ task, userId, canEdit }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      if (error.message) return toast.error(error.message);
      toast.error(`Error deleting the task`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      toast.success(`Task was deleted successfully`);
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px,${transform.y}px,0)`,
        padding: "1rem",
        backgroundColor:'#123',
        width:'300px',
        display:'flex',
        borderWidth:'1px',
        borderRadius:'10px'
      }
    : undefined;

  return (
    <li className="p-5 bg-white dark:bg-gray-700/60 border-2 border-slate-300 dark:border-slate-600 flex justify-between gap-3 rounded-md">
      <div
        className="min-w-0 flex flex-col gap-y-4"
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        style={style}
      >
        <p className="text-xl font-semibold text-slate-600 dark:text-slate-300 text-left">
          {task.name}
        </p>
        <p className="text-slate-500 dark:text-slate-300">{task.description}</p>
      </div>
      <div className="flex shrink-0  gap-x-6">
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            <span className="sr-only">options</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-700 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                <button
                  type="button"
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 dark:text-gray-300"
                  onClick={() =>
                    navigate(location.pathname + `?viewTask=${task._id}`)
                  }
                >
                  {" "}
                  See Task
                </button>
              </Menu.Item>
              {canEdit && (
                <>
                  <Menu.Item>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-gray-900 dark:text-gray-300"
                      onClick={() =>
                        navigate(location.pathname + `?editTask=${task._id}`)
                      }
                    >
                      Edit Task
                    </button>
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      type="button"
                      className="block px-3 py-1 text-sm leading-6 text-red-500 font-semibold"
                      onClick={() => mutate({ taskId: task._id, userId })}
                    >
                      Delete Task
                    </button>
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
}
