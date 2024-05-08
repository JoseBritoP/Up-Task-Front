/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Auth, AuthenticateSchema, LoginForm } from "@/schema/AuthSchema";

export async function createAccount(formData:Auth){
  try {
    const { data } = await api.post('/auth/create-account',formData)
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.message){
      throw new Error(error.response?.data.error)
    }
  }
}

export async function confirmAccount (token:string){
  try {
    const { data } = await api.get(`/auth/confirm-account/${token}`);
    return data
  } catch (error) {
    if(isAxiosError(error) && error.message){
      throw new Error(error.response?.data.error)
    }
  }
}

export async function requestConfirmCode (formData:{email:string}){
  try {
    const { data } = await api.post(`/auth/request-code/`,formData);
    return data
  } catch (error) {
    if(isAxiosError(error) && error.message){
      throw new Error(error.response?.data.error)
    }
  }
}

export async function authenticateUser(formData:LoginForm){
  try {
    const { data } = await api.post('/auth/login',formData);
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.message){
      throw new Error(error.response?.data.error)
    }
  }
}

export async function resetPassword(formData:{email:string}){
  try {
    const { data } = await api.post('/auth/forgot-password',formData);
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.message){
      throw new Error(error.response?.data.error)
    }
  }
}

export async function validateToken(formData:{token:string}){
  try {
    const { data } = await api.get(`/auth/validate-token/${formData.token}`);
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.message){
      throw new Error(error.response?.data.error)
    }
  }
}

interface UpdatePasswordProps {
  token:string,
  data:{
    password:string
    repeatPassword:string
  }
}
export async function updatePassword(formData:UpdatePasswordProps){
  try {
    const { data } = await api.post(`/auth/update-password/${formData.token}`,formData.data);
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.message){
      throw new Error(error.response?.data.error)
    }
  }
}

export async function getAuthUser() {
  try {
    const { data } = await api.get(`/auth/user`);
    const result = AuthenticateSchema.safeParse(data);
    if(!result.success) throw new Error(result.error.message);
    return result.data
  } catch (error:any) {
    if(isAxiosError(error) && error.message){
      throw new Error(error.response?.data.error)
    }
  }
}
