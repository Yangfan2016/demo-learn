import React, { useEffect, useState } from "react";
import { useIsFetching, useQueries, useQuery, useQueryClient } from "react-query";
import { useGetTodo, useUpdateTodo } from "../hooks/todo";
import { getTodo, getUser } from "../services/todo";

interface Props { }

export function Task(props: Props) {
    const todoId = '1';
    const userId = 'tt';
    const [isStart, setIsStart] = useState(false);
    const qc = useQueryClient()

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

    const fetchingCount = useIsFetching(['/get/todo', todoId]);

    useEffect(() => {
        setTimeout(() => {
            setIsStart(true)
        }, 3e3);
        return () => {
            console.log('Task is destoryed');
        }
    }, []);

    // console.log(`并行查询`, useQs);
    // console.log(`依赖查询`, status, userData, fetchingCount)

    console.log('todo', qs, data)

    return <div>
        <div onClick={() => mutate({ id: '1', name: `baidu ${Math.random()}` })}>点我更新数据：{isLoading ? 'loading' : data?.name}</div>
        {/* <div>{isFetching ? 'isFetching' : ''}</div>
        <div>{qs}</div>
       
        <div>fetchingCount: {fetchingCount}</div> */}
        <div>修改状态：{ms}</div>
        <div onClick={() => {
            qc.setQueryData(['/get/todo', todoId], { id: '1', name: 'hhh' })
        }}>点我本地更新数据</div>
    </div>;
}