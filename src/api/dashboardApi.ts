import { axiosClient } from "./axiosClient";
import type { DashboardStatsResponse } from "../types/dashboard";

export const dashboardApi = {
    getStats: async (): Promise<DashboardStatsResponse> => {
        const response = await axiosClient.get<DashboardStatsResponse>(
            "/api/v1/dashboard/stats",
        );

        return response.data;
    },
};
