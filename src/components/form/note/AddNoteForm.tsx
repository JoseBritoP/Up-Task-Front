import ErrorMessage from "@/components/shared/ErrorMessage"
import { NoteFormData } from "@/schema/NoteSchema"
import { createNote } from "@/server/noteAPI"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"

export default function AddNoteForm() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('viewTask')!

  const initialValues:NoteFormData = {
    content:''
  }

  const queryClient = useQueryClient();
  const { mutate } =useMutation({
    mutationFn:createNote,
    onError:(error)=>{
      toast.error(error.message);
    },
    onSuccess:(data)=>{
      toast.success(data.message)
      queryClient.invalidateQueries({queryKey:['task',taskId]})
    }
  })
  const { register, handleSubmit, reset, formState:{errors} } = useForm({defaultValues:initialValues})

  const handleAddNote = (formData:NoteFormData) => {
    const data = {
      taskId,
      formData
    }
    mutate(data);
    reset()
  }

   return (
    <form onSubmit={handleSubmit(handleAddNote)} className='space-y-3' noValidate>
      
      <div className='flex flex-col gap-2'>
        <label htmlFor="content">Create Note</label>
        <input type="text" id='content' className='w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md dark:text-black' placeholder='Content...'   
        {...register('content',{
          required:'The content is required'
        })}
      />
      {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
      </div>
      <input type="submit"  value={'Add note'} className='bg-green-700 hover:bg-green-600 w-full p-3 rounded-md dark:hover:bg-green-500 text-white font-bold cursor-pointer '/>
    </form>
  )
}
