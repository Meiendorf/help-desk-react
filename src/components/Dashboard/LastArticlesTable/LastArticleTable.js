import React from 'react';
import {Paper, Table, TableRow, TableCell, TableHead, TableBody} from '@material-ui/core';

import PaperHeader from '../../UI/PaperHeader/PaperHeader';
import TableHeadExt from '../../Util/TableHeadExt';

const headerValues = [
    {id: "id", label : "#"},
    {id: "name", label : "Название"},
    {id: "date", label : "Добавлено"}
]

const lastArticleTable = (props) => (
    <Paper className="g-main-paper ds-articles">
        <PaperHeader primary="Последнее из базы знаний" secondary="обновлено 01.09.18"/>
        <Table>
            <TableHeadExt headerValues={headerValues}/>
            <TableBody>
                {props.articles.map((el,i) => (
                    <TableRow
                        key={"article_"+i}
                        hover>
                        <TableCell>{el.id}</TableCell>
                        <TableCell>{el.name}</TableCell>
                        <TableCell>{el.date}</TableCell>
                    </TableRow>
                ))}
                
            </TableBody>
        </Table>
    </Paper>
);

export default lastArticleTable;