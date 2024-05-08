import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { getProject } from "../../server/projectAPI";
import EditProjectForm from "@/components/shared/project/ProjectEditSection";

export default function EditProjectView() {
  const params = useParams();
  const projectId = params.projectId!

  const { data,isError,isLoading } = useQuery({
    queryKey:['project',projectId],
    queryFn:()=>getProject(projectId),
    retry:false
  })

  if(isError){
    <Navigate to={'/404'}></Navigate>
  }

  if(isLoading){
    return (<p>Loading...</p>)
  }

  // console.log(data)

  return (
    <>
      {data && <EditProjectForm data={data}/>}
    </>
  )
}
