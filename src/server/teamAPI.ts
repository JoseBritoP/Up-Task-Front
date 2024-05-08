/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { TeamMemberForm } from "@/schema/TeamMemberSchema";

export async function findUserByEmail({projectId,formData}:{projectId:string,formData:TeamMemberForm}){
  try {
    const { data } = await api.post(`/project/${projectId}/team/find`,formData);
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function addPartnetToProject({projectId,formData}:{projectId:string,formData:{id:string}}){
  try {
    const { data } = await api.post(`/project/${projectId}/team`,formData);
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function getParternsProject(projectId:string){
  try {
    const { data } = await api.get(`/project/${projectId}/team`);
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}

export async function removeParternsProject({projectId,userId}:{projectId:string,userId:string}){
  try {
    const { data } = await api.delete(`/project/${projectId}/team/${userId}`);
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}
