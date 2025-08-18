export interface UserRegisterRequest {
  username: string;
  password: string;
  email: string;
  phone: string;
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserProfile {
  username: string;
  email: string;
  phone: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}