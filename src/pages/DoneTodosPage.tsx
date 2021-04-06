import {PageContainer} from "../containers/PageContainer";
import {FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Todo} from "../components/Todo";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            width: 40,
            height: 40,
        },
        formControl: {
            minWidth: 140,
        },
        title: {
            marginRight: theme.spacing(3),
            paddingTop: theme.spacing(1),
        }
    }),
);

export const DoneTodosPage = () => {
    const classes = useStyles();

    const [view, setView] = useState<number>(1);

    useEffect(() => {

    },[])

    return(
        <PageContainer>
            <Grid container direction={"row"}>
                <Typography variant={"h5"} className={classes.title}>Выполненные задачи</Typography>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Период</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={view}
                        onChange={(e) => setView(e.target.value as number)}
                        label="Age"
                    >
                        <MenuItem value={1}>Все</MenuItem>
                        <MenuItem value={2}>За неделю</MenuItem>
                        <MenuItem value={3}>За месяц</MenuItem>
                        <MenuItem value={4}>За год</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

        </PageContainer>
    )
}
