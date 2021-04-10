import {TodoInterface} from "./TodoInterface";

export interface TodosHandlerInterface {
    todos: TodoInterface[],
    dark: boolean,
    switchTheme: Function,
    addTodo: Function,
    removeTodo: Function,
    setNewTodos: Function,
    updateTodo: Function,
    markTodoAsDone: Function,
    switchTodoUrgency: Function
}
