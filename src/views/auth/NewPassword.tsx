import NewPasswordForm from "@/components/form/auth/NewPasswordForm";
import NewPasswordToken from "@/components/shared/auth/NewPasswordToken";
import { useState } from "react";

export default function NewPassword() {
  const [isValidToken,setIsValidToken] = useState(false);
  const [token,setToken] = useState('')
  return (
    <>
      <h1 className="text-4xl font-semibold text-white">Reset Password</h1>
      <p className="text-2xl font-light text-white my-5">Enter the 6 code to <span className="text-fuchsia-500 font-semibold">reset your password</span></p>
      {!isValidToken ? <NewPasswordToken token={token} setToken={setToken} setIsValidToken={setIsValidToken}/> : <NewPasswordForm token={token}/>} 
    </>
  )
}
