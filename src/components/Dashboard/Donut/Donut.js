import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import {Paper, Grid} from '@material-ui/core';

import './Donut.css';
import PaperHeader from '../../UI/PaperHeader/PaperHeader';

const data = [
    {name : "Открытые", value : 0},
    {name : "Закрытые", value : 0},
    {name : "Отклоненные", value : 0},
    {name : "Закрытые", value : 0},
]

const COLORS = ['#009803', '#FFC200', '#E5231D', '#2196F3'];


const Donut = (props) => {
    props.dValues.map((e,i) => [
        data[i].value = e
    ])
    return(
        <Paper className="g-main-paper ds-pie">
            <Grid container>
                <Grid item md={6} style={{display : "flex", flexFlow : "column"}}>
                    <PaperHeader primary="Статистика тикетов" secondary="обновлено 5 минут назад"/>
                    <div className="don-labels">
                        {COLORS.map((el,i) => (
                            <div key={"label"+i} className="don-label-cont">
                                <div className="don-label-color" style={{backgroundColor: el}}> </div>
                                <div style={{display: "inline-block"}}>
                                    {data[i].name} : <p style={{color : "#000", display:"inline-block", fontWeight : "450"}}>{" "+props.dValues[i]}</p>
                                </div>
                            </div>))}
                    </div>
                </Grid>
                <Grid item md={6} style={{position : "relative"}}>
                    <PieChart width={400} height={240} onMouseEnter={this.onPieEnter}>
                        <Pie
                            data={data} 
                            cx={"50%"}
                            cy={"50%"} 
                            innerRadius={80}
                            outerRadius={120} 
                            fill="#8884d8"
                            paddingAngle={1}>
                            {data.map((entry, index) => <Cell datsKey={index} key={"pcell_"+index} fill={COLORS[index % COLORS.length]}/>)}
                        </Pie>
                        <Tooltip offset={-120}/>
                    </PieChart>
                    <div className="don-count">
                        <div style={{margin:"auto"}}>{props.count}</div>
                    </div>
                </Grid>
            </Grid>
       </Paper>
    );
}

export default Donut;