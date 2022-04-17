// mockdata

export interface ITodo {
    id: string;
    name: string
}

export interface IUser {
    [key: string]: Record<string, any>
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

const users: IUser = {
    'zh': { name: '张三' },
    'tt': { name: '兔兔' },
}

// @ts-ignore
window.mock = {
    todos,
    users
}

function sleep(seconds: number) {
    return new Promise((rs, rj) => {
        setTimeout(() => rs(''), seconds * 1e3);
    })
}


export async function getTodo(id: string) {
    await sleep(1);
    // const t = Math.random();
    // if (1 || t > 0.5) {
    //     console.log(new Date())
    //     throw new Error(`getTodo: sth is err ${t}`);
    // }
    console.count('api-----getTodo')
    return todos.find(item => item.id === id);
}

export async function updateTodo(patch: Partial<ITodo>) {
    await sleep(1);
    // const t = Math.random()
    // if (t > 0.5) {
    //     throw new Error(`updateTodo: sth is err ${t}`);
    // }
    todos = todos.map(item => {
        if (item.id === patch.id) {
            return {
                ...item,
                ...patch
            }
        }
        return item;
    });
    console.count('api-----updateTodo')
}

export async function getUser(id: string) {
    await sleep(1);
    console.count('api-----getUser')
    return users[id];
}