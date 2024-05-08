import RegisterForm from "@/components/form/auth/RegisterForm";
import { AuthProps } from "@/typescript/interfaces/Auth";

export default function RegisterSection({handleAuth}:AuthProps) {
  return (
    <section className="space-y-8 mx-auto">
      <h1 className="text-center text-2xl font-black text-white">Create Account</h1>
      <p className="text-xl font-light text-white mt-5">
      Fill out the form to  {""}
        <span className=" text-fuchsia-500 font-bold"> create your account</span>
      </p>
      <RegisterForm/>
      <div className="flex justify-start items-center gap-x-2">
        <h1 className="text-gray-200 text-lg font-medium">Already have an account?</h1>
        <button onClick={()=>handleAuth()} className="text-lg font-semibold text-sky-500 hover:text-sky-400 shadow-md hover:underline">Sign in</button>
      </div>
    </section>
  )
}
