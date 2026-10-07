import { useAuth } from "../hooks/useAuth";

export const DashboardPage = () => {
    const { logout } = useAuth();

    return (
        <main className="min-h-screen bg-graybg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Dashboard
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Protected area, you are authenticated!
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </main>
    );
};
