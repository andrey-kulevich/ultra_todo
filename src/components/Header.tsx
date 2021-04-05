import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button, Grid, IconButton} from "@material-ui/core";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import {routes} from "../helpers/routes";
import AppsIcon from "@material-ui/icons/Apps";
import ViewListIcon from "@material-ui/icons/ViewList";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            cursor: "pointer",
            marginRight: theme.spacing(2),
        },
        icon: {
            width: 30,
            height: 30,
        },
    }),
);

export default function Header() {
    const classes = useStyles();
    const [_, __, removeCookie] = useCookies(['user']);
    const history = useHistory()

    const logout = () => {
        removeCookie('user')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title} onClick={() => history.push(routes.notes)}>
                    ULTRA TODO
                </Typography>
                <Button onClick={logout}>
                    АКТИВНЫЕ
                </Button>
                <Button onClick={logout}>
                    ГОТОВЫЕ
                </Button>
                <IconButton>
                    <AppsIcon className={classes.icon}/>
                </IconButton>
                <IconButton >
                    <ViewListIcon className={classes.icon}/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
