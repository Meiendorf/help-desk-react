import React from 'react';
import TableHeadExt from '../../../Util/TableHeadExt';

const headerValues = [
    { id: 'id', label: '#' },
    { id: 'title', label: 'Тема' },
    { id: 'client', label: 'Клиент' },
    { id: 'priority', label: 'Приоритет' },
    { id: 'status', label: 'Статус' },
    { id: 'date', label: 'Добавлен' },
]

const ticketTableHead = () => (
    <TableHeadExt headerValues={headerValues}/>
);

export default ticketTableHead;