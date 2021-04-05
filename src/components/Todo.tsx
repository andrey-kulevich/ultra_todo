import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {CardHeader, IconButton, Menu, MenuItem} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import {TodoInterface} from "../interfaces/TodoInterface";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
            marginTop: theme.spacing(3)
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        line: {
            color: 'rgba(0, 0, 0, 0.2)'
        }
    })
);

export const Todo = ({todo} : {todo: TodoInterface}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Card className={classes.root} variant="outlined">
                <CardHeader
                    action={
                        <>
                            <IconButton aria-label="settings">
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
                            <IconButton aria-label="settings">
                                <DeleteIcon />
                            </IconButton>
                        </>
                    }
                    title="Название заметки очень сложное ялялял"
                    subheader="September 14, 2016"
                />
                <CardContent>
                    <hr className={classes.line}/>
                    <Typography variant="body2" component="p">
                        Значимость этих проблем настолько очевидна, что начало повседневной работы по формированию позиции
                        обеспечивает широкому кругу (специалистов) участие в формировании форм развития.
                        Равным образом новая модель организационной деятельности в значительной степени
                        обуславливает создание существенных финансовых и административных условий.
                        Значимость этих проблем настолько очевидна, что укрепление и развитие структуры
                        влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям.
                    </Typography>
                </CardContent>
            </Card>
            <Menu
                id="settings-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Изменить</MenuItem>
                <MenuItem onClick={handleClose}>Цвет</MenuItem>
            </Menu>
        </>
    );
}
