import React, { useEffect, useReducer } from 'react';

import lodash from 'lodash';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';


const reducer = function (state, action) {
    switch (action.type) {

        case 'GET-LIST': {

            let firstObjectList = action.list[0];
            let keys = Object.keys(firstObjectList);

            keys = keys.filter((key) => {
                return typeof firstObjectList[key] === 'string' || typeof firstObjectList[key] === 'number';
            });

            let headers = keys.map((key) => {
                return { headerName: key, sortDir: '' };
            });

            return { headers, ...action };

        }
        case 'SORT': {

            let sortDirection = ['asc'];
            let newHeaders = state.headers.map((header) => {
                if (action.sortKeyValue[0] === header.headerName) {
                    header.sortDir = action.sortKeyValue[1] === 'asc' ? 'desc' : 'asc';
                    sortDirection = [header.sortDir];
                    return header;
                } else {
                    header.sortDir = '';
                    return header;
                }
            });

            let newList = lodash.orderBy(state.list, [action.sortKeyValue[0]], sortDirection);

            return { list: newList, headers: newHeaders };

        }
        default:

            return state;
    }
}

const initialStateValues = { list: [], headers: [] }


function TableComponent({ postsList }) {

    const [tableData, dispatchTableData] = useReducer(reducer, initialStateValues);

    useEffect(() => {

        dispatchTableData({ list: postsList, type: 'GET-LIST' });

    }, []);

    return (
        <div className="table-container">

            <Table>

                <TableHead>
                    <TableRow>
                        {
                            tableData.headers.map((header) => {
                                return (
                                    <TableCell key={header.headerName}>
                                        <TableSortLabel
                                            active={header.sortDir !== ''} {...header.sortDir ? { direction: header.sortDir } : ''}
                                            onClick={() => dispatchTableData({ type: 'SORT', sortKeyValue: [header.headerName, header.sortDir] })}>
                                            {header.headerName.toUpperCase()}
                                        </TableSortLabel>
                                    </TableCell>
                                )
                            })
                        }
                    </TableRow>

                </TableHead>

                <TableBody>
                    {
                        tableData.list.map((item, index) => {
                            return (
                                <TableRow key={index}>
                                    {
                                        tableData.headers.map((header, index) => {
                                            return (
                                                <TableCell key={index}>
                                                    {item[header.headerName]}
                                                </TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            )
                        })

                    }
                </TableBody>

            </Table>


        </div>
    )

}

export default TableComponent;
