import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model';
import { BiEdit } from 'react-icons/bi'
import { MdDoneOutline, MdDeleteOutline } from 'react-icons/md'

interface Props {
    todo: Todo;
    todos: Todo[];
    key: number;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo = ({ todo, todos, setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    }
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }
    const handleEdit = (e: React.FormEvent, id: number,) => {
        e.preventDefault();

        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=> {
        inputRef.current?.focus();
    }, [edit]);

    return <form className='todos_single' onSubmit={(e) => handleEdit(e, todo.id)}>
        {edit ? (<input value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className='todos_single--text' />) :
            todo.isDone ? (<s className='todos_single--text'>{todo.todo}</s>
            ) : (
                <span className='todos_single--text'>{todo.todo}</span>)
        }
        <div>
            <span className='icon'>
                <BiEdit onClick={() => {
                    if (!edit && !todo.isDone) {
                        setEdit(!edit)
                    }
                }} />
            </span>
            <span className='icon'>
                <MdDeleteOutline onClick={() => handleDelete(todo.id)} />
            </span>
            <span className='icon'>
                <MdDoneOutline onClick={() => handleDone(todo.id)} />
            </span>
        </div>
    </form>
}

export default SingleTodo
