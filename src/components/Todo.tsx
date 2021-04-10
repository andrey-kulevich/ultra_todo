import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
    CardActions,
    CardHeader,
    IconButton,
    Menu,
    MenuItem,
    Button,
    TextField,
    Collapse,
    List, ListItem, Tooltip
} from "@material-ui/core";
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
                backgroundColor: theme.palette.primary.main,
                borderRadius: '15px',
                transition: 'background-color 0.5s, border-radius 0.7s, box-shadow 0.7s',
                boxShadow: '0 0 7px rgba(0,0,0,0.2)',
            },
            minWidth: 275,
            marginTop: theme.spacing(3),
            borderRadius: '5px',
            transition: 'background-color 0.5s, border-radius 0.7s, box-shadow 0.7s'
        },
        veryUrgentColor: {
            backgroundColor: 'rgba(255,83,83,0.2)',
        },
        urgentlyColor: {
            backgroundColor: 'rgba(255,161,28,0.2)',
        },
        mediumUrgencyColor: {
            backgroundColor: 'rgba(255,245,60,0.2)',
        },
        doNotRushColor: {
            backgroundColor: theme.palette.secondary.main,
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
        },
        listPadding: {
            paddingLeft: 0,
            paddingTop: 0,
            paddingBottom: 0
        }
    })
);

export const Todo = ({todo} : {todo: TodoInterface}) => {
    const classes = useStyles();
    const {updateTodo, removeTodo, markTodoAsDone, switchTodoUrgency} = useTodos()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [edit, setEdit] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(todo.title)
    const [content, setContent] = useState<string>(todo.content)
    const [openCollapse, setOpenCollapse] = useState(false)

    useEffect(() => {
        setTitle(todo.title)
        setContent(todo.content)
    }, [todo])

    const handleEdit = () => {
        setEdit(true)
        setAnchorEl(null)
    }

    const handleSwitchUrgency = (value: 'very urgent' | 'urgently' | 'medium urgency' | 'do not rush') => {
        switchTodoUrgency(todo.id, value)
        setAnchorEl(null)
    }

    const handleSave = () => {
        if (title !== todo.title || content !== todo.content) {
            updateTodo(todo.id, {
                id: todo.id,
                title: title,
                content: content,
                lastModifiedDate: getCurrentDate(),
                urgency: todo.urgency,
                isDone: false
            } as TodoInterface)
        }
        setEdit(false)
    }

    const defineCardColor = () : string => {
        if (!todo.isDone) {
            switch (todo.urgency) {
                case "very urgent":
                    return classes.veryUrgentColor;
                case "urgently":
                    return classes.urgentlyColor;
                case "medium urgency":
                    return classes.mediumUrgencyColor;
                default:
                    return classes.doNotRushColor;
            }
        } else return classes.doNotRushColor;
    }

    return (
        <>
            <Card className={classes.root + ' ' + defineCardColor()} variant="outlined">
                <CardHeader
                    className={classes.header}
                    action={
                        <>
                            {!todo.isDone &&
                                <>
                                    <Tooltip title={'Пометить как выполненную'}>
                                        <IconButton aria-label="settings" onClick={() => markTodoAsDone(todo.id)}>
                                            <DoneIcon />
                                        </IconButton>
                                    </Tooltip>
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
                onClose={() => {
                    setAnchorEl(null)
                    setOpenCollapse(false)
                }}
            >
                <MenuItem onClick={handleEdit}>Изменить</MenuItem>
                <MenuItem>
                    <List className={classes.listPadding}>
                        <ListItem className={classes.listPadding} onClick={() => setOpenCollapse(true)}>
                            Срочность
                        </ListItem>
                        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem button onClick={() => handleSwitchUrgency('very urgent')}>
                                    Очень срочно
                                </ListItem>
                                <ListItem button onClick={() => handleSwitchUrgency('urgently')}>
                                    Срочно
                                </ListItem>
                                <ListItem button onClick={() => handleSwitchUrgency('medium urgency')}>
                                    Средняя срочность
                                </ListItem>
                                <ListItem button onClick={() => handleSwitchUrgency('do not rush')}>
                                    Не срочно
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>

                </MenuItem>
            </Menu>
        </>
    );
}
