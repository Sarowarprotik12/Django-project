import api from "@/lib/api";
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  ChangePasswordRequest,
} from "../types/auth.types";

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await api.post<AuthResponse>("/accounts/login/", data);
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await api.post("/accounts/register/", data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get<User>("/accounts/me/");
    return response.data;
  },

  changePassword: async (data: ChangePasswordRequest) => {
    const response = await api.post("/accounts/change-password/", data);
    return response.data;
  },

  logout: async (refresh: string) => {
    const response = await api.post("/accounts/logout/", {
      refresh,
    });
    return response.data;
  },
};