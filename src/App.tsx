import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./hooks/useRoutes";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core/styles';
import {TodosProvider} from "./context/TodosContext";
import {TodoInterface} from "./interfaces/TodoInterface";

export default function App() {
    const routes = useRoutes()

    const [todos, setTodos] = useState<TodoInterface[]>([] as TodoInterface[])
    const [dark, setDark] = useState<boolean>(false)

    const theme = createMuiTheme({
        palette: {
            type: dark ? "dark" : "light",
            primary: { main: dark ? '#646464' : '#eeeeee' },
            secondary: { main: dark ? '#6b6b6b' : '#fff' },
            success: { main:'#4791db' }
        },
    })

    useEffect(() => {
        if (localStorage.getItem('todos'))
            setTodos(JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[])
        if (localStorage.getItem('dark'))
            setDark(localStorage.getItem('dark') === 'true')
    },[])

    const switchTheme = () => {
        localStorage.setItem('dark', dark ? 'false' : 'true')
        setDark(!dark)
    }

    const addTodo = (todo : TodoInterface) => {
        setTodos((todos) => {
            todos.unshift(todo)
            return todos
        })
        let oldTodos = JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[]
        oldTodos.unshift(todo)
        localStorage.setItem('todos', JSON.stringify(oldTodos))
    }

    const removeTodo = (id : number) => {
        setTodos((todos) => {
            todos.splice(todos.findIndex(elem => elem.id === id), 1)
            return todos
        })

        let oldTodos = JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[]
        oldTodos.splice(oldTodos.findIndex(elem => elem.id === id), 1)
        localStorage.setItem('todos', JSON.stringify(oldTodos))
    }

    const setNewTodos = (newTodos : TodoInterface[]) => {
        setTodos(newTodos)
        localStorage.setItem('todos', JSON.stringify(newTodos))
    }

    const updateTodo = (id : number, todo : TodoInterface) => {
        setTodos((todos) => {
            todos.splice(todos.findIndex(elem => elem.id === id), 1)
            todos.unshift(todo)
            return todos
        })

        let oldTodos = JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[]
        oldTodos.splice(oldTodos.findIndex(elem => elem.id === id), 1)
        oldTodos.unshift(todo)
        localStorage.setItem('todos', JSON.stringify(oldTodos))
    }

    const markTodoAsDone = (id: number) => {
        setTodos((todos) => {
            todos[todos.findIndex(elem => elem.id === id)].isDone = true
            return todos
        })

        let oldTodos = JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[]
        oldTodos[oldTodos.findIndex(elem => elem.id === id)].isDone = true
        localStorage.setItem('todos', JSON.stringify(oldTodos))
    }

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <TodosProvider value={{
                    todos, dark, switchTheme, addTodo,
                    removeTodo, setNewTodos, updateTodo, markTodoAsDone}}>
                    {routes}
                </TodosProvider>
          </Router>
        </ThemeProvider>
  );
}
