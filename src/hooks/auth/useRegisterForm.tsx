import { Auth } from "@/schema/AuthSchema";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/server/authAPI";
import { toast } from "react-toastify";

export default function useRegisterForm() {
  const initialValues: Auth = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Auth>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
    },
  });
  const password = watch("password");

  const handleRegister = (formData: Auth) => {
    console.log(formData);
    mutate(formData);
  };

  return { register, handleSubmit, password, handleRegister, errors };
}
