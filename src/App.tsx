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
        todos.push(todo)
        let oldTodos = JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[]
        oldTodos.push(todo)
        localStorage.setItem('todos', JSON.stringify(oldTodos))
    }

    const removeTodo = (index : number) => {
        // let updated = todos
        // if (updated) updated.splice(index, 1)
        // setTodos(updated)

        todos.splice(index, 1)

        let oldTodos = JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[]
        oldTodos.splice(index, 1)
        localStorage.setItem('todos', JSON.stringify(oldTodos))
    }

    const setNewTodos = (newTodos : TodoInterface[]) => {
        setTodos(newTodos)
        localStorage.setItem('todos', JSON.stringify(newTodos))
    }

    const updateTodo = (index : number, todo : TodoInterface) => {
        let updated = todos
        if (updated) updated[index] = todo
        setTodos(updated)

        let oldTodos = JSON.parse(localStorage.getItem('todos') as string) as TodoInterface[]
        oldTodos[index] = todo
        localStorage.setItem('todos', JSON.stringify(oldTodos))
    }

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <TodosProvider value={{todos, display, switchDisplay, addTodo, removeTodo, setNewTodos, updateTodo}}>
                    {routes}
                </TodosProvider>
          </Router>
      </ThemeProvider>
  );
}
