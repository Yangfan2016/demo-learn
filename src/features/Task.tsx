import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useGetTodo } from "../hooks/useGetTodo";
import { ITodo, updateTodo } from "../services/todo";

interface Props { }

export function Task(props: Props) {
    const qc = useQueryClient();
    const { data, isLoading } = useGetTodo('1');
    const mutation = useMutation<void, unknown, ITodo, unknown>((params) => updateTodo(params), {
        onSuccess(data, variables) {
            qc.invalidateQueries(['/get/todo', variables.id]);
        }
    });
    // console.log('qc', qc)
    return <div onClick={
        () => {
            mutation.mutate({ id: '1', name: `baidu ${Math.random()}` })
        }
    }>{isLoading ? 'loading' : data?.name}</div>;
}