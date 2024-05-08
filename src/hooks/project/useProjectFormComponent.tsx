import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../server/projectAPI';
import { ProjectFormData } from 'typescript/types/Project';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

export default function useFormComponent() {

  const navigate = useNavigate();
  const initialValues:ProjectFormData = {
    projectName:'',
    clientName:'',
    description:''
  }
  const { register, handleSubmit, formState:{errors} } = useForm({defaultValues:initialValues})

  const mutation = useMutation({
    mutationFn:createProject,
    onError:(error)=>{
      toast.error(`${error.message}`)
    },
    onSuccess:(data)=>{
      toast.success(`${data.message}`)
      navigate('/projects')
    }
  });
  // const handleForm = async(formData:ProjectFormData) => {
  //   await mutation.mutateAsync(formData);
  // }
  const handleForm = (formData:ProjectFormData) => {
    mutation.mutate(formData);
  }

  return { register, handleSubmit, errors, handleForm }
}
