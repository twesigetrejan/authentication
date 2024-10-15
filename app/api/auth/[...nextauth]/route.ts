// [...nextauth]/route.ts
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { supabase } from "@/utils/supabase"; // Adjust the import based on your file structure
import CredentialsProvider from "next-auth/providers/credentials";
import { Session, User } from "next-auth";

// Extend the User type to include an id
interface CustomUser extends User {
    id: string; // Add the id property
}

// Extend the Session type to include the custom user
interface CustomSession extends Session {
    user: CustomUser; // Use the extended CustomUser type
}

// Define your NextAuth options
const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Ensure credentials are defined
                if (!credentials) {
                    throw new Error("No credentials provided");
                }

                const { email, password } = credentials;

                // Attempt to sign in with Supabase
                const { data: { user }, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                // Handle error or lack of user
                if (error || !user) {
                    throw new Error(error?.message || "Invalid credentials");
                }

                // Return user object with additional properties
                return { id: user.id, email: user.email }; // Adjust according to your user object structure
            },
        }),
    ],
    pages: {
        signIn: "/login", // Define your custom sign-in page
    },
    session: {
        strategy: "jwt", // Use JWT for session strategy
    },
    callbacks: {
        async session({ session, user }) {
            // Attach user properties from the user to the session
            if (user) {
                console.log(session.user); // Ensure user id is included in the session
            } else {
                // Handle case where user might not be defined
                session.user = { id: "", email: "" } as CustomUser; // Default structure
            }
            return session as CustomSession; // Ensure to return as CustomSession type
        },
    },
};

// Export the NextAuth API routes
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
