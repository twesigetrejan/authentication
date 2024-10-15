"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify"; // Import toast

export default function SignUpPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // New state for password confirmation
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            toast.error("Passwords do not match."); // Show error message with Toastify
            setLoading(false);
            return;
        }

        // Create a new user in Supabase
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
            toast.error(error.message); // Show error message with Toastify
        } else {
            console.log("User data:", data);
            await signIn("credentials", { email, password, redirect: false });
            toast.success("Signup successful! Please log in."); // Show success message with Toastify
            router.push("/login");
        }
    };

    return (
        <div className="w-full flex bg-blue-600 justify-center items-center h-[100vh]">
            <div className="flex flex-col bg-white justify-center items-center p-8 rounded-md shadow-lg">
                <h1 className="text-lg font-bold mb-4">Sign Up</h1>
                {loading ? (
                    <div className="flex flex-col items-center">
                        <p className="text-blue-500 mb-4">Signing you up...</p>
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        <label className="mb-2 flex flex-col">
                            Email
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border p-2 rounded"
                            />
                        </label>
                        <label className="mb-2 flex flex-col">
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border p-2 rounded"
                            />
                        </label>
                        <label className="mb-2 flex flex-col">
                            Confirm Password
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="border p-2 rounded"
                            />
                        </label>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                            disabled={loading}
                        >
                            Sign Up
                        </button>
                    </form>
                )}
                <Link href="/">
                    <span className="text-sm flex items-center mx-auto">
                        Already have an account{" "}
                    </span>
                    <p className="flex text-center mx-14 text-blue-500 text-sm">
                        Sign In
                    </p>
                </Link>
            </div>
        </div>
    );
}
