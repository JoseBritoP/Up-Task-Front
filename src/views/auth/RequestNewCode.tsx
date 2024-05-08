import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmCode } from "@/server/authAPI";
import { toast } from "react-toastify";

export default function RequestNewCode() {
  const initialValues: { email: string } = {
    email: "",
  };

  const { register, handleSubmit, reset, formState: { errors }} = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn:requestConfirmCode,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(data.message);
      reset();
    }
  })
  const handleRequestCode = (formData: { email: string }) => {
    mutate(formData)
  };

  return (
    <>
      <h1 className="text-4xl font-black text-white">
        Request a new confirmation code
      </h1>
      <p className="text-2xl font-light text-white mt-5">
      Enter your email to receive a {""}
        <span className=" text-violet-400 font-bold"> new code</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-8 p-10 rounded-lg bg-white mt-10"
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
            className="w-full p-3 rounded-lg border-gray-300 border"
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
          value="Send code"
          className="bg-sky-600 hover:bg-sky-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-gray-300 font-normal"
        >
         Already have an Account? Sign in
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-300 font-normal"
        >
          Forgot your password?{" "}
        </Link>
      </nav>
    </>
  );
}
