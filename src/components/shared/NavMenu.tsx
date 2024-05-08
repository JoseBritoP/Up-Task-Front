import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { AuthenticateType } from '@/schema/AuthSchema'
import { useQueryClient } from '@tanstack/react-query'

interface NavMenuProps {
  user:AuthenticateType
}
export default function NavMenu({user}:NavMenuProps) {

  const queryClient = useQueryClient();
  const handleLogout = () => {
    queryClient.invalidateQueries({queryKey:['user']})
    localStorage.removeItem('AUTH_TOKEN');
  };
  return (
    <Popover className="relative">
      <Popover.Button aria-label='NavMenuHamburger' className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-purple-600 dark:bg-purple-800">
        <Bars3Icon className='w-8 h-8 text-white ' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white dark:bg-slate-900 p-4 text-base font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5 dark:text-gray-200 border-2 border-gray-200 dark:border-purple-900/50">
            <p className='text-start px-2'>Hello: {user.name}</p>
            <Link
              to='/profile'
              className='block p-2 hover:text-purple-950 dark:hover:text-purple-600'
            >My Perfil</Link>
            <Link
              to='/'
              className='block p-2 hover:text-purple-950 dark:hover:text-purple-600'
            >My projects</Link>
            <button
              className='block p-2 hover:text-purple-950 dark:hover:text-purple-600'
              type='button'
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
