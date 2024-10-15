"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
export function SignIn() {
  return (
    <div className="w-full flex bg-blue-600 justify-center items-center h-[100vh]"> {/* Updated: Added items-center */}
      <div className="flex flex-col bg-white justify-center items-center p-4 rounded-md shadow-lg w-1/4"> {/* Added padding, rounded corners, and shadow */}
        <h1 className="text-lg font-bold mb-4">Login</h1> {/* Styled header */}
        <form
          className="flex flex-col "
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement; // Type assertion to HTMLFormElement
            const formData = new FormData(form);
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            // Call signIn with the credentials provider and form data
            await signIn("credentials", {
              redirect: false, // Prevent automatic redirects
              email,
              password,
            });
          }}
        >
          <label className="mb-2 flex flex-col">
            Email
            <input
              name="email"
              type="email"
              required
              className="border p-2 rounded"
            />
          </label>
          <label className="mb-2 flex flex-col">
            Password
            <input
              name="password"
              type="password"
              required
              className="border p-2 rounded"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Sign In
          </button>
       <Link className="" href="/">
       <p className="text-sm text-blue-500 flex items-center mx-auto ml-6">Dont have an account<br />Sign up here</p>
      
       </Link>
        </form>
      </div>
    </div>
  );
}
