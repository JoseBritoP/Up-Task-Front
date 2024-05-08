import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { getProjects } from "../server/projectAPI"
import ProjectCardContainer from "@/components/Card/project/ProjectCardContainer";


export default function DashboardView() {

  const { data, isLoading } = useQuery({
    queryKey:['projects'],
    queryFn:getProjects
  });

  if(isLoading) return <p>Loading...</p>

  return (
    <>
      <div className="max-w-3xl pl-1">
        <h1 className='text-4xl lg:text-5xl font-bold'>My projects</h1>
        <p className=' text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-400 mt-5'>Manage your projects</p>
        <nav className="my-8">
          <Link to={'/projects/create'} className="bg-purple-700 hover:bg-purple-600 
          dark:bg-purple-800 dark:hover:bg-purple-700
          px-10 py-3 text-white text-xl font-semibold cursor-pointer transition-colors rounded-md">New Project</Link>
        </nav>
      </div>
     { data ? <ProjectCardContainer data={data}/> : (<p>No projects...</p>)}
    </>
  )
}
