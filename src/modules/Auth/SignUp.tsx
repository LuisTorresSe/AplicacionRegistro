import { useState } from "react";
import { IFormSignUp, IRequestSignUp } from "./interface/Auth.interface";
import { singUp } from "../Api/api";
import portada from "../../assets/portada2.jpg"
import { useNavigate } from "react-router-dom";


const INITIAL_FORM: IFormSignUp = {
  email: "",
  fullName: "",
  password: "",
  confirmPassword: "",
  fullname: "",
  ci: "",
  phone: "",
  dateOfBirth: new Date("")
}



function SignUp() {
  const [formData, setFormData] = useState<IFormSignUp>(INITIAL_FORM);


  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password != formData.confirmPassword) {
      throw new Error('Las contraseñas no coinciden')
    }

    const registerNewUser: IRequestSignUp = { ...formData }

    singUp(registerNewUser).then(res => {
      if (res?.ok) {
        setFormData(INITIAL_FORM)
        navigate('/sign-in')
      }
    })
  };

  const handleCancel = () => {
    navigate('/sign-in')
  }


  return (
    <div className="flex w-full justify-center items-center">


      <div className=" w-[90%]  md:w-3/5 px-10">

        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            Registrate
          </h2>
          <p className="text-xs text-gray-600">
            Ingresa tu información para crear tu cuenta y comenzar
          </p>
        </div>



        <form onSubmit={handleSubmit}>

          <div className="grid gap-x-4 gap-y-5 " >

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre completo
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Ingresa tu nombre completo"
                value={formData.fullName}
                onChange={handleChange}
                className="pl-3 mt-2 text-sm border-none outline outline-2 h-10 outline-gray-300 rounded-md w-full  focus:outline-emerald-300 placeholder:text-xs placeholder:align-middle placeholder:font-medium "
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Ingresa tu correo"
                value={formData.email}
                onChange={handleChange}
                className="pl-3 mt-2 text-sm  border-none outline outline-2 h-10 outline-gray-300 rounded-md w-full  focus:outline-emerald-300 placeholder:text-xs placeholder:align-middle placeholder:font-medium "
                required

              />
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha de Nacimiento
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth.toString()}
                onChange={handleChange}
                className="pl-3 mt-2 text-sm border-none outline outline-2 h-10 outline-gray-300 rounded-md w-full  focus:outline-emerald-300 placeholder:text-xs placeholder:align-middle placeholder:font-medium "
                required

              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Ingresa tu teléfono"
                value={formData.phone}
                onChange={handleChange}
                className="pl-3 mt-2 text-sm border-none outline outline-2 h-10 outline-gray-300 rounded-md w-full  focus:outline-emerald-300 placeholder:text-xs placeholder:align-middle placeholder:font-medium "
                required
              />
            </div>

            <div>
              <label
                htmlFor="ci"
                className="block text-sm font-medium text-gray-700"
              >
                Documento de Identidad (CI)
              </label>
              <input
                id="ci"
                name="ci"
                type="text"
                placeholder="Ingresa tu CI"
                value={formData.ci}
                onChange={handleChange}
                className="pl-3 mt-2 text-sm border-none outline outline-2 h-10 outline-gray-300 rounded-md w-full  focus:outline-emerald-300 placeholder:text-xs placeholder:align-middle placeholder:font-medium "
                required
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
                name="password"
                type="password"
                placeholder="Crea una contraseña"
                value={formData.password}
                onChange={handleChange}
                className="pl-3 mt-2 text-sm border-none outline outline-2 h-10 outline-gray-300 rounded-md w-full  focus:outline-emerald-300 placeholder:text-xs placeholder:align-middle placeholder:font-medium "
                required
              />
            </div>

            <div>

              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-3 mt-2 text-xs border-none outline outline-2 h-10 outline-gray-300 rounded-md w-full  focus:outline-emerald-300 placeholder:text-xs placeholder:align-middle placeholder:font-medium "
                required
              />
            </div>
          </div>

          <div className="flex justify-around mt-5 gap-3">


            <button type="submit" onSubmit={handleSubmit} className=" w-1/2 px-8 py-2 text-white bg-emerald-800 rounded-lg shadow hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50">
              Registrar
            </button>

            <button className=" w-1/2 bg-gray-200 shadow-sm shadow-gray-200 rounded-lg" onClick={handleCancel}>
              Cancelar
            </button>
          </div>

        </form>

      </div>

      <div className="w-2/3 h-screen hidden xl:block">
        <img src={portada} alt="portada registro" className="h-screen" />
      </div>
    </div>
  );
}

export default SignUp;
