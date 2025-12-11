import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoginForm } from "../types";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { api } from "../config/axios";
export const LoginView = () => {
  const defaultValues = {
    email: "alexcero_@hotmail.com",
    password: "password",
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
  });

  const handleLogin = async(formData:LoginForm) => {
    try {
      const { data } = await api.post('/auth/login', formData);
      localStorage.setItem('AUTH_TOKEN',data)
      toast.success(data)
      

    } catch (error) {
       // Read messages from backend
        if(isAxiosError(error) && error.response){
                      toast.error(error.response?.data.error)
                  }
    }
  }
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Log in</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail not valid",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Iniciar Sesión"
        />
      </form>
      <nav>
        <Link
          className="text-center text-white text-lg block"
          to="/auth/register"
        >
          Don't have an account? Sing up
        </Link>
      </nav>
    </>
  );
};
