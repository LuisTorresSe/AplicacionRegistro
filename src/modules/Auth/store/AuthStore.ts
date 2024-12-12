import { create } from "zustand";
import { IProfile, IToken, State } from "../interface/Auth.interface";


// Define las acciones que se pueden realizar
type Action = {
  setToken: (token: State["token"]) => void;
  removeToken: () => void;
  setProfile: (profile: State["profile"]) => void;

};

const INITIAL_TOKEN: IToken= {
access_token:"",
refresh_token:""
}

const INITIAL_PROFILE :IProfile = {

  email: "",
  fullName: "",
  status: "",
  ci: "",
  phone: "",
  dateOfBirth: new Date("")
}



const initialToken:IToken = INITIAL_TOKEN;

const initialProfile: IProfile = INITIAL_PROFILE;

// Crear el store
const useAuthStore = create<State & Action>((set) => ({
  token: initialToken,
  profile: initialProfile,
  setToken: (token) => {
    set({ token });
  },
  removeToken: () => {
    set(() => ({ token:{access_token:'',refresh_token:''} }));
  },
  setProfile: (profile) => {
    set({ profile });
  }

}));

export default useAuthStore;
