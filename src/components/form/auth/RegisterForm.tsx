import ErrorMessage from "@/components/shared/ErrorMessage";
import useRegisterForm from "@/hooks/auth/useRegisterForm";

export default function RegisterForm() {

  const { register, handleSubmit, password, handleRegister,errors } = useRegisterForm();

  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="space-y-8 p-10 bg-white mt-10 rounded-md"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md dark:text-black border-gray-300 border"
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

        <div className="flex flex-col gap-5">
          <label htmlFor="name" className="font-normal text-2xl">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className="w-full rounded-md p-3 dark:text-black border-gray-300 border"
            {...register("name", {
              required: "The name is required",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label htmlFor="password" className="font-normal text-2xl">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3 rounded-md dark:text-black border-gray-300 border"
            {...register("password", {
              required: "The password is required",
              minLength: {
                value: 8,
                message: "The password must have 8 characters",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label htmlFor="repeatPassword" className="font-normal text-2xl">
            Repeat Password
          </label>

          <input
            id="repeatPassword"
            type="password"
            placeholder="Repeat the password"
            className="w-full p-3 rounded-md border-gray-300 border"
            {...register("repeatPassword", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || `The Passwords don't match`,
            })}
          />

          {errors.repeatPassword && (
            <ErrorMessage>{errors.repeatPassword.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Sign up"
          className="bg-sky-600 hover:bg-sky-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </>
  );
}
