import { Link } from 'react-router-dom';
import ProjectForm from './ProjectFormInputs'
import useEditFormComponent from '@/hooks/project/useProjectFormEditComponent';
import { EditProjectFormProps } from 'typescript/interfaces/Project'

export default function EditFormComponent({data}:EditProjectFormProps) {

  const { register, handleSubmit, errors, handleForm } = useEditFormComponent({data});

  return (
    <form className='mt-10 bg-white dark:bg-slate-800 shadow-lg p-10 rounded-lg' onSubmit={handleSubmit(handleForm)} noValidate>
      <ProjectForm register ={register} errors={errors}/>
      <div className='flex justify-between gap-x-5 items-center'>
        <input type="submit" value={'Save changes'} className='bg-green-700 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700  w-full p-3 text-white uppercase font-bold rounded-md cursor-pointer transition-colors' />
        <Link to={'/'} className='bg-red-700 text-center hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700  w-full p-3 text-white uppercase font-bold rounded-md cursor-pointer transition-colors'>Cancel changes</Link>
      </div>
    </form>
  )
}
