import React from "react";
import {Container} from "@material-ui/core";
import Header from "../components/Header";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.secondary.main,
            paddingTop: '1em',
            paddingBottom: '1em',
            height: '100vh'
        }
    }),
);

export const PageContainer = ({children} : {children:any}) => {
    const classes = useStyles();
    return(
        <>
            <Header/>
            <Container className={classes.root}>
                {children}
            </Container>
        </>
    )
}
