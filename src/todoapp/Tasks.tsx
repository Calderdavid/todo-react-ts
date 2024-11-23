import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react";

interface TaskType {
    id: number;
    text: string;
    completed: boolean;
}


export const Tasks = () => {

    const [item, setItem] = useState<TaskType[]>([]);
    const [todo, setTodo] = useState("");


    const addTask = (e: React.FormEvent) => {
        e.preventDefault(); //prevent to reload the page

        if(todo.trim() !== "") {
            setItem([...item, {
                id: Date.now(),
                text: todo,
                completed: false,
            }])
        }

        setTodo(""); //clear the input field

    }

    const toggleTask = (id: number) => {
        setItem(item.map(task => task.id === id ? {...task, completed: !task.completed} : task)) //update the task
    }

    const deleteTask = (id: number) => {
        setItem(item.filter(task => task.id !== id))
    }

    


    
    return (
        <Card className="w-full max-w-md mx-auto p-4">
            <CardHeader>
                <CardTitle>ToDo App</CardTitle>
            </CardHeader>

            <form onSubmit={addTask} className="flex space-x-2 mb-4">
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
                                checked={task.completed}
                                onCheckedChange={() => toggleTask(task.id)}
                            />
                            <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                                {task.text}
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