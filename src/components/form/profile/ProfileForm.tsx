import ErrorMessage from "@/components/shared/ErrorMessage";
import { AuthenticateType, ProfileForm as ProfileFormType } from "@/schema/AuthSchema";
import { changeProfileInfo } from "@/server/profileAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ProfileFormProps {
  data:AuthenticateType
}

export default function ProfileForm({ data }:ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormType>({ defaultValues: data });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn:changeProfileInfo,
    onError:(error)=>{
      toast.error(error.message)
    },
    onSuccess:(data)=>{
      toast.success(data.message);
      queryClient.invalidateQueries({queryKey:['user']})
    }
  })

  const handleEditProfile = (formData:ProfileFormType) => {
    const dataProp = {
      profileId:data._id,
      formData
    }
    mutate(dataProp)
  };

  return (
    <>
      <div className="mx-auto max-w-3xl g">
        <h1 className="text-3xl font-black ">My Profile</h1>
        <p className="text-xl font-light text-gray-500 mt-5">
         Here you can update your information
        </p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className=" mt-14 space-y-5  bg-white dark:bg-slate-800/50 rounded-md shadow-lg p-10 rounded-l"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              className="w-full p-3 dark:text-gray-800 rounded-md border border-gray-200"
              {...register("name", {
                required: "Your name is required",
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Your Email"
              className="w-full p-3  border border-gray-200 rounded-md dark:text-gray-700"
              {...register("email", {
                required: "Your email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail invalid",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <input
            type="submit"
            value="Save changes"
            className="bg-green-600 hover:bg-green-600/90 dark:bg-green-700  w-full rounded-md p-3 text-white uppercase font-bold dark:hover:bg-green-600 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
