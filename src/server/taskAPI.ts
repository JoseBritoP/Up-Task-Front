/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TaskPrincipal, taskPrincipalSchema } from "../schema/TaskSchema";
import api from "../lib/axios"
import { isAxiosError } from "axios";
import { updateTaskFn } from "typescript/interfaces/Task";

type createTaskProps = {
  name:string,
  description:string
  project:string,
  userId:string | undefined
}
export const createTask = async(formData:createTaskProps) => {
  try {
    const { data } = await api.post(`/task`,formData);
    console.log(data)
    return data
  } catch (error:any) {
    console.log(error.response.data)
    if(isAxiosError(error) && error.response){
      if(error.response.data.error.hasOwnProperty('issues')){
        const errorMessage = error.response.data.error.issues.map((issue:{message:'string'})=>issue.message)
        throw new Error(errorMessage);
      }
      throw new Error(error.response.data.error)
    }
  }
}

export const getTaskId = async (taskId:string) => {
  try {
    const { data } = await api.get(`/task/${taskId}`);
    const result = taskPrincipalSchema.safeParse(data);
    if(!result.success) return;
    return result.data
  } catch (error:any) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
};

export const updateTask = async (formData:updateTaskFn) => {
  try {
    const { data } = await api.put(`/task/${formData.taskId}`,formData.formData);
    return data;
  } catch (error:any) {
    if(isAxiosError(error) && error.response){
      const errorMessage = error.response.data.error.issues.map((issue:{message:'string'})=>issue.message)
      throw new Error(errorMessage);
    }
  }
};

export const deleteTask = async ({taskId,userId}:{taskId:string,userId:string }) => {
  try {
    const { data } = await api.delete(`/task/${taskId}/${userId}`);
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
};

type Status = TaskPrincipal['status']

export const taskStatus = async ({taskId,status,userId}:{taskId:string,status:Status,userId:string | undefined}) => {
  console.log(userId)
  
  try {
    const { data } = await api.patch(`/task/${taskId}`,{
      status,
      userId
    });
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
};