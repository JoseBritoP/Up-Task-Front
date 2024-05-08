import LoginForm from '@/components/form/auth/LoginForm'
import { AuthProps } from '@/typescript/interfaces/Auth'
import { Link } from 'react-router-dom'

export default function LoginSection({handleAuth}:AuthProps) {
  return (
    <section className="space-y-8 mx-auto">
      <p className='text-center text-2xl font-semibold text-white '>
      Sign in to manage <br/> <span className=" text-fuchsia-500 font-bold"> Your projects</span>
      </p>
      <LoginForm/>
      <div className="flex justify-start items-center gap-x-2">
        <h1 className="text-gray-200 text-lg font-medium">Don't have an account?</h1>
        <button onClick={()=>handleAuth()} className="text-lg font-semibold text-sky-500 hover:text-sky-400 shadow-md hover:underline">Sign up</button>
      </div>
      <Link to={'/auth/forget-password'} className='text-lg text-gray-200 font-medium'>Forgot your password?</Link>
    </section>
  )
}
