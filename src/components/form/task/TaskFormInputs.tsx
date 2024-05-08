import ErrorMessage from "@/components/shared/ErrorMessage"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "schema/TaskSchema"


type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="name">Task name</label>
        <input
          id="name"
          type="text"
          placeholder="Task name"
          className="w-full p-3 dark:text-black border-gray-300 rounded-md border"
          {...register("name", {
              required: "The task name is required",
          })}
        />
        {errors.name && (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <label className="font-normal text-2xl" htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Description"
          className="w-full p-3 dark:text-black border-gray-300 rounded-md border"
          {...register("description", {
              required: "The description is required"
          })}
        />
        {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  )
}