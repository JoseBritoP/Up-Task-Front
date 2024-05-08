import { Link } from "react-router-dom";
import { PinInput,PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/server/authAPI";
import { toast } from "react-toastify";
export default function ConfirmAccount() {

  const [token,setToken] = useState('')

  const handleChange = (token:string) => {
    setToken(token)
  };
  
  const { mutate } = useMutation({
    mutationFn:confirmAccount,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=> {
      toast.success(data.message);

    }
  })

  const handleComplete = (token:string) => {
    mutate(token)
  } 

  return (
    <>
      <h1 className="text-4xl font-bold text-white">Confirm your account</h1>
      <p className="text-xl font-light text-white mt-5">
      Enter the code you received {''}
        <span className=" text-fuchsia-500 font-bold"> by mail</span>
      </p>
      <form
        className="space-y-8 p-10 bg-white mt-10 rounded-md"
      >
        <label
          className="font-normal text-2xl text-center block"
        >6 digit code</label>
        <div className="flex justify-center gap-5">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white"/>
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/request-code'
          className="text-center text-gray-300 font-normal"
        >
          Request new code
        </Link>
      </nav>

    </>
  )
}