import z from 'zod';

const name = z.string({
  invalid_type_error:'The task name must be a string',
  required_error:'The name of the task is required',}
).trim().min(3,{message:'The name of task is to short'}).max(50,{message:'The name of task is to long'});

const description = z.string({
  invalid_type_error:'The description of the task must be a string',
  required_error:'A description is required',
}).trim().min(3,{message:'The description is to short'}).max(200,{message:'The description is to long'})

const status = z.enum(['pending','onHold','inProgress','underReview','completed']).default('pending')

export const taskSchema = z.object({
  _id:z.string(),
  name,
  description,
  status,
  userId:z.string().optional()
})

const completedBy = z.object({
  _id:z.string(),
  user:z.object({
    _id:z.string(),
    name:z.string(),
    email:z.string()
  }),
  status
})

const note = z.object({
  _id:z.string(),
  content:z.string(),
  createdBy:z.object({
    _id:z.string(),
    name:z.string(),
    email:z.string()
  }),
  createdAt:z.string(),
  task:z.string()
})

export type Note = z.infer<typeof note>

export const taskPrincipalSchema = z.object({
  _id:z.string(),
  name,
  description,
  project:z.string(),
  status,
  completedBy:z.array(completedBy),
  notes:z.array(note),
  createdAt:z.string().optional(),
  updatedAt:z.string().optional(),
});

export const createTaskSchema = z.object({
  _id:z.string(),
  name,
  description,
  status,
  userId:z.string().optional()
})

export type TaskFormV2 = z.infer<typeof createTaskSchema>

export const tasksSchema = z.array(taskSchema);
export type TaskStatus = z.infer<typeof status>
export type TaskPrincipal = z.infer<typeof taskPrincipalSchema>
export type Task = z.infer<typeof taskSchema>;
export type Tasks = z.infer<typeof tasksSchema>;
export type TaskFormData = Pick<TaskFormV2,'name'| 'description'| 'userId'>;