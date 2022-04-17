import React, { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { useGetTodo, useUpdateTodo } from "../hooks/todo";
import { getTodo, getUser } from "../services/todo";

interface Props { }

export function Task(props: Props) {
    const todoId = '1';
    const userId = 'tt';
    const [isStart, setIsStart] = useState(false);

    // get 
    const { data, isLoading, isFetching, status: qs } = useGetTodo(todoId);
    // update
    const { mutate, status: ms } = useUpdateTodo();

    // parallel query
    const useQs = useQueries([
        {
            queryKey: ['/get/todo', todoId],
            queryFn: () => getTodo(todoId)
        },
        {
            queryKey: ['/get/user', userId],
            queryFn: () => getUser(userId)
        }
    ])

    // dep query
    const { data: userData, isIdle: isUserIdle, status } = useQuery({
        queryKey: ['/get/user', userId],
        queryFn: () => getUser(userId),
        enabled: isStart
    })

    useEffect(() => {
        setTimeout(() => {
            setIsStart(true)
        }, 3e3);
        return () => {
            console.log('Task is destoryed');
        }
    }, []);

    console.log(`并行查询`, useQs);
    console.log(`依赖查询`, status, userData)

    return <div>
        <div onClick={() => mutate({ id: '1', name: `baidu ${Math.random()}` })}>{isLoading ? 'loading' : data?.name}</div>
        <div>{isFetching ? 'isFetching' : ''}</div>
        <div>{qs}</div>
        <div>{ms}</div>
    </div>;
}