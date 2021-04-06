import {createContext, useContext} from "react";
import {TodosHandlerInterface} from "../interfaces/TodosHandlerInterface";

export const TodosContext = createContext<TodosHandlerInterface>({} as TodosHandlerInterface)
export const TodosProvider = TodosContext.Provider
export const useTodos = () : TodosHandlerInterface => useContext(TodosContext)
