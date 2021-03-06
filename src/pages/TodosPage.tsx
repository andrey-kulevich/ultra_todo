import {PageContainer} from "../containers/PageContainer";
import {Fab, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Todo} from "../components/Todo";
import {useTodos} from "../context/TodosContext";
import AddIcon from '@material-ui/icons/Add';
import {CreateTodoMW} from "../components/CreateTodoMW";
import {daysBetween, getCurrentDate} from "../helpers/utils";
import {TodoInterface} from "../interfaces/TodoInterface";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            width: 40,
            height: 40,
        },
        formControl: {
            minWidth: 100,
        },
        title: {
            marginRight: theme.spacing(3),
            marginTop: theme.spacing(1),
            color: theme.palette.text.primary
        },
        fab: {
            marginRight: theme.spacing(3),
            marginTop: theme.spacing(0.5),
        },
        noTodosMessage: {
            marginTop: theme.spacing(3),
            color: theme.palette.text.primary
        }
    }),
);

export const TodosPage = () => {
    const classes = useStyles();
    const {todos} = useTodos()
    const [view, setView] = useState<number>(1)
    const [open, setOpen] = useState(false)
    const [filteredTodos, setFilteredTodos] = useState<TodoInterface[]>([])

    useEffect(() => {
        setFilteredTodos(view === 1 ? todos.filter(elem => !elem.isDone) :
            view === 2 ? todos.filter(elem => !elem.isDone &&
                daysBetween(elem.lastModifiedDate, getCurrentDate()) < 7) :
                todos.filter(elem => !elem.isDone && elem.lastModifiedDate.split('-')[1] ===
                    (new Date().getMonth() + 1).toString().padStart(2, '0')))
    }, [view, todos])

    return(
        <PageContainer>
            <Grid container direction={"row"}>
                <Typography variant={"h5"} className={classes.title}>???????????????? ????????????</Typography>
                <Fab size="small"
                     color="primary"
                     className={classes.fab}
                     aria-label="add"
                     onClick={() => setOpen(true)}
                >
                    <AddIcon />
                </Fab>
                <FormControl className={classes.formControl}>
                    <InputLabel id="selectPeriodLabel">????????????</InputLabel>
                    <Select
                        labelId="selectPeriodLabel"
                        id="selectPeriod"
                        value={view}
                        onChange={(e) => setView(e.target.value as number)}
                    >
                        <MenuItem value={1}>??????</MenuItem>
                        <MenuItem value={2}>???? ????????????</MenuItem>
                        <MenuItem value={3}>???? ??????????</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {filteredTodos.length > 0 ?
                filteredTodos.map((elem, index) => (
                        <Todo key={index} todo={elem}/>
                ))
                :
                <Typography variant={"h5"} align={'center'} className={classes.noTodosMessage}>
                    ???? ???????? ?????? ????????, ???????????? ????????????!
                </Typography>
            }

            <CreateTodoMW open={open} onClose={() => setOpen(false)}/>
        </PageContainer>
    )
}
