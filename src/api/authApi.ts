import { axiosClient } from "./axiosClient";
import type { LoginRequest, AuthResponse } from "../types/auth";

export const authApi = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await axiosClient.post(
            "/api/v1/auth/login",
            credentials,
        );
        return response.data;
    },
};
