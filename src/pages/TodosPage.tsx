import {PageContainer} from "../containers/PageContainer";
import {Fab, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Todo} from "../components/Todo";
import {useTodos} from "../context/TodosContext";
import AddIcon from '@material-ui/icons/Add';
import {CreateTodoMW} from "../components/CreateTodoMW";

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
        },
        fab: {
            marginRight: theme.spacing(3),
            marginTop: theme.spacing(0.5),
        },
    }),
);

export const TodosPage = () => {
    const classes = useStyles();
    const {todos, addTodo} = useTodos()
    const [view, setView] = useState<number>(1)
    const [open, setOpen] = useState(false)

    useEffect(() => {

    },[todos])

    return(
        <PageContainer>
            <Grid container direction={"row"}>
                <Typography variant={"h5"} className={classes.title}>Активные задачи</Typography>
                <Fab size="small"
                     color="primary"
                     className={classes.fab}
                     aria-label="add"
                     onClick={() => setOpen(true)}
                >
                    <AddIcon />
                </Fab>
                <FormControl className={classes.formControl}>
                    <InputLabel id="selectPeriodLabel">Период</InputLabel>
                    <Select
                        labelId="selectPeriodLabel"
                        id="selectPeriod"
                        value={view}
                        onChange={(e) => setView(e.target.value as number)}
                    >
                        <MenuItem value={1}>Все</MenuItem>
                        <MenuItem value={2}>За неделю</MenuItem>
                        <MenuItem value={3}>За месяц</MenuItem>
                        <MenuItem value={4}>За год</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            {todos.filter(elem => !elem.isDone).map((elem, index) => (
                <Todo key={index} todo={elem} index={index}/>
            ))}
            <CreateTodoMW open={open} onClose={() => setOpen(false)} createTodo={addTodo}/>
        </PageContainer>
    )
}
