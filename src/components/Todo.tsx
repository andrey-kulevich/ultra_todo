import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {CardHeader, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import {TodoInterface} from "../interfaces/TodoInterface";
import {useTodos} from "../context/TodosContext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "&:hover": {
                backgroundColor: '#f3f3f3',
                transition: 'background-color 0.5s'
            },
            minWidth: 275,
            marginTop: theme.spacing(3)
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        line: {
            color: 'rgba(0, 0, 0, 0.2)'
        }
    })
);

export const Todo = ({todo, index} : {todo: TodoInterface, index: number}) => {
    const classes = useStyles();
    const {todos} = useTodos()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {

    },[todos])


    return (
        <>
            <Card className={classes.root} variant="outlined" draggable={"true"}>
                <CardHeader
                    action={
                        <>
                            <IconButton aria-label="settings">
                                <DoneIcon />
                            </IconButton>
                            <IconButton
                                aria-label="settings"
                                aria-controls="settings-menu"
                                onClick={(e) =>
                                    setAnchorEl(e.currentTarget)}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            <IconButton aria-label="settings">
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }
                    title={todo.title}
                    subheader={todo.lastModifiedDate}
                />
                <CardContent>
                    <hr className={classes.line}/>
                    <Typography variant="body2" component="p"> {todo.content} </Typography>
                </CardContent>
            </Card>
            <Menu
                id="settings-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => setAnchorEl(null)}>Изменить</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>Цвет</MenuItem>
            </Menu>
        </>
    );
}
