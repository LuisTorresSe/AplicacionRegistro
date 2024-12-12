
import { IRequestLogin, IRequestSignUp, IToken } from "../Auth/interface/Auth.interface"


const API_URL:string = import.meta.env.VITE_API_URL


export async function singUp(newUser:IRequestSignUp){
    try{
            const response = await fetch(`${API_URL}/auth/register`,{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    ...newUser
                })
            })

            if (!response.ok) {
                if (response.status === 400) {
                  throw new Error('Correo o contraseña incorrectos.');
                } else if (response.status === 500) {
                  throw new Error('Error en el servidor. Intenta más tarde.');
                } else if (response.status === 401) {
                  throw new Error('Usuario no autorizado');
                } else {
                  throw new Error('Algo salió mal.');
                }
              }
            
              return response;
    }
    catch(error:unknown){
        if(error instanceof Error)
        {
            throw new Error (error.message|| "algo salio mal")
        }
    }
}


export async function signIn(requestLogin:IRequestLogin){
    try{
        const response = await fetch(`${API_URL}/auth/login`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                ...requestLogin
            })
        })

        if (!response.ok) {
            if (response.status === 400) {
              throw new Error('Correo o contraseña incorrectos.');
            } else if (response.status === 500) {
              throw new Error('Error en el servidor. Intenta más tarde.');
            } else if (response.status === 401) {
              throw new Error('Usuario no autorizado');
            } else {
              throw new Error('Algo salió mal.');
            }
          }
        
          const data = await response.json();
          return data;
}
catch(error:unknown){
    if(error instanceof Error)
    {
        throw new Error (error.message|| "algo salio mal")
    }
}
}


export async function getProfile(token:IToken){

  try{
    const response = await fetch(`${API_URL}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.access_token}` // Agregar el token en el encabezado
      },
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Correo o contraseña incorrectos.');
      } else if (response.status === 500) {
        throw new Error('Error en el servidor. Intenta más tarde.');
      } else if (response.status === 401) {
        throw new Error('Usuario no autorizado');
      } else {
        throw new Error('Algo salió mal.');
      }
    }

    return await response.json();
}
catch(error:unknown){
if(error instanceof Error)
{
    throw new Error (error.message|| "algo salio mal")
}
}


}