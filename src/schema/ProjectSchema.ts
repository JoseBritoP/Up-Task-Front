import z from 'zod'
import { taskSchema } from './TaskSchema';

const projectName = z.string({
  invalid_type_error:'The project name must be a string',
  required_error:'The name of the project is required',}
).trim().min(3,{message:'The name of project is to short'}).max(30,{message:'The name of project is to long'});

const clientName = z.string({
  invalid_type_error:'The client name of the project must be a string',
  required_error:'The name of the client is required',
}).trim().min(3,{message:'The name of client is required'}).max(30,{message:'The name of client is to long'});

const description = z.string({
  invalid_type_error:'The description of the project must be a string',
  required_error:'A description is required',
}).trim().min(3,{message:'The description is to short'}).max(200,{message:'The description is to long'})

const idSchema = z.string({
  invalid_type_error:'The id must be a string',
  required_error:'The id is required'
}).regex(/[^0-9]+/,{message:'Invalid ID'}).length(24,{message:'The id must have 24 characters'});

const manager = z.string();

export const projectSchema = z.object({
  _id:idSchema,
  projectName,
  clientName,
  description,
  manager
});

export const projectsSchema = z.array(projectSchema)

export const projectWithTaskSchema = z.object({
  _id:idSchema,
  projectName,
  clientName,
  description,
  manager,
  tasks:z.array(taskSchema) || []
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectDetail = z.infer<typeof projectWithTaskSchema>
export type ProjectFormData = Pick<Project,'clientName' | 'projectName'| 'description'>