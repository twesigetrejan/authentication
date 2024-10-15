"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget; // Use e.currentTarget for better type inference
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/"); // Redirect after successful sign-in
      form.reset(); // Reset form fields after sign-in
    }
  };


  return (
    <div className="w-full flex bg-blue-600 justify-center items-center h-[100vh]">
      <div className="flex flex-col bg-white justify-center items-center p-4 rounded-md shadow-lg w-1/4">
        <h1 className="text-lg font-bold mb-4">Login</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {error && (
            <p className="text-red-500 mb-2" role="alert">
              {error}
            </p>
          )}
          <label className="mb-2 flex flex-col">
            Email
            <input
              name="email"
              type="email"
              required
              className="border p-2 rounded"
              aria-label="Email"
            />
          </label>
          <label className="mb-2 flex flex-col">
            Password
            <input
              name="password"
              type="password"
              required
              className="border p-2 rounded"
              aria-label="Password"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <Link href="/signup" className="text-center mb-4">
            <span className="text-sm flex flex-col">
              Dont have an account?
              <p className="text-blue-500 text-sm mt-2">Sign Up</p>
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}
