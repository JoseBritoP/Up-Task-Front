/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { editProject } from '../../server/projectAPI';
import { ProjectFormData } from 'typescript/types/Project';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditProjectFormProps } from 'typescript/interfaces/Project';

export default function useEditFormComponent({data}:EditProjectFormProps) {
  const params = useParams();
  const projectId = params.projectId!
  const navigate = useNavigate();
  const initialValues:ProjectFormData = {
    projectName:data.projectName,
    clientName:data.clientName,
    description:data.description
  }
  const { register, handleSubmit, formState:{errors} } = useForm({defaultValues:initialValues})

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn:editProject,
    onError:(error)=>{
      toast.error(`${error.message}`)
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['projects']})
      queryClient.invalidateQueries({queryKey:['project',projectId]})
      toast.success('Project updated successfully')
      navigate('/projects')
    }
  });

  const handleForm = (formData:ProjectFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data);
  }

  return { register, handleSubmit, errors, handleForm }
}
