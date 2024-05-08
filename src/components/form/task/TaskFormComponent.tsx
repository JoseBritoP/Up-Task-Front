import TaskForm from './TaskFormInputs'
import useFormTaskComponent from '@/hooks/task/useTaskFormComponent'

export default function TaskFormComponent() {

  const { register, handleSubmit, errors, handleForm } = useFormTaskComponent();
  
  return (
    <form className='mt-10 space-y-3' noValidate onSubmit={handleSubmit(handleForm)}>
      <TaskForm register={register} errors={errors}/>
      <input type="submit" value={'Save task'} className='bg-sky-700 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700  w-full p-3 text-white uppercase font-bold rounded-md cursor-pointer transition-colors' />
    </form>
  )
}
