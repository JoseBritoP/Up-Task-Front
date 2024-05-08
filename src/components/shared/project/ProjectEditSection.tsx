import { Link } from 'react-router-dom'
import EditFormComponent from '../../form/project/EditFormComponent'
import { EditProjectFormProps } from 'typescript/interfaces/Project'

export default function EditProjectForm({data}:EditProjectFormProps) {
  return (
    <>
      <h1 className='text-4xl lg:text-5xl font-bold'>Edit Project</h1>
      <p className=' text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-400 mt-5'>Change the values of your project</p>
      <nav className="my-8">
        <Link to={'/'} className="bg-purple-700 hover:bg-purple-600 
        dark:bg-purple-800 dark:hover:bg-purple-700
        px-10 py-3 text-white text-xl font-semibold cursor-pointer transition-colors rounded-md">Back to Projects</Link>
      </nav>
      <EditFormComponent data={data}/>
    </>
  )
}
