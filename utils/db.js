import { supabase } from "@/utils/supabase";
import bcrypt from "bcryptjs";

export const getUserFromDb = async (email, password) => {
  // Fetch the user from the 'users' table
  const { data: user, error } = await supabase
    .from('users')  // Ensure this table matches your actual table name
    .select('*')
    .eq('email', email)
    .single();  // Ensures we only get one user

  // If there's an error or no user found, return null
  if (error || !user) {
    return null;
  }

  // Compare the incoming password with the stored hashed password
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  // Return the user if the password is valid
  if (isPasswordValid) {
    return user;
  }

  // If the password doesn't match, return null
  return null;
};
