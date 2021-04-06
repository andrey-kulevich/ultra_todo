import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {FormControl, TextField} from "@material-ui/core";
import {TodoInterface} from "../interfaces/TodoInterface";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const getCurrentDate = () : string => {
    return new Date().getFullYear() + '-' +
        (new Date().getMonth() + 1).toString().padStart(2, '0') + '-' +
        new Date().getDate().toString().padStart(2, '0')
}

export const CreateTodoMW = ({open, onClose, createTodo} :
                                 {open: boolean, onClose: any, createTodo: any}) => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [notificationDate, setNotificationDate] = useState<string>(getCurrentDate())

    const handleCreate = () => {
        createTodo({
            title: title,
            content: content,
            lastModifiedDate: getCurrentDate(),
            notificationDate: notificationDate,
            isDone: false
        } as TodoInterface)
        onClose()
    }

    return (
        <Dialog
            open={open}
            fullWidth
            TransitionComponent={Transition}
            keepMounted
            onClose={() => onClose()}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Добавить задачу</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        id="titleField"
                        label="Заголовок"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        multiline
                        id="contentField"
                        label="Описание"
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        fullWidth
                        id="contentField"
                        label="Дедлайн"
                        type="date"
                        defaultValue={notificationDate}
                        onChange={(e) =>
                            setNotificationDate(e.target.value as string)}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>
                    Отмена
                </Button>
                <Button onClick={handleCreate}>
                    Добавить
                </Button>
            </DialogActions>
        </Dialog>
    );
}
