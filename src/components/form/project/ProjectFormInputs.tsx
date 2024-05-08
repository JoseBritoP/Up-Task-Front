import ErrorMessage from "../../shared/ErrorMessage"
import { ProjectFormProps } from "typescript/interfaces/Project"

export default function ProjectForm({register,errors}:ProjectFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <label htmlFor="projectName" className="text-sm uppercase font-bold">Name of project</label>
        <input
            id="projectName"
            className="w-full p-3  border border-gray-200 rounded-md dark:placeholder:text-gray-700 dark:text-gray-800"
            type="text"
            placeholder="Name of project"
            {...register("projectName", {
                required: "The project name is required",
            })}
        />

        {errors.projectName && (
            <ErrorMessage>{errors.projectName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="clientName" className="text-sm uppercase font-bold">Client name</label>
        <input
            id="clientName"
            className="w-full p-3  border border-gray-200 rounded-md dark:placeholder:text-gray-700 dark:text-gray-800"
            type="text"
            placeholder="Client name"
            {...register("clientName", {
                required: "The name of client is required",
            })}
        />

        {errors.clientName && (
            <ErrorMessage>{errors.clientName.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-5 space-y-3">
        <label htmlFor="description" className="text-sm uppercase font-bold">Description </label>
        <textarea
            id="description"
            className="w-full p-3  border border-gray-200 rounded-md dark:placeholder:text-gray-700 dark:text-gray-800"
            placeholder="Description..."
            {...register("description", {
                required: "A description of the project is required"
            })}
        />

        {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
    </>
  )
}
