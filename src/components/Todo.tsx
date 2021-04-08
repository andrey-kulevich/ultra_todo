import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {CardActions, CardHeader, IconButton, Menu, MenuItem, Button, TextField} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import {TodoInterface} from "../interfaces/TodoInterface";
import {useTodos} from "../context/TodosContext";
import {getCurrentDate} from "../helpers/utils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "&:hover": {
                backgroundColor: '#f3f3f3',
                borderRadius: '15px',
                transition: 'background-color 0.5s, border-radius 0.7s'
            },
            minWidth: 275,
            marginTop: theme.spacing(3),
            backgroundColor: '#fff',
            borderRadius: '5px',
            transition: 'background-color 0.5s, border-radius 0.7s'
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        line: {
            height: '1px',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            border: 'none'
        },
        content: {
            paddingTop: 0
        },
        header: {
            paddingBottom: 0
        }
    })
);

export const Todo = ({todo} : {todo: TodoInterface}) => {
    const classes = useStyles();
    const {todos, updateTodo, removeTodo, markTodoAsDone} = useTodos()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [edit, setEdit] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(todo.title)
    const [content, setContent] = useState<string>(todo.content)

    useEffect(() => {
        console.log('nnnnnn')
    },[todo, todos, updateTodo, removeTodo, markTodoAsDone])

    const handleEdit = () => {
        setEdit(true)
        setAnchorEl(null)
    }

    const handleSave = () => {
        if (title !== todo.title || content !== todo.content) {
            updateTodo(todo.id, {
                id: todo.id,
                title: title,
                content: content,
                lastModifiedDate: getCurrentDate(),
                notificationDate: todo.notificationDate,
                isDone: false
            } as TodoInterface)
        }
        setEdit(false)
    }

    return (
        <>
            <Card className={classes.root} variant="outlined" draggable={"true"}>
                <CardHeader
                    className={classes.header}
                    action={
                        <>
                            {!todo.isDone &&
                                <>
                                    <IconButton aria-label="settings" onClick={() => markTodoAsDone(todo.id)}>
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
                                </>
                            }
                            <IconButton aria-label="settings" onClick={() => removeTodo(todo.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }
                    title={edit ?
                        <>
                            <TextField
                                fullWidth
                                id="titleField"
                                label="Заголовок"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)}
                            />
                        </>
                        : todo.title}
                    subheader={!edit && todo.lastModifiedDate}
                />
                <CardContent className={classes.content}>
                    {edit ?
                        <TextField
                            fullWidth
                            multiline
                            id="contentField"
                            label="Описание"
                            value={content}
                            onChange={(e) =>
                                setContent(e.target.value)}
                        />
                        :
                        todo.content &&
                        <>
                            <hr className={classes.line} />
                            {todo.content.split('\n').map((elem, index) => (
                                <Typography  variant="body2" component="p" key={index}>{elem}</Typography>
                            ))}
                        </>
                    }

                </CardContent>
                {edit &&
                    <CardActions>
                        <Button onClick={handleSave}>Сохранить</Button>
                        <Button onClick={() => setEdit(false)}>Отмена</Button>
                    </CardActions>
                }
            </Card>
            <Menu
                id="settings-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={handleEdit}>Изменить</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>Цвет</MenuItem>
            </Menu>
        </>
    );
}
