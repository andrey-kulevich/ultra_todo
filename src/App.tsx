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

    const [update, setUpdate] = useState<boolean>(true)
    const [todos, setTodos] = useState<TodoInterface[]>([] as TodoInterface[])
    const [dark, setDark] = useState<boolean>(false)

    const theme = createMuiTheme({
        palette: {
            type: dark ? "dark" : "light",
            primary: { main: dark ? '#424242' : '#eeeeee' },
            secondary: { main: dark ? '#4d4d4d' : '#fff' },
            success: { main: '#4791db' },
            error: { main: '#fc2727' }
        },
    })

    useEffect(() => {
        if (localStorage.getItem('todos'))
            setTodos(JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[])
        if (localStorage.getItem('dark'))
            setDark(localStorage.getItem('dark') === 'true')
        setUpdate(false)
    },[update])

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
        if (oldTodos) oldTodos.unshift(todo)
        else oldTodos = [todo]
        localStorage.setItem('todos', JSON.stringify(oldTodos))
        setUpdate(true)
    }

    const removeTodo = (id : number) => {
        setTodos((todos) => {
            todos.splice(todos.findIndex(elem => elem.id === id), 1)
            return todos
        })

        let oldTodos = JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[]
        oldTodos.splice(oldTodos.findIndex(elem => elem.id === id), 1)
        localStorage.setItem('todos', JSON.stringify(oldTodos))
        setUpdate(true)
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
        setUpdate(true)
    }

    const markTodoAsDone = (id: number) => {
        setTodos((todos) => {
            todos[todos.findIndex(elem => elem.id === id)].isDone = true
            return todos
        })

        let oldTodos = JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[]
        oldTodos[oldTodos.findIndex(elem => elem.id === id)].isDone = true
        localStorage.setItem('todos', JSON.stringify(oldTodos))
        setUpdate(true)
    }

    const switchTodoUrgency = (id: number, value: 'very urgent' | 'urgently' | 'medium urgency' | 'do not rush') => {
        setTodos((todos) => {
            todos[todos.findIndex(elem => elem.id === id)].urgency = value
            return todos
        })

        let oldTodos = JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[]
        oldTodos[oldTodos.findIndex(elem => elem.id === id)].urgency = value
        localStorage.setItem('todos', JSON.stringify(oldTodos))
        setUpdate(true)
    }

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <TodosProvider value={{
                    todos, dark,
                    switchTheme, addTodo, removeTodo, setNewTodos,
                    updateTodo, markTodoAsDone, switchTodoUrgency}}>
                    {routes}
                </TodosProvider>
          </Router>
        </ThemeProvider>
  );
}
