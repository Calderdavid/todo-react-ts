import { supabase, Todo, NewTodo, UpdateTodo } from "./supabase"


export const fetchTodos = async (userId: string): Promise<Todo[]> => {
    const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
 
    if (error) throw error
    return data || []
}

export const addTodo = async (newTodo: NewTodo): Promise<Todo> => {
    const { data, error } = await supabase
        .from("todos")
        .insert([newTodo])
        .select()
        .single()

    if (error) throw error    
    if (!data) throw new Error("No data returned from insert")
    return data
}

export async function updateTodo(id: number, updates: UpdateTodo): Promise<Todo> {
    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
  
    if (error) throw error
    if (!data) throw new Error('No data returned from update operation')
    return data
  }
  
  export async function deleteTodo(id: number): Promise<void> {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)
  
    if (error) throw error
  }
  