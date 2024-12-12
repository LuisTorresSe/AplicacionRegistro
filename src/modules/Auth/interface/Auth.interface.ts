
export interface IToken{
  access_token :string
  refresh_token:string
}

export type State = {
  token: IToken;
  profile: IProfile;
};

export type Action = {
  setToken: (token: State["token"]) => void;
  removeToken: () => void;
  setProfile: (profile: State["profile"]) => void;
  removeProfile: () => void;
};


export interface IFormSignUp extends IRequestSignUp{
  confirmPassword :string
}


export interface IRequestSignUp{
  fullName:string,
  email:string,
  password:string,
  fullname:string,
  ci:string,
  phone:string,
  dateOfBirth:Date
}

export interface IRequestLogin{
  email:string,
  password:string
}

export interface IProfile {
  email: string;
  fullName: string;
  status: string
  ci:string
  phone: string
  dateOfBirth: Date
  }
  