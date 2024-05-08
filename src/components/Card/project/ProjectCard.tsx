import { ProjectCardProps } from 'typescript/interfaces/Project'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { deleteProject } from '../../../server/projectAPI';
import { toast } from 'react-toastify'
import useAuth from '@/hooks/auth/useAuth'
import { isManager } from '@/utils/policies'

export default function ProjectCard({project}:ProjectCardProps) {

  const { data:user } = useAuth();

  const queryClient= useQueryClient();
  const { mutate } = useMutation({
    mutationFn:deleteProject,
    onError:(error)=>{
      toast.error(error.message);
    },
    onSuccess:()=>{
      toast.success(`The project was successfully deleted`);
      queryClient.invalidateQueries({queryKey:['projects']});
    }
  })
  if(project && user)return (
    <li key={project._id} className="flex justify-between gap-x-6 px-5 py-10">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto space-y-2">
          <div>
            {isManager(project.manager,user._id) ? 
              (<p className='text-sky-600 dark:text-sky-200 font-bold text-xs uppercase bg-sky-50 dark:bg-sky-700 border-2 border-sky-500 mb-2 rounded-lg inline-block py-1 px-6'>Manager</p>) : 
              (<p className='text-violet-600 dark:text-violet-200 font-bold text-xs uppercase bg-sky-50 dark:bg-violet-700 border-2 border-violet-500 mb-2 rounded-lg inline-block py-1 px-6'>Partner</p>)
            }
          </div>
          <Link to={`/projects/${project._id}`} className="text-gray-600 dark:text-gray-300 cursor-pointer hover:underline text-3xl font-bold">{project.projectName}</Link>
          <p className="text-sm text-gray-400">Client: <span>{project.clientName}</span></p>
          <p className="text-sm text-gray-400">{project.description}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-6">
        <Menu as="div" className="relative flex-none">
          <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50">
            <span className="sr-only">options</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
          </Menu.Button>
          <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-700 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                <Link to={`/projects/${project._id}`} className='block px-3 py-1 text-sm leading-6 text-gray-900 font-semibold hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-500'>See details</Link>
              </Menu.Item>
              {project.manager === user?._id && (
                <>
                  <Menu.Item>
                    <Link to={`/projects/${project._id}/edit`} className='block px-3 py-1 text-sm leading-6 text-gray-900 font-semibold hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-500'>Edit</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <button type='button' className='block px-3 py-1 text-sm leading-6 text-red-500 font-semibold dark:text-red-400 ' onClick={() => mutate(project._id) }>Delete</button>
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  )
}
