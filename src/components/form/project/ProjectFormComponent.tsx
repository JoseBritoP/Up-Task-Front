import ProjectForm from './ProjectFormInputs'
import useFormComponent from '@/hooks/project/useProjectFormComponent'

export default function FormComponent() {

  const { register, handleSubmit, errors, handleForm } = useFormComponent();  

  return (
    <form className='mt-10 bg-white dark:bg-slate-800 shadow-lg p-10 rounded-lg' onSubmit={handleSubmit(handleForm)} noValidate>
      <ProjectForm register ={register} errors={errors}/>
      <input type="submit" value={'Create'} className='bg-sky-700 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700  w-full p-3 text-white uppercase font-bold rounded-md cursor-pointer transition-colors' />
    </form>
  )
}
