import { useMutation, useQuery, useQueryClient } from "react-query";
import { getTodo, ITodo, updateTodo } from "../services/todo";


export function useGetTodo(id: string) {
    return useQuery(['/get/todo', id], () => getTodo(id), {
        // placeholderData: { id: '1', name: '占位数据' },
        initialData: { id: '1', name: '已经获取到的数据' },
        staleTime: 2e3
    });
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

