import { useEffect, useState } from "react"
import { IProfile } from "../../../../Auth/interface/Auth.interface"
import user from '../../../../../assets/user.png'
import { Trash2, LogOut } from "lucide-react"
import useAuthStore from "@/modules/Auth/store/AuthStore"
import { getProfile } from "@/modules/Api/api"
import { Pencil } from 'lucide-react';
import { useNavigate } from "react-router-dom"

const INITIAL_INFORMATION_PROFILE: IProfile = {
  email: "",
  fullName: "",
  status: "",
  ci: "",
  phone: "",
  dateOfBirth: new Date(""), // Cambiado para que sea una cadena vacía
}

function Profile() {
  const [profileUser, setProfileUser] = useState<IProfile>(INITIAL_INFORMATION_PROFILE)

  const [editInformationUser, setEditInformationUser] = useState<boolean>(true)

  const [updateProfileUser, setUpdateProfileUser] = useState();

  const [requestChangePassword, setRequestChangePassword] = useState();

  const [isPasswordEdit, setIsPasswordEdit] = useState(false)

  const { token, setToken } = useAuthStore()

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getProfile(token).then(res => {
      setProfileUser({ ...res })
      console.log(res)
    })
  }, [token])

  // Asegurarse de que la fecha sea válida antes de formatearla
  const formattedDate = profileUser.dateOfBirth && !isNaN(new Date(profileUser.dateOfBirth).getTime())
    ? new Date(profileUser.dateOfBirth).toISOString().split("T")[0]
    : "";


  const handleExitSytem = () => {

    setToken({
      access_token: "",
      refresh_token: ""
    })


  }

  const updateInformationUser = () => {
    setEditInformationUser(false)


  }

  const changePassword = () => {

    console.log("update")
  }


  const handleSubmitUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();


  };


  return (
    <div className="lg:w-1/2 mt-10 sm:w-10/12 md:w-2/3 h-screen ">
      <div className="flex flex-col border-b-2 border-gray-200 pb-5">
        <h2 className="font-medium">Cuenta</h2>
        <span className="text-gray-500 font-medium text-xs">Información detallada del usuario</span>
      </div>

      <div className="flex justify-between mt-6 border-b-2 border-gray-200 pb-6 items-center">
        <div className="flex gap-3 items-center">
          <img src={user} alt="foto" className="rounded-full w-16" />
          <div className="flex gap-1 flex-col">
            <p className="font-medium text-xs">Imagen de perfil</p>
            <span className="text-xs text-gray-500">PNG, JPEG menor a 15mb</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="border-[1px] bg-gray-50
            border-gray-300 shadow-md shadow-gray-200 text-xs p-2 rounded-lg
            text-gray-600 font-medium hover:bg-gray-100 h-10">
            Actualizar foto
          </button>
          <button className="p-2 bg-gray-200 rounded-lg text-gray-500 text-xs font-medium
            shadow-sm shadow-gray-200 hover:opacity-80 h-10">
            Eliminar
          </button>
        </div>
      </div>

      <form className="grid lg:grid-cols-2 gap-3 mt-5" onSubmit={handleSubmitUpdateUser} >
        <div className="flex flex-col pb-5">
          <label htmlFor="fullname" className="text-gray-500 text-xs font-medium pb-1">
            Nombre completo
          </label>
          <input
            type="text"
            value={profileUser.fullName}
            id="fullname"
            name="fullName"
            className="border-[1px] border-gray-300 shadow-md shadow-gray-200 text-sm p-2 rounded-lg
              text-gray-600 font-medium outline-none hover:border-emerald-400 focus:border-emerald-400"
            onChange={handleChange}
            disabled={editInformationUser}
          />
        </div>

        <div className="flex flex-col pb-5">
          <label htmlFor="ci" className="text-gray-500 text-xs font-medium pb-1">
            Documento de identidad
          </label>
          <input
            type="number"
            value={profileUser.ci}
            id="ci"
            name="ci"
            className="border-[1px] border-gray-300 shadow-md shadow-gray-200 text-sm p-2 rounded-lg
              text-gray-600 font-medium outline-none hover:border-emerald-400 focus:border-emerald-400"
            onChange={handleChange}
            disabled={editInformationUser}
          />
        </div>

        <div className="flex flex-col pb-5">
          <label htmlFor="email" className="text-gray-500 text-xs font-medium pb-1">
            Correo electrónico
          </label>
          <input
            type="text"
            value={profileUser.email}
            id="email"
            name="email"
            className="border-[1px] border-gray-300 shadow-md shadow-gray-200 text-sm p-2 rounded-lg
              text-gray-600 font-medium outline-none hover:border-emerald-400 focus:border-emerald-400"
            onChange={handleChange}
            disabled={editInformationUser}
          />
        </div>

        <div className="flex flex-col pb-5">
          <label htmlFor="dateofbirth" className="text-gray-500 text-xs font-medium pb-1">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            value={formattedDate} // Formatear correctamente
            id="dateofbirth"
            name="dateOfBirth"
            className="border-[1px] border-gray-300 shadow-md shadow-gray-200 text-sm p-2 rounded-lg
              text-gray-600 font-medium outline-none hover:border-emerald-400 focus:border-emerald-400"
            onChange={handleChange}
            disabled={editInformationUser}
          />
        </div>

        <div className="flex flex-col pb-5">
          <label htmlFor="phone" className="text-gray-500 text-xs font-medium pb-1">
            Celular
          </label>
          <input
            type="tel"
            value={profileUser.phone}
            id="phone"
            name="phone"
            className="border-[1px] border-gray-300 shadow-md shadow-gray-200 text-sm p-2 rounded-lg
              text-gray-600 font-medium outline-none hover:border-emerald-400 focus:border-emerald-400"
            onChange={handleChange}
            disabled={editInformationUser}
          />
        </div>

        <div className="flex items-center pb-5 ">

          {editInformationUser &&
            <button onClick={updateInformationUser}
              className="bg-gray-200 rounded-lg w-auto px-3 h-10 flex items-center gap-2">
              <Pencil className="w-5"></Pencil>
              Editar</button>
          }

          {
            !editInformationUser && <div className="flex gap-5 justify-around items-center ">
              <button
                className="bg-emerald-50 text-green-600 font-semibold 
              rounded-lg w-auto px-3 h-10 flex items-center gap-2"

              >Aceptar</button>
              <button className=" text-red-600 bg-red-50 rounded-lg w-auto px-3 h-10 flex items-center gap-2" onClick={() => { setEditInformationUser(true) }}


              >Cancelar</button>
            </div>
          }

        </div>

      </form>

      <div className="border-t-2 border-gray-200 pt-3 flex flex-col gap-2">
        <div>
          <p className="font-medium text-sm">Contraseña</p>
          <span className="font-medium text-xs text-gray-500">Modificar contraseña</span>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex flex-col pb-5">
            <label htmlFor="currentPassword" className="text-gray-500 text-xs font-medium pb-1">
              Actual contraseña
            </label>
            <input
              type="password"
              value={"???????????"}
              id="currentPassword"
              name="currentPassword"
              readOnly
              className="border-[1px] border-gray-300 shadow-md shadow-gray-200 text-sm p-2 rounded-lg
                text-gray-600 font-medium outline-none"
              disabled={editInformationUser}
            />
          </div>

          <div className="flex flex-col pb-5">
            <label htmlFor="newPassword" className="text-gray-500 text-xs font-medium pb-1">
              Nueva contraseña
            </label>
            <input
              type="password"
              value={"???????????"}
              id="newPassword"
              name="newPassword"
              readOnly
              className="border-[1px] border-gray-300 shadow-md shadow-gray-200 text-sm p-2 rounded-lg
                text-gray-600 font-medium outline-none"
              disabled={editInformationUser}
            />
          </div>
          <button onClick={updateInformationUser} className="bg-gray-200 rounded-lg w-auto px-3 h-10 flex items-center gap-2">
            <Pencil className="w-5"></Pencil>
            Editar</button>
        </div>
      </div>

      <div className="border-t-2 border-gray-200 pt-3 flex flex-col gap-2">
        <div>
          <p className="font-medium text-sm">Seguridad de la cuenta</p>
          <span className="font-medium text-xs text-gray-500">Administra la seguridad de tu cuenta</span>
        </div>

        <div className="flex gap-3 sm:flex-row">
          <button
            onClick={handleExitSytem}
            className="p-2 bg-gray-200 rounded-lg text-gray-500 text-xs font-medium flex items-center gap-1
            shadow-sm shadow-gray-200 hover:opacity-80 h-10 w-1/2 sm:w-auto">
            <LogOut />
            <p>Salir del sistema</p>
          </button>
          <button className="p-2 rounded-lg text-red-500 text-xs font-medium
            shadow-sm border-gray-200 border-[1px] hover:opacity-80 h-10 w-1/2 sm:w-auto flex items-center">
            <Trash2 />
            <p>Eliminar cuenta</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
