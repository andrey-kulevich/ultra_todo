import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from "./hooks/useRoutes";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core/styles';
import {TodosProvider} from "./context/TodosContext";
import {TodoInterface} from "./interfaces/TodoInterface";

const theme = createMuiTheme({
    palette: {
        primary: { main: '#eeeeee' },
        secondary: { main: '#e57373' },
        success: { main:'#4791db' }
    },
});

export default function App() {
    const routes = useRoutes()

    const [update, setUpdate] = useState<boolean>(true)
    const [todos, setTodos] = useState<TodoInterface[]>([] as TodoInterface[])
    const [display, setDisplay] = useState<string>('row')

    useEffect(() => {
        if (localStorage.getItem('todos')) {
            setTodos(JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[])
        }
        setUpdate(false)
    },[update])

    const switchDisplay = () => {
        if (display === 'row') setDisplay('grid')
        else setDisplay('row')
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
        oldTodos.splice(todos.findIndex(elem => elem.id === id), 1)
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
        oldTodos.splice(todos.findIndex(elem => elem.id === id), 1)
        oldTodos.unshift(todo)
        localStorage.setItem('todos', JSON.stringify(oldTodos))
    }

    const markTodoAsDone = (id: number) => {
        setTodos((todos) => {
            todos[todos.findIndex(elem => elem.id === id)].isDone = true
            return todos
        })

        let oldTodos = JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[]
        oldTodos[todos.findIndex(elem => elem.id === id)].isDone = true
        localStorage.setItem('todos', JSON.stringify(oldTodos))
    }

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <TodosProvider value={{
                    todos, display, switchDisplay, addTodo,
                    removeTodo, setNewTodos, updateTodo, markTodoAsDone}}>
                    {routes}
                </TodosProvider>
          </Router>
      </ThemeProvider>
  );
}
