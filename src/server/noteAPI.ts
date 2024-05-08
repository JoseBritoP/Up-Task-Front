/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";
import { NoteFormData } from "@/schema/NoteSchema";
import { isAxiosError } from "axios";

interface CreateNoteProps {
  taskId:string,
  formData:NoteFormData,
}

export const createNote = async (formData:CreateNoteProps) => {
  try {
    const { data } = await api.post(`/note/${formData.taskId}/notes`,formData.formData);
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.response){
      const errorMessage = error.response.data.error.issues.map((issue:{message:'string'})=>issue.message)
      throw new Error(errorMessage);
    }
  }
};

export const deleteNote = async ({taskId,noteId}:{taskId:string,noteId:string}) => {
  try {
    const { data } = await api.delete(`/note/${taskId}/notes/${noteId}`);
    return data
  } catch (error:any) {
    if(isAxiosError(error) && error.response) throw new Error(error.response.data.error);
  }
};
