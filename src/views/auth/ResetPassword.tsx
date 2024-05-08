import ErrorMessage from "@/components/shared/ErrorMessage";
import { resetPassword } from "@/server/authAPI";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {

  const initialValues: {email:string} = {
    email: "",
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn:resetPassword,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(data.message);
      reset();
    }
  })

  const handleForgotPassword = (formData: {email:string}) => {
    mutate(formData)
  };

  return (
    <>
      <h1 className="text-4xl font-semibold text-white">Reset Password</h1>
      <p className="text-2xl font-light text-white my-5">Forget your password? Enter your email address and <span className="text-fuchsia-500 font-semibold">follow the instructions</span></p>
      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10  bg-gray-100"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email..."
            className="w-full p-3 rounded-md border-gray-300 border bg-gray-200"
            {...register("email", {
              required: "The email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail invalid",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Send instructions"
          className="rounded-md bg-sky-800 hover:bg-sky-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth"
          className="text-center text-gray-200 text-xl font-normal"
        >
          Already have an Account?
        </Link>
      </nav>
    </>
  );
}
