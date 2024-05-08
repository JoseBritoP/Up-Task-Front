import useAuth from '@/hooks/auth/useAuth'
import { Note } from '@/schema/TaskSchema'
import { deleteNote } from '@/server/noteAPI';
import { formatDate } from '@/utils/index'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

interface NoteCardProps {
  note:Note
}
export default function NotesCard({note}:NoteCardProps) {

  const { data, isLoading } = useAuth();

  const canDelete = useMemo(()=>data?._id === note.createdBy._id,[data,note.createdBy._id])

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn:deleteNote,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(data.message)
      queryClient.invalidateQueries({queryKey:['task',note.task]})
    }
  })

  const handleDelete = () =>{
    const data = {
      taskId:note.task,
      noteId:note._id
    }
    mutate(data)
  }


  if(isLoading) return <p>Loading...</p>
  return (
    <div className='p-3 flex justify-between items-center'>
      <div className='flex flex-col items-start'>
        <p className='font-semibold'>{note.content} by <span className='font-bold'>{note.createdBy.name}</span></p>
        <p className='text-xs text-slate-500'>{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && <button className='bg-red-400 dark:bg-red-600 dark:hover:bg-red-500 hover:bg-red-500 py-2 px-3 rounded-md text-xs text-white font-bold cursor-pointer transition-colors ease-in-out'
        onClick={handleDelete}
      >Delete</button>}
    </div>
  )
}
