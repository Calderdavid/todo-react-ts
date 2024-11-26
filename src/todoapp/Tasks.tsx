import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "@/db/controller";
import { NewTodo } from "@/db/supabase";
import { Plus, Trash2 } from "lucide-react"
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast"



interface TaskType {
    id: number;
    user_id: string;
    task: string;
    is_completed: boolean;
    created_at: Date;
}


export const Tasks = () => {

    const [item, setItem] = useState<TaskType[]>([]);
    const [todo, setTodo] = useState("");
            
    const { toast } = useToast()
    const userId: string = 'user123';

    useEffect(() => {
      loadTodos(); //load the todos when the component is mounted
    }, [])
    

    const loadTodos = async () => {
        try {
            const fetchedTodos = await fetchTodos(userId);
            setItem(fetchedTodos);
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: 'No se pudo cargar las tareas', 
            })
        }
    }

    const handleAddTodo = async (e: React.FormEvent) => { //handle 
        e.preventDefault();

        if (todo.trim() !== "") {
            try {
                const newTodo: NewTodo = {
                    user_id: userId,
                    task: todo,
                    is_completed: false,
                }
                const addedTodo = await addTodo(newTodo)
                console.log(addedTodo)
                setItem([...item, addedTodo])
                setTodo("")
            } catch (error) {
                console.log(error)
                toast({
                    title: 'Error',
                    description: 'No se pudo añadir la tarea',
                    variant: 'destructive',
                })
            }
        }
    }

    const handleToggleTodo = async (id: number, is_completed: boolean) => {
        try {
            const updatedTodo = await updateTodo(id, { is_completed: !is_completed }) //update the task
            setItem(item.map(task => task.id === id ? updatedTodo : task))
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: 'No se pudo actualizar la tarea',
                variant: 'destructive',
            })
        }
    }

    const handleDeleteTodo = async (id: number) => {
        try {
            await deleteTodo(id)
            setItem(item.filter(task => task.id !== id))
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: 'No se pudo eliminar la tarea',
                variant: 'destructive',
            })
        }
    }
    


    
    return (
        <Card className="w-full max-w-md mx-auto p-4">
            <CardHeader>
                <CardTitle>ToDo App</CardTitle>
            </CardHeader>

            <form onSubmit={handleAddTodo} className="flex space-x-2 mb-4">
                <Input
                    type="text"
                    placeholder="Add a new task"
                    className="flex-grow"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <Button type="submit">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                </Button>
            </form>

            <ScrollArea className="h-[300px]">
                {
                    item.map(task => (
                        <div key={task.id} className="flex items-center space-x-2 mb-2">
                            <Checkbox
                                checked={task.is_completed}
                                onCheckedChange={() => handleToggleTodo(task.id, task.is_completed)}
                            />
                            <span className={task.is_completed ? 'line-through text-muted-foreground' : ''}>
                                {task.task}
                            </span>

                            <Button variant="ghost" size="icon" onClick={() => handleDeleteTodo(task.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))


                }

            </ScrollArea>
        </Card>
    )
}