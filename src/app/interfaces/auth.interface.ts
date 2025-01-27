export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
  token: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  role: string;
}
