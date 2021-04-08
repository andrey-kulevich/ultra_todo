import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useTodos} from "../context/TodosContext";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chartPaper: {
            marginTop: theme.spacing(3),
            padding: theme.spacing(2),
            maxHeight: 550,
            minHeight: 40
        }
    }),
);

export const TodosStatisticChart = () => {

    const classes = useStyles()
    const {todos} = useTodos()

    const [chartLabels, setChartLabels] = useState<string[]>([])
    const [data, setData] = useState<number[]>([])

    useEffect(() => {
        setChartLabels(createLabels())
    },[todos])

    const createLabels = () => {
        let months = ['January','February','March','April','May','June',
            'July','August','September','October','November','December']
        let temp: string[] = []
        todos.forEach((elem) => {
            temp.push(months[parseInt(elem.lastModifiedDate.split('-')[1])])
        })
        return temp
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
        labels: chartLabels,
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
                data: data
            }
        ]
    }

    useEffect(() => {

    },[])

    return (
        <Paper elevation={3} className={classes.chartPaper}>
            <Line data={chartData} options={options} height={120}/>
        </Paper>
    )
}

