import React from 'react';
import { Paper } from '@material-ui/core';

const colors = [
    {color : "#2196F3", labels : ['закрыт', 'низкий']},
    {color : "#E5231D", labels : ['отклонен', 'высокий']},
    {color : "#FFC200", labels : ['в работе']},
    {color : "#009803", labels : ['открыт', 'средний']}
]
const tableTicketChip = (props) => {
    let fColors = colors.filter(el => {
        return el.labels.includes(props.text.toLowerCase());
    });
    let color = fColors.length === 0 ? "#2196F3" : fColors[0].color;
    return(
        <Paper style={{
            backgroundColor : color,
            padding : "6px",
            textAlign : "center",
            fontWeight : "500",
            color : "#fff"}}>
            {props.text}
        </Paper>
    )
}

export default tableTicketChip