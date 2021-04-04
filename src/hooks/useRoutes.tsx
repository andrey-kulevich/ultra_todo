import {useEffect, Suspense} from "react";
import {useObserver} from "mobx-react-lite";
import { Switch, Route, Redirect } from "react-router-dom";
import React from "react";
import {useHttp} from "./useHttp";
import {useCookies} from "react-cookie";
import {routes} from "../helpers/routes";
import {NotesPage} from "../pages/NotesPage";

export const useRoutes = () => {
    const {loading, request} = useHttp()
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(() => {

    },[request])

    return useObserver(() => (
        <Switch>
            <Suspense fallback={<div>Some load...</div>}>
                {loading? <>
                    <div>
                        Loading...
                    </div>
                </>:<>
                    <Route path={routes.notes}>
                        <NotesPage/>
                    </Route>
                    <Redirect to={routes.notes}/>
                </>}
            </Suspense>
        </Switch>
    ))
}
