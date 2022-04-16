import { useQuery } from "react-query";
import { getTodo, ITodo, updateTodo } from "../services/todo";


export function useGetTodo(id: string) {
    return useQuery(['/get/todo', id], async () => await getTodo(id));
}
