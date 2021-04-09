import {PageContainer} from "../containers/PageContainer";
import {FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Todo} from "../components/Todo";
import {useTodos} from "../context/TodosContext";
import {daysBetween, getCurrentDate} from "../helpers/utils";
import {TodosStatisticChart} from "../components/TodosStatisticChart";

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
        noTodosMessage: {
            marginTop: theme.spacing(3),
        },
        fab: {
            marginRight: theme.spacing(3),
            marginTop: theme.spacing(0.5),
        },
    }),
);

export const DoneTodosPage = () => {
    const classes = useStyles();
    const {todos} = useTodos()
    const [view, setView] = useState<number>(1)

    return(
        <PageContainer>
            <Grid container direction={"row"}>
                <Typography variant={"h5"} className={classes.title}>Завершенные задачи</Typography>
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
                    </Select>
                </FormControl>
            </Grid>
            <TodosStatisticChart/>
            {todos.length > 0 ?
                (view === 1 ? todos.filter(elem => elem.isDone)
                    :
                    view === 2 ? todos.filter(elem => elem.isDone &&
                        daysBetween(elem.lastModifiedDate, getCurrentDate()) < 7)
                        :
                        todos.filter(elem => elem.isDone && elem.lastModifiedDate.split('-')[1] ===
                            (new Date().getMonth() + 1).toString().padStart(2, '0')))
                    .map((elem, index) => (
                        <Todo key={index} todo={elem}/>
                    ))
                :
                <Typography variant={"h5"} align={'center'} className={classes.noTodosMessage}>
                    Нет выполненных задач
                </Typography>
            }
        </PageContainer>
    )
}
