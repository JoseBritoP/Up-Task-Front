import LoginSection from '@/components/shared/auth/LoginSection';
import RegisterSection from '@/components/shared/auth/RegisterSection';
import { useState } from 'react'

export default function AuthView() {

  const [auth,setAuth] = useState('login');

  const handleAuth = () =>{
    setAuth((prev)=> prev === 'register' ? 'login' : 'register')
  }
  return (
    <>
      {auth === 'register' ? <RegisterSection handleAuth={handleAuth}/> : <LoginSection handleAuth={handleAuth}/>}
    </>
  )
}
