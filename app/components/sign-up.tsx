"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { supabase } from "@/utils/supabase" // Adjust the import path based on your project structure
import { useRouter } from "next/navigation";

export function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Clear any previous error
        setError("");

        // Create a new user in Supabase
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            // Log or use the data as needed
            console.log("User data:", data); // You can log the data or handle it as necessary

            // Optionally, sign the user in after signup
            await signIn("credentials", { email, password, redirect: false });

            router.push("/");
        }
    };



    return (
        <div className="w-full flex bg-blue-600 justify-center items-center h-[100vh]">
            <div className="flex flex-col bg-green-300 justify-center items-center p-8 rounded-md shadow-lg">
                <h1 className="text-lg font-bold mb-4">Sign Up</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <label className="mb-2">
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="border p-2 rounded"
                        />
                    </label>
                    <label className="mb-2">
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border p-2 rounded"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
