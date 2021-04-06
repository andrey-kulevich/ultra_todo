import {useEffect, Suspense} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import {routes} from "../helpers/routes";
import {TodosPage} from "../pages/TodosPage";
import {DoneTodosPage} from "../pages/DoneTodosPage";

export const useRoutes = () => {

    useEffect(() => {

    },[])

    return(
        <Switch>
            <Suspense fallback={<div>Some load...</div>}>
                {/*{loading?*/}
                {/*    <div>Loading...</div>*/}
                {/*    :*/}
                {/*    <>*/}
                        <Route path={routes.activeTodos}>
                            <TodosPage/>
                        </Route>
                        <Route path={routes.doneTodos}>
                            <DoneTodosPage/>
                        </Route>
                        <Redirect to={routes.activeTodos}/>
                {/*    </>*/}
                {/*}*/}
            </Suspense>
        </Switch>
    )
}
