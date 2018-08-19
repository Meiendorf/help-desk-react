import React from 'react';
import {Paper, Table, TableHead, TableBody, TableCell, TableRow, TablePagination} from '@material-ui/core';
import PaperHeader from '../../UI/PaperHeader/PaperHeader';
import TicketTableHead from './TicketTableHead/TicketTableHead';
import TableTicketChip from './TicketTableChip/TableTicketChip';

const ticketsTableLite = (props) => {
    return(
        <Paper className="g-main-paper ds-tickets">
            <PaperHeader primary="Последние тикеты" secondary="обновлено 5 минут назад"/>
            <Table className="ttl-table">
                <TicketTableHead/>
                <TableBody>
                    {props.tickets.map(ticket => (
                        <TableRow
                            key={ticket.id}
                            hover>
                            <TableCell>{ticket.id}</TableCell>
                            <TableCell>{ticket.name}</TableCell>
                            <TableCell>{ticket.client}</TableCell>
                            <TableCell><TableTicketChip text={ticket.priority}/></TableCell>
                            <TableCell><TableTicketChip text={ticket.status}/></TableCell>
                            <TableCell>{ticket.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={120}
                rowsPerPage={props.rowsPerPage}
                page={props.page}
                onChangePage={props.pageChanged}
                onChangeRowsPerPage={props.rowsChanged}
                />
      </Paper>
    );
} 

export default ticketsTableLite;