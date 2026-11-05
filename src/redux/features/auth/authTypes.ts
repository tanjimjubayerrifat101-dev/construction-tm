export interface IAdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
  avatar?: {
    url: string;
    public_id?: string;
  };
}

export interface IAuthState {
  user: IAdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  data: {
    user: IAdminUser;
    accessToken: string;
  };
}

export interface IGenericResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}
