import React, {useEffect, useState} from 'react';
import {Bar} from 'react-chartjs-2';
import {Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useTodos} from "../context/TodosContext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chartPaper: {
            marginTop: theme.spacing(3),
            padding: theme.spacing(2),
            maxHeight: 300,
            minHeight: 40
        }
    }),
);

export const TodosStatisticChart = () => {

    const classes = useStyles()
    const {todos} = useTodos()

    const [reducedData, setReducedData] = useState<{ label: string; done: number; }[]>([])

    useEffect(() => {
        setReducedData(createChartData())
    },[todos])

    const createChartData = () => {
        let tempTodos: { label: string; done: number; }[] = []
        todos.forEach(elem => {
            tempTodos.push({
                label: elem.lastModifiedDate.slice(0, 7),
                done: elem.isDone ? 1 : 0
            })
        })

        let result: { label: string; done: number; }[] = []

        tempTodos.reduce(function(res, value) {
            // @ts-ignore
            if ( !res[value.label]) {
                // @ts-ignore
                res[value.label] = { label: value.label, done: 0 }
                // @ts-ignore
                result.push(res[value.label])
            }
            // @ts-ignore
            res[value.label].done += value.done
            return res
        }, {})

        return result
    }

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    suggestedMin: 0
                }
            }]
        }
    }

    const chartData = {
        labels: reducedData.map(elem => elem.label),
        datasets: [
            {
                label: 'Статистика выполнения задач',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(252,109,38,0.4)',
                borderColor: 'rgba(252,109,38,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(226,67,41,1)',
                pointHoverBorderColor: 'rgba(226,67,41,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: reducedData.map(elem => elem.done)
            }
        ]
    }

    return (
        <Paper elevation={3} className={classes.chartPaper}>
            <Bar data={chartData} options={options} height={75}/>
        </Paper>
    )
}

