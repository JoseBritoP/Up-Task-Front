import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery,useQueryClient,useMutation } from "@tanstack/react-query";
import { getTaskId, taskStatus } from "@/server/taskAPI";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/index";
import { statusTranslations } from "@/locales/qs";
import { TaskStatus } from "@/schema/TaskSchema";
import useAuth from "@/hooks/auth/useAuth";
import NotePanel from "@/components/shared/note/NotePanel";

export default function TaskModalDetails() {

  const { data:user } = useAuth();
  const params = useParams();
  const projectId = params.projectId!
  const navigate = useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('viewTask')!
  const show = taskId ? true : false

  const queryClient = useQueryClient();

  const { data, error, isError } = useQuery({
    queryKey:['task',taskId],
    queryFn:()=>getTaskId(taskId),
    enabled:!!taskId,
    retry:false
  });

  const { mutate } = useMutation({
    mutationFn:taskStatus,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(data.message)
      queryClient.invalidateQueries({queryKey:['project',projectId]})
      queryClient.invalidateQueries({queryKey:['task',taskId]})
    }
  });

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement> ) =>{
    const status = e.target.value as TaskStatus;
    const userId = user?._id
    const data = {
      taskId,
      status,
      userId
    }
    mutate(data);
    navigate(location.pathname,{replace:true})
  }

  if(isError){
    toast.error(error.message,{toastId:'error'})
    return <Navigate to={`/projects/${projectId}`}/>
  }

  if(data) return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname,{replace:true})}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 text-left align-middle shadow-xl transition-all p-16">
                  <p className="text-sm text-slate-400 dark:text-slate-200">Adden on: <span className="font-semibold text-slate-600 dark:text-slate-400">{data.createdAt && formatDate(data.createdAt?.toString())}</span> </p>
                  <p className="text-sm text-slate-400 dark:text-slate-200">
                    Last update: <span className="font-semibold text-slate-600 dark:text-slate-400"> {data.updatedAt && formatDate(data.updatedAt?.toString())}</span>
                  </p>
                  <Dialog.Title
                    as="h3"
                    className="font-black text-4xl text-slate-600 dark:text-gray-100/90 my-5"
                  >
                    {data.name}
                  </Dialog.Title>
                  <p className="text-lg text-slate-500 dark:text-gray-200 mb-2">Description:  <span className="text-base">{data.description}</span></p>
                  {data.completedBy.length !== 0 && (
                    <>
                      <p className="text-lg text-slate-500 dark:text-slate-200 mb-2">History</p>
                      <ul className="list-decimal">
                        {data.completedBy.map(({_id,status,user})=>(
                          <li key={_id} className="font-semibold">{status} {' by '} 
                          <span className="font-bold text-slate-600 dark:text-slate-300">{user.name}</span>
                        </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <div className="my-5 space-y-3">
                    <label htmlFor="status" className="font-bold">Current status: </label>
                    <select name="status" id="status" onChange={handleChange} className="w-full p-3 bg-white dark:bg-slate-700 rounded-md dark:text-gray-100" defaultValue={data.status}>
                      {Object.entries(statusTranslations).map(([key,value])=>(
                        <option key={key} value={key}>{value}</option>
                      ))}
                    </select>
                  </div>
                  <NotePanel notes={data.notes}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
