/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";
import { ProfileForm, ProfileNewPasswordFormData } from "@/schema/AuthSchema";
import { isAxiosError } from "axios";

interface ChangeProfileInfoProps {
  profileId:string,
  formData:ProfileForm
}
export const changeProfileInfo = async ({profileId,formData}:ChangeProfileInfoProps) => {
  try {
    const { data } = await api.put(`auth/user/profile/${profileId}`,formData)
    return data;
  } catch (error:any) {
    if(isAxiosError(error) && error.response) throw new Error(error.response.data.error);
  }
};

interface UpdateProfilePassword {
  profileId:string,
  formData:ProfileNewPasswordFormData
}

export const updateProfilePassword = async({profileId,formData}:UpdateProfilePassword) =>{
  try {
    const { data } = await api.patch(`auth/user/profile/${profileId}`,formData)
    return data;
  } catch (error:any) {
    if(isAxiosError(error) && error.response) throw new Error(error.response.data.error);
  }
}

export const checkProfilePasswordToDelete = async (formData:{password:string}) =>{
  try {
    const { data } = await api.post(`auth/user/profile/`,formData)
    return data;
  } catch (error:any) {
    if(isAxiosError(error) && error.response) throw new Error(error.response.data.error);
  }
}