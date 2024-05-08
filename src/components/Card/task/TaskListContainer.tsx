/* eslint-disable @typescript-eslint/no-explicit-any */
import { statusTranslations } from "@/locales/qs";
import { Task, TaskStatus } from "../../../schema/TaskSchema";
import TaskCard from "./TaskCard";
import DropTask from "@/components/shared/task/DropTask";
import { DndContext,DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskStatus } from "@/server/taskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import useAuth from "@/hooks/auth/useAuth";

interface TaskListProps {
  tasks: Task[];
  userId: string;
  canEdit: boolean;
}

type GroupedTask = {
  [key: string]: Task[];
};
const initialStatusGroup: GroupedTask = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

const statusStyles: { [key: string]: string } = {
  pending: "border-t-slate-400 dark:border-t-slate-500",
  onHold: "border-t-red-400 dark:border-t-red-500",
  inProgress: "border-t-blue-400 dark:border-t-blue-500",
  underReview: "border-t-amber-400 dark:border-t-amber-500",
  completed: "border-t-emerald-400 dark:border-t-emerald-500",
};


export default function TaskListContainer({tasks,userId,canEdit,}: TaskListProps) {
  
  const { data:profile } = useAuth();
  
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroup);


  const params = useParams();
  const projectId = params.projectId!

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn:taskStatus,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(data.message)
      queryClient.invalidateQueries({queryKey:['project',projectId]})
    }
  });

  const handleDragEnd = (e:DragEndEvent) => {
    const { over, active } = e;

    if(over && over.id){
      console.log('valid');
      const taskId = active.id.toString()
      const status = over.id as TaskStatus

      mutate({taskId,status,userId:profile && profile._id})

      queryClient.setQueryData(['project',projectId],(oldData:any)=>{
        const updatedTask = oldData.tasks.map((task:Task)=>{
          if(task._id === taskId){
            return {
              ...task,status
            }
          }
          return task
        })

        return {
          ...oldData,
          tasks:updatedTask
        }
      })
    }
  };
  return (
    <>
      <h2 className="text-3xl font-bold my-10">Tasks</h2>
      <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={` capitalize text-xl font-semibold border border-slate-300 bg-white p-3 border-t-8 dark:bg-gray-700 dark:border-slate-600 rounded-t-none rounded-md ${statusStyles[status]}`}
              >
                {statusTranslations[status]}
              </h3>
              <DropTask status={status}/>
              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">No task</li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      userId={userId}
                      canEdit={canEdit}
                    />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}
