import { Task } from "schema/TaskSchema";

export interface EditTaskModalProps {
  data:Task
}

export interface updateTaskFn {
  taskId: string;
  formData: TaskFormData;
  projectId: string;
}