import { Link, useNavigate } from "react-router-dom";
import { IRequestLogin } from "./interface/Auth.interface";
import { useState } from "react";
import { signIn } from "../Api/api";
import useAuthStore from "./store/AuthStore";
import portada from '../../assets/portada.png'

const INITIAL_FORM: IRequestLogin = {
  email: "",
  password: ""
}

function SignIn() {

  const [requestLogin, setRequestLogin] = useState<IRequestLogin>(INITIAL_FORM)

  const { token, setToken } = useAuthStore()

  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequestLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRequest: IRequestLogin = { ...requestLogin }

    try {
      const response = await signIn(newRequest)
      setToken(response);

      if (response) {
        navigate('/private');
      }
    } catch (error) {
      if (error instanceof Error) {

        console.log(error.message)
      };
    }
  }

  console.log(token)


  return (

    <div className=" flex w-full  h-screen">

      <img src={portada} alt="portada" className="hidden lg:block w-1/2 backdrop-blur-md" />

      <div className="flex flex-col h-screen justify-center items-center w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Bienvenido al sistema
        </h1>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-400 focus:border-emerald-500"
              value={requestLogin.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-400 focus:border-emerald-500"
              value={requestLogin.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-emerald-800 rounded-lg shadow hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            Iniciar Sesión
          </button>
          <div className="text-center">
            <span>¿ No tiene una cuenta ?</span> <Link to={'/sign-up'} className="text-emerald-900"> Crear una cuenta</Link>
          </div>
        </form>
      </div>
    </div>

  );
}

export default SignIn;
