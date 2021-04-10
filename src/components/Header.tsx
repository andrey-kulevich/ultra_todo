import React, {ChangeEvent} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button, IconButton, useMediaQuery, Tooltip} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {routes} from "../helpers/routes";
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
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
    const {dark, switchTheme, setNewTodos} = useTodos()

    const getDataFromFile = (event : ChangeEvent<HTMLInputElement>) => {
        let reader = new FileReader()
        if (event.target.files) {
            reader.readAsText(event.target.files[0])
            reader.onload = (e) => {
                if (e.target && e.target.readyState === FileReader.DONE && reader.result)
                    setNewTodos(JSON.parse(reader.result as string) as TodoInterface[])
                else throw new Error('failed to load json data')
            }
        }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant={'h6'} className={classes.title}
                            onClick={() => history.push(routes.activeTodos)}>
                    ULTRA TODO
                </Typography>
                <Button onClick={() => history.push(routes.activeTodos)}>
                    {matches ? 'АКТИВНЫЕ' : <FormatListBulletedIcon className={classes.icon}/>}
                </Button>
                <Button onClick={() => history.push(routes.doneTodos)}>
                    {matches ? 'ЗАВЕРШЕННЫЕ' : <PlaylistAddCheckIcon className={classes.icon}/>}
                </Button>

                <input
                    accept="application/json"
                    className={classes.input}
                    onChange={getDataFromFile}
                    id="button-file"
                    type="file"
                />
                <label htmlFor="button-file">
                    <Button component="span">
                        {matches ? 'ЗАГРУЗИТЬ' : <FolderOpenIcon className={classes.icon}/>}
                    </Button>
                </label>

                <Tooltip title={'Сменить тему'}>
                    <IconButton onClick={() => switchTheme()}>
                        {dark ?
                            <Brightness4Icon className={classes.icon}/>
                            :
                            <Brightness7Icon className={classes.icon}/>
                        }
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
}
