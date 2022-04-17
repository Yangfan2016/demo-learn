import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTodo, ITodo, updateTodo } from "../services/todo";


export function useGetTodo(id: string) {
    return useQuery(['/get/todo', id], () => getTodo(id));
}

export function useUpdateTodo() {
    const qc = useQueryClient();
    return useMutation<void, unknown, ITodo, unknown>(updateTodo, {
        onSuccess(data, variables) {
            // refresh
            qc.invalidateQueries(['/get/todo', variables.id]);
        },
        onError(err) {
            console.log('更新失败', err)
        }
    });
}

