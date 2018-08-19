import React from 'react';
import {TableHead, TableRow, TableCell} from '@material-ui/core';

const tableHeadExt = (props) => (
    <TableHead>
        <TableRow>
            {props.headerValues.map(el =>(
                <TableCell
                    key={el.id}
                    padding={'default'}>
                    {el.label}
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
)

export default tableHeadExt;