import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ResetPassword } from "@/schema/AuthSchema";
import ErrorMessage from "../../shared/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/server/authAPI";
import { toast } from "react-toastify";

export default function NewPasswordForm({token}:{token:string}) {
  const navigate = useNavigate();
  const initialValues: ResetPassword = {
    password: "",
    repeatPassword: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn:updatePassword,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(data.message); 
      reset();
      navigate('/auth')
    }
  })

  const handleNewPassword = (formData: ResetPassword) => {
    const data = {
      token,
      data:formData
    }
    mutate(data)
  };

  const password = watch("password");

  return (
    <>
      <form
        onSubmit={handleSubmit(handleNewPassword)}
        className="space-y-8 p-10  bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label htmlFor="password" className="font-normal text-2xl">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 dark:text-black border-gray-300 border"
            {...register("password", {
              required: "The password is required",
              minLength: {
                value: 8,
                message: "The password must have 8 or more characters",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label htmlFor="repeatPassword" className="font-normal text-2xl">Repetir Password</label>

          <input
            id="repeatPassword"
            type="password"
            placeholder="Repeat password"
            className="w-full p-3 dark:text-black border-gray-300 border"
            {...register("repeatPassword", {
              required: "Repeat your password",
              validate: (value) =>
                value === password || `The password don't match`,
            })}
          />

          {errors.repeatPassword && (
            <ErrorMessage>{errors.repeatPassword.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Reset Password"
          className="bg-sky-700 hover:bg-sky-600 w-full p-3  text-white font-bold  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
