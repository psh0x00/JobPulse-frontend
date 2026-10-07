import { axiosClient } from "./axiosClient";
import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
} from "../types/auth";

export const authApi = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await axiosClient.post(
            "/api/v1/auth/login",
            credentials,
        );
        return response.data;
    },

    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
        const response = await axiosClient.post<AuthResponse>(
            "/api/v1/auth/register",
            userData,
        );
        return response.data;
    },
};
