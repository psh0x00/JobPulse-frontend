import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { authApi } from "../api/authApi";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await authApi.login({ email, password });

            login(response.token);

            navigate("/dashboard");
        } catch {
            setErrorMessage("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Sign in to JobPulse
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Track and manage your job applications
                    </p>
                </div>

                {errorMessage && (
                    <div
                        role="alert"
                        className="mb-6 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md"
                    >
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email-input"
                            className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                            Email Address
                        </label>
                        <input
                            id="email-input"
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password-input"
                            className="block text-sm font-medium text-gray-700 mb-1.5"
                        >
                            Password
                        </label>
                        <input
                            id="password-input"
                            type="password"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 focus:outline-none transition-colors"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </main>
    );
};
