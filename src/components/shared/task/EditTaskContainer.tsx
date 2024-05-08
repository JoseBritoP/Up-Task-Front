import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTaskId } from '../../../server/taskAPI';
import EditTaskModal from './EditTaskModal';
export default function EditTaskContainer() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('editTask')

  const { data, isError } = useQuery({
    queryKey:['task',taskId],
    queryFn:()=>getTaskId(taskId!),
    enabled:!!taskId,
    retry:false
  });

  if(isError){
    return <Navigate to={'/404'}/>
  }

  return (
    <>
      {data && <EditTaskModal data={data}/>}
    </>
  )
}
