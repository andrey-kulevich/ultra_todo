import React from "react";
import {Container} from "@material-ui/core";
import Header from "../components/Header";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.secondary.main,
            minHeight: '100vh',
            width: '100%'
        },
        container: {
            paddingTop: '1em',
            paddingBottom: '1em',
        }
    }),
);

export const PageContainer = ({children} : {children:any}) => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Header/>
            <Container className={classes.container}>
                {children}
            </Container>
        </div>
    )
}
