import useEditFormTask from "@/hooks/task/useTaskFormEdit";
import { Link, useParams } from "react-router-dom";
import { EditTaskModalProps } from "typescript/interfaces/Task";
import TaskForm from "./TaskFormInputs";

export default function FormEditTaskComponent({data}:EditTaskModalProps) {

  const params = useParams();

  const { register, handleSubmit, errors, handleForm } = useEditFormTask({data});

  return (
    <form className="mt-10 space-y-3" noValidate onSubmit={handleSubmit(handleForm)}>

      <TaskForm register={register} errors={errors}/>

      <div className="flex justify-between items-center gap-x-5">
        <input
          type="submit"
          className=" bg-green-600 rounded-md hover:bg-green-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          value="Saves changes"
        />
        <Link to={`/projects/${params.projectId}`} className="bg-red-700 text-center hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700  w-full p-3 text-white uppercase font-bold rounded-md cursor-pointer transition-colors">Cancel changes</Link>
      </div>
    </form>
  );
}
