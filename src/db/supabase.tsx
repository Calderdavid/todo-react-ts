import { createClient } from "@supabase/supabase-js";
import { Database } from "../interfaces/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase URL or anon key")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Types for the todos table
export type Todo = Database["public"]["Tables"]["todos"]["Row"]
export type NewTodo = Database["public"]["Tables"]["todos"]["Insert"]
export type UpdateTodo = Database["public"]["Tables"]["todos"]["Update"]

