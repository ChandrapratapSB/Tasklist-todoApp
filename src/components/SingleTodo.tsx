import React from 'react'
import { Todo } from '../model';
import { BiEdit } from 'react-icons/bi'
import { MdDoneOutline, MdDeleteOutline } from 'react-icons/md'
import TodoList from './TodoList';

interface Props {
    todo: Todo;
    todos: Todo[];
    key: number;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo = ({ todo, todos, setTodos }: Props) => {
    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    }
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id ))
    }
    return <form className='todos_single'>
        {
            todo.isDone ? (<s className='todos_single--text'>{todo.todo}</s>
            ) : (
                <span className='todos_single--text'>{todo.todo}</span>)
        }
        <div>
            <span className='icon'>
                <BiEdit />
            </span>
            <span className='icon'>
                <MdDeleteOutline onClick={() => handleDelete(todo.id)}/>
            </span>
            <span className='icon'>
                <MdDoneOutline onClick={() => handleDone(todo.id)} />
            </span>
        </div>
    </form>
}

export default SingleTodo
