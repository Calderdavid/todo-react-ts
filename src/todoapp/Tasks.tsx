import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area";
import { addTodo } from "@/db/controller";
import { NewTodo } from "@/db/supabase";
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react";
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

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();

        if (todo.trim() !== "") {
            try {
                const newTodo: NewTodo = {
                    user_id: userId,
                    task: todo,
                    is_completed: false,
                }
                const addedTodo = await addTodo(newTodo)
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


    const addTask = (e: React.FormEvent) => {
        e.preventDefault(); //prevent to reload the page

        if(todo.trim() !== "") {
            setItem([...item, {
                id: Date.now(),
                user_id: userId,
                task: todo,
                is_completed: false,
                created_at: new Date(),
            }])
        }

        setTodo(""); //clear the input field

    }

    const toggleTask = (id: number) => {
        setItem(item.map(task => task.id === id ? {...task, completed: !task.is_completed} : task)) //update the task
    }

    const deleteTask = (id: number) => {
        setItem(item.filter(task => task.id !== id))
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
                                onCheckedChange={() => toggleTask(task.id)}
                            />
                            <span className={task.is_completed ? 'line-through text-muted-foreground' : ''}>
                                {task.task}
                            </span>

                            <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))


                }

            </ScrollArea>
        </Card>
    )
}