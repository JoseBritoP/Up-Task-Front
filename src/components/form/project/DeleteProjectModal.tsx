// Pending error
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteProject } from "@/server/projectAPI";
import { checkProfilePasswordToDelete } from "@/server/profileAPI";

export default function DeleteProjectModal() {
  const initialValues = {
    password: "",
  };
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const deleteProjectId = queryParams.get("deleteProject")!;
  const show = deleteProjectId ? true : false;

  const queryClient= useQueryClient();

  const checkUserPasswordMutation = useMutation({
    mutationFn:checkProfilePasswordToDelete,
    onError:(error)=>{
      toast.error(error.message)
    }

  })

  const { mutateAsync } = useMutation({
    mutationFn:deleteProject,
    onError:(error)=>{
      toast.error(error.message);
    },
    onSuccess:()=>{
      toast.success(`The project was successfully deleted`);
      navigate(location.pathname,{replace:true})
      queryClient.invalidateQueries({queryKey:['projects']});
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleForm = async (formData: {password:string}) => {
    await checkUserPasswordMutation.mutateAsync(formData)
    await mutateAsync(deleteProjectId)
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => navigate(location.pathname, { replace: true })}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 text-left align-middle shadow-xl transition-all p-16">
                <Dialog.Title as="h3" className="font-black text-4xl  my-5">
                  Delete Project{" "}
                </Dialog.Title>

                <p className="text-xl font-bold">
                  Confirm that you want to delete this project by {""}
                  <span className="text-fuchsia-600">
                    entering your password
                  </span>
                </p>

                <form
                  className="mt-10 space-y-5"
                  onSubmit={handleSubmit(handleForm)}
                  noValidate
                >
                  <div className="flex flex-col gap-3">
                    <label className="font-normal text-2xl" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="w-full p-3 dark:text-black rounded-md border-gray-300 border"
                      {...register("password", {
                        required: "El password es obligatorio",
                      })}
                    />
                    {errors.password && (
                      <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                  </div>

                  <input
                    type="submit"
                    className=" bg-red-600 hover:bg-red-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                    value="Delete"
                  />
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
