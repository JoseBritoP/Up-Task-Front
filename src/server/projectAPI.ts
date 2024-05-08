/* eslint-disable @typescript-eslint/no-explicit-any */
import { isAxiosError } from "axios";
import api from "../lib/axios"
import { ProjectFormData } from "typescript/types/Project";
import { projectsSchema,projectWithTaskSchema } from "../schema/ProjectSchema";

export async function createProject(formData:ProjectFormData){
  try {
    const { data } = await api.post('/project',formData);
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.response){
      const errorMessage = error.response.data.error.issues.map((issue:{message:'string'})=>issue.message)
      throw new Error(errorMessage);
    }
  }
}

export async function getProjects() {
  try {
    const { data } = await api.get('/project');
    const result = projectsSchema.safeParse(data);
    if(!result.success){
      console.log('error...',result.error)
      return
    }
    return result.data;
  } catch (error:any) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
    throw new Error(`Error fetching projects...`)
  }
}

export async function getProject(projectId:string) {
  try {
    const { data } = await api.get(`/project/${projectId}`);
    const result = projectWithTaskSchema.safeParse(data);
    if(!result.success){
      console.log('error...',result.error)
      return
    }
    return result.data;
  } catch (error:any) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
    throw new Error(`Error fetching projects...`)
  }
}

type ProjectAPIType = {
  formData:ProjectFormData,
  projectId:string
}
export async function editProject({formData,projectId}:ProjectAPIType){
  try {
    const { data } = await api.put(`/project/${projectId}`,formData);
    return data
  } catch (error:any) {
    // console.log('Server error')
    if(isAxiosError(error) && error.response){
      const errorMessage = error.response.data.error.issues.map((issue:{message:'string'})=>issue.message)
      throw new Error(errorMessage);
    }
  }
}

export async function deleteProject(projectId:string){
  try {
    const { data } = await api.delete(`/project/${projectId}`);
    return data
  } catch (error:any) {
    throw new Error(`${error.message}`)
  }
}