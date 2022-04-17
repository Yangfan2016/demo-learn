import React from "react";
import { useGetTodo } from "../hooks/todo";

interface Props { }

export function List(props: Props) {
    const { data, isLoading } = useGetTodo('1');
    return <div>{isLoading ? 'loading' : data?.name}</div>;
}