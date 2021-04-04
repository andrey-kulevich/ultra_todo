import {PageContainer} from "../containers/PageContainer";
import {
    Typography
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useHttp} from "../hooks/useHttp";


export const NotesPage = () => {
    const [checked, setChecked] = useState([0]);
    const {loading, request} = useHttp()

    useEffect(() => {

    },[])


    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return(
        <PageContainer>
            <Typography variant={"h4"} gutterBottom>That yours todos</Typography>

        </PageContainer>
    )
}
