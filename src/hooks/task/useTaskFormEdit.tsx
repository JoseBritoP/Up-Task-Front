import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TaskFormData } from 'schema/TaskSchema';
import { updateTask } from '../../server/taskAPI';
import { EditTaskModalProps } from 'typescript/interfaces/Task'
import useAuth from '../auth/useAuth';

export default function useEditFormTask({data}:EditTaskModalProps) {
 
  const params = useParams();
  const projectId = params.projectId!
  const navigate = useNavigate();
  const taskId = data._id
  const {data:user} = useAuth();
  const initialValues:TaskFormData = {
    name:data.name,
    description:data.description,
  }

  const { register,reset, handleSubmit, formState:{errors} } = useForm({defaultValues:initialValues})

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn:updateTask,
    onError:(error)=>{
      toast.error(`${error.message}`)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['project',projectId]})
      queryClient.invalidateQueries({queryKey:['task',taskId]})
      toast.success('Task was updated successfully')
      reset();
      navigate(location.pathname,{replace:true})
      navigate(`/projects/${projectId}`)
    }
  });

  const handleForm = (formData:TaskFormData) => {
    const userId = user?._id
    const data = {
      taskId,
      formData,
      projectId,
      userId
    }
    mutate(data);
  }

  return { register, handleSubmit, errors, handleForm }
}
