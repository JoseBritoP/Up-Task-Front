import { useQuery } from '@tanstack/react-query';
import { getProject } from '../../server/projectAPI';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import AddTaskModal from '@/components/shared/task/AddTaskModalSection';
import TaskList from '@/components/Card/task/TaskListContainer';
import EditTaskContainer from '@/components/shared/task/EditTaskContainer';
import TaskModalDetails from '@/components/Card/task/TaskModalDetails';
import useAuth from '@/hooks/auth/useAuth';
import { isManager } from '@/utils/policies';
import { useMemo } from 'react';

export default function ProjectDetailView() {

  const { data:user, isLoading:AuthLoading } = useAuth();

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!

  const { data,isError,isLoading } = useQuery({
    queryKey:['project',projectId],
    queryFn:()=>getProject(projectId),
    retry:false
  })
  
  const canEdit = useMemo(()=>data?.manager === user?._id,[data,user])

  if(isError){
    <Navigate to={'/404'}></Navigate>
  }
  
  if(isLoading && AuthLoading){
    return (<p>Loading...</p>)
  }
  if(!data || data === undefined || user === undefined){
    <Navigate to={'/404'}></Navigate>
  }


  if(data && user)return (
    <article>
      <h1 className='text-4xl font-bold uppercase'>{data?.projectName}</h1>
      <p className='text-2xl font-light text-gray-500 dark:text-gray-400 mt-5'>{data?.description}</p>
      <nav className='my-5 flex gap-3'>
        {isManager(data.manager, user._id) && (
          <>
          <button className='bg-sky-600 hover:bg-sky-500 dark:bg-sky-700 dark:hover:bg-sky-600 px-6 py-2 text-white text-xl font-semibold cursor-pointer transition-colors rounded-md text-center' onClick={()=>navigate(location.pathname + `?newTask=true`)}>Add task</button>
          <Link to={'team'} className='bg-violet-500 hover:bg-violet-600 dark:bg-violet-700 dark:hover:bg-violet-600 px-6 py-2 text-white text-xl font-semibold cursor-pointer transition-colors rounded-md text-center'>Partners</Link>
          </>
        )}
        <Link to={'/projects'} className='bg-slate-600 hover:bg-slate-500 dark:bg-cyan-700 dark:hover:bg-cyan-600 px-6 py-2 text-white text-xl font-semibold cursor-pointer transition-colors rounded-md text-center'>Back to Projects</Link>
      </nav>
      {data && data.tasks && <TaskList tasks={data.tasks} userId={user._id} canEdit={canEdit}/>}
      <AddTaskModal/>
      <EditTaskContainer/>
      <TaskModalDetails/>
    </article>  
  )
}
