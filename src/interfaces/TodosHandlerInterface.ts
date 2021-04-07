import {TodoInterface} from "./TodoInterface";

export interface TodosHandlerInterface {
    todos: TodoInterface[],
    display: string,
    switchDisplay: Function,
    addTodo: Function,
    removeTodo: Function,
    setNewTodos: Function,
    updateTodo: Function,
    markTodoAsDone: Function
}
