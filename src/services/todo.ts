// mockdata

export interface ITodo {
    id: string;
    name: string
}

let todos: ITodo[] = [
    {
        name: 'baidu',
        id: '1'
    },
    {
        name: 'google',
        id: '2'
    }
]


function sleep(seconds: number) {
    return new Promise((rs, rj) => {
        setTimeout(() => rs(''), seconds * 1e3);
    })
}


export async function getTodo(id: string) {
    console.count('api-----getTodo')
    await sleep(1);
    return todos.find(item => item.id === id);
}

export async function updateTodo(patch: Partial<ITodo>) {
    console.count('api-----updateTodo')
    todos = todos.map(item => {
        if (item.id === patch.id) {
            return {
                ...item,
                ...patch
            }
        }
        return item;
    });
    await sleep(1);
}
