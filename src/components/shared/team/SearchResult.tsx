import { TeamMemberType } from "@/schema/TeamMemberSchema";
import { addPartnetToProject } from "@/server/teamAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface SearchResultProps {
  user: TeamMemberType;
  resetData:()=>void
}

export default function SearchResult({ user, resetData }: SearchResultProps) {

  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn:addPartnetToProject,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(`The ${data.message}`);
      resetData();
      navigate(location.pathname,{replace:true})
      queryClient.invalidateQueries({queryKey:['projectTeam',projectId]})
    }
  })

  const handleAddUser = () => {
    const data = {
      projectId,
      formData:{
        id:user._id
      }
    }

    mutate(data)
  }
  return (
    <>
      <p className="mt-10 mb-54 text-center font-bold text-2xl">Result:</p>
      <div className="flex justify-between items-center">
        <p className="text-xl">{user.name}</p>
        <button className="text-purple-600 hover:bg-purple-200 dark:text-purple-100 dark:bg-purple-600 px-6 py-2 font-bold cursor-pointer rounded-md"
          onClick={handleAddUser}
        >Add to project</button>
      </div>
    </>
  );
}
