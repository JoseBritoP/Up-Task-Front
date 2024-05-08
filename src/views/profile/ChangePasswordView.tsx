import ErrorMessage from "@/components/shared/ErrorMessage";
import useAuth from "@/hooks/auth/useAuth";
import { ProfileNewPasswordFormData } from "@/schema/AuthSchema";
import { updateProfilePassword } from "@/server/profileAPI";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";

export default function ChangePasswordView() {

  const { data:Profile } = useAuth();
  const initialValues = {
    currentPassword: '',
    repeatPassword: '',
    newPassword: ''
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const password = watch('currentPassword');

  const { mutate } = useMutation({
    mutationFn:updateProfilePassword,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(data.message)
      reset()
    }
  })

  if(!Profile) return <p>Loading...</p>

  const handleChangePassword = (formData:ProfileNewPasswordFormData) => { 
    const dataProps = {
      profileId:Profile._id,
      formData
    }

    mutate(dataProps)
  }

  return (
    <>
      <div className="mx-auto max-w-3xl">

        <h1 className="text-5xl font-black ">Change Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Use this form to update your password</p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white dark:bg-slate-800 shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="currentPassword"
            >Current Password</label>
            <input
              id="currentPassword"
              type="password"
              placeholder="Current Password"
              className="w-full p-3 dark:text-black rounded-md border border-gray-200"
              {...register("currentPassword", {
                required: "Current Password is required",
              })}
            />
            {errors.currentPassword && (
              <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="repeatPassword"
            >Repeat Password</label>
            <input
              id="repeatPassword"
              type="password"
              placeholder="Repeat Password"
              className="w-full p-3 dark:text-black rounded-md border border-gray-200"
              {...register("repeatPassword", {
                required: "This field is required",
                validate: value => value === password || 'Password not match',
                minLength: {
                  value: 3,
                  message: 'The password must have min 3 characters'
                }
              })}
            />
            {errors.repeatPassword && (
              <ErrorMessage>{errors.repeatPassword.message}</ErrorMessage>
            )}
          </div>
          <div className="mb-5 space-y-3">
            <label
              htmlFor="newPassword"
              className="text-sm uppercase font-bold"
            >New Password</label>

            <input
              id="newPassword"
              type="password"
              placeholder="New Passowrd..."
              className="w-full p-3 dark:text-black rounded-md border border-gray-200"
              {...register("newPassword", {
                required: "This field is required",
              })}
            />
            {errors.newPassword && (
              <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
            )}
          </div>

          <input
            type="submit"
            value='Change Password'
            className="bg-amber-600 w-full p-3 text-white uppercase font-bold hover:bg-amber-700 cursor-pointer transition-colors rounded-md"
          />
        </form>
      </div>
    </>
  )
}