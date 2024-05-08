import FormComponent from "@/components/form/project/ProjectFormComponent";
import { Link } from "react-router-dom";

export default function CreateProjectView() {
  return (
    <>
      <h1 className='text-4xl lg:text-5xl font-bold'>Create Project</h1>
      <p className=' text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-400 mt-5'>Fill out the form to create a project</p>
      <nav className="my-8">
        <Link to={'/'} className="bg-purple-700 hover:bg-purple-600 
        dark:bg-purple-800 dark:hover:bg-purple-700
        px-10 py-3 text-white text-xl font-semibold cursor-pointer transition-colors rounded-md">Back to Projects</Link>
      </nav>
      <FormComponent/>
    </>
  )
}
