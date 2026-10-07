import { useState, useEffect } from "react";
import { dashboardApi } from "../api/dashboardApi";
import type { DashboardStatsResponse } from "../types/dashboard";
import { useAuth } from "../hooks/useAuth";

export const DashboardPage = () => {
    const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const { logout } = useAuth();

    const fetchStats = () => {
        setIsLoading(true);
        setErrorMessage("");

        dashboardApi
            .getStats()
            .then((data) => {
                setStats(data);
            })
            .catch(() => {
                setErrorMessage(
                    "Failed to load dashboard statistics. Please try again.",
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        let isMounted = true;

        dashboardApi
            .getStats()
            .then((data) => {
                if (isMounted) {
                    setStats(data);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setErrorMessage(
                        "Failed to load dashboard statistics. Please try again.",
                    );
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <main className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Overview of your job application pipeline
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="self-start sm:self-auto bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-md transition-colors focus:ring-2 focus:ring-gray-300 focus:outline-none"
                    >
                        Sign out
                    </button>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                    <div
                        role="alert"
                        className="flex items-center justify-between p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md"
                    >
                        <span>{errorMessage}</span>
                        <button
                            onClick={fetchStats}
                            className="font-medium underline hover:text-red-900"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div
                        role="status"
                        aria-label="Loading dashboard statistics"
                        className="flex justify-center items-center py-20"
                    >
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {/* Stats Grid */}
                {!isLoading && stats && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Applications Card */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Total Applications
                            </p>
                            <p className="text-3xl font-bold text-blue-600 mt-2">
                                {stats.totalApplications}
                            </p>
                        </div>

                        {/* Interviews Card */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Total Interviews
                            </p>
                            <p className="text-3xl font-bold text-amber-500 mt-2">
                                {stats.totalInterviews}
                            </p>
                        </div>

                        {/* Offers Card */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Offers Received
                            </p>
                            <p className="text-3xl font-bold text-emerald-600 mt-2">
                                {stats.totalOffers}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};
