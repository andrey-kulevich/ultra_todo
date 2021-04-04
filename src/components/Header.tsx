import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Button} from "@material-ui/core";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import {routes} from "../helpers/routes";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            color:'#fff'
        },
        title: {
            flexGrow: 1,
            color: '#fff',
            cursor: "pointer"
        },
        img:{
            width: theme.spacing(5),
            height: theme.spacing(5),
            marginRight: theme.spacing(1),
            color: '#fff'
        },
        logout:{
            color: '#fff'
        }
    }),
);

export default function Header() {
    const classes = useStyles();
    const [_, __, removeCookie] = useCookies(['user']);
    const history = useHistory()

    const logout = () => {
        removeCookie('user')
    }

    const goToHome = () => {
        history.push(routes.notes)
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title} onClick={goToHome}>
                    {'some text'.toUpperCase()}
                </Typography>

                <Button className={classes.logout} onClick={logout}>
                    ВЫЙТИ
                </Button>
            </Toolbar>
        </AppBar>
    );
}
