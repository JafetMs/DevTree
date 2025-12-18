import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoginForm } from "../types";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { api } from "../config/axios";
export const LoginView = () => {
  const navigate = useNavigate();
  const defaultValues = {
    email: "",
    password: "",
  };
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
  });

  const handleLogin = async(formData:LoginForm) => {
    try {
      const { data } = await api.post('/auth/login', formData);
      localStorage.setItem('AUTH_TOKEN',data)
      navigate('/admin')
      

    } catch (error) {
       // Read messages from backend
        if(isAxiosError(error) && error.response){
                      toast.error(error.response?.data.error)
                  }
    }
  }
  return (
    <>
      <h1 className="text-4xl text-[#b90343] font-bold">Log in</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-[#18181B]  px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-[#b90343]">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-[#27272A] border-none p-3 rounded-lg text-slate-200 "
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
          <label htmlFor="password" className="text-2xl text-[#b90343]">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-[#27272A] border-none p-3 rounded-lg text-slate-200 "
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
          className="bg-[#b90343] p-3 text-lg w-full uppercase text-white rounded-lg font-bold cursor-pointer"
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
