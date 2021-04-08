import React, {ChangeEvent, useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button, IconButton, useMediaQuery} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {routes} from "../helpers/routes";
import AppsIcon from "@material-ui/icons/Apps";
import ViewListIcon from "@material-ui/icons/ViewList";
import {useTodos} from "../context/TodosContext";
import {TodoInterface} from "../interfaces/TodoInterface";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            cursor: "pointer",
            marginRight: theme.spacing(0),
            '@media screen and (min-width: 900px)' : {
                marginRight: theme.spacing(2)
            }
        },
        icon: {
            width: 30,
            height: 30,
        },
        input: {
            display: 'none',
        },
    }),
);

export default function Header() {
    const classes = useStyles();
    const history = useHistory()
    const matches = useMediaQuery('(min-width:900px)')
    const {display, switchDisplay, setNewTodos} = useTodos()

    useEffect(() => {

    },[display])

    const getDataFromFile = (event : ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader()
        // @ts-ignore
        reader.readAsText(event.target.files[0])
        reader.onload = (e) => {
            if (e.target && e.target.readyState === FileReader.DONE && reader.result) {
                setNewTodos(JSON.parse(reader.result as string) as TodoInterface[])
                localStorage.setItem('todos', reader.result as string)
            } else {
                throw new Error('failed to load json data')
            }
        }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant={matches ? "h6" : "inherit"} className={classes.title}
                            onClick={() => history.push(routes.activeTodos)}>
                    ULTRA TODO
                </Typography>
                <Button onClick={() => history.push(routes.activeTodos)}> АКТИВНЫЕ </Button>
                <Button onClick={() => history.push(routes.doneTodos)}> ГОТОВЫЕ </Button>

                <input
                    accept="application/json"
                    className={classes.input}
                    onChange={getDataFromFile}
                    id="button-file"
                    type="file"
                />
                <label htmlFor="button-file">
                    <Button component="span"> ЗАГРУЗИТЬ </Button>
                </label>

                {matches &&
                    <IconButton onClick={() => switchDisplay}>
                        {display === 'row' ?
                            <ViewListIcon className={classes.icon}/>
                            :
                            <AppsIcon className={classes.icon}/>
                        }
                    </IconButton>
                }
            </Toolbar>
        </AppBar>
    );
}
