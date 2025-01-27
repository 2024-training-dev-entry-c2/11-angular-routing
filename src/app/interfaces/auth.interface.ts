export interface IAuth {
  email: string;
  password: string;
  role: string;
}


export interface IAuthenticationResponse {
  id: string;
  email: string;
  token: string;
}