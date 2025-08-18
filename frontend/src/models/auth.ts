export interface UserRegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserProfile {
  username: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}