import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {TodoInterface} from "../interfaces/TodoInterface";
import useSnackBar from "../hooks/useSnackbar";
import {getCurrentDate} from "../helpers/utils";
import {useTodos} from "../context/TodosContext";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const CreateTodoMW = ({open, onClose} : {open: boolean, onClose: any}) => {
    const {snack, openSnack} = useSnackBar()
    const {todos, addTodo} = useTodos()
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [urgency, setUrgency] = useState<string>('do not rush')

    const handleCreate = () => {
        if (title === '') {
            openSnack('error', 'Пожалуйста, введите заголовок задачи')
        } else {
            addTodo({
                id: Math.max.apply(Math, todos.map((elem) => { return elem.id })) + 1,
                title: title,
                content: content,
                lastModifiedDate: getCurrentDate(),
                urgency: urgency,
                isDone: false
            } as TodoInterface)
            onClose()
        }
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
                        required
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
                    <FormControl fullWidth>
                        <InputLabel id="selectPeriodLabel">Срочность задачи</InputLabel>
                        <Select
                            labelId="selectPeriodLabel"
                            id="selectPeriod"
                            value={urgency}
                            onChange={(e) => setUrgency(e.target.value as string)}
                        >
                            <MenuItem value={'very urgent'}>Очень срочно</MenuItem>
                            <MenuItem value={'urgently'}>Срочно</MenuItem>
                            <MenuItem value={'medium urgency'}>Средняя срочность</MenuItem>
                            <MenuItem value={'do not rush'}>Не срочно</MenuItem>
                        </Select>
                    </FormControl>
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

            {snack}

        </Dialog>
    );
}
