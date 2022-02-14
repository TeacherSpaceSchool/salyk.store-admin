import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Router from 'next/router';

let getMuiTheme = () => createMuiTheme({
    overrides: {
        MUIDataTableBodyCell: {
            root: {
                textOverflow: 'ellipsis',
                maxHeight: '400px',
                maxWidth: '200px',
                overflow: 'hidden',
                wordWrap: 'break-word'
            }
        },
        MuiPaper: {
            root: {
                minWidth: '100%',
            },
            elevation4:{
                boxShadow: 'none'
            }
        }

    }
})

const MyTable =  React.memo(
    (props) =>{
        const { columns, row, click } = props;
        let data = row.map((row, idx)=>{
            let data = [...row.data]
            if(click)
                data.splice(click, 1)
            return [idx+1, ...data]
        })
        const options = {
            customSort: (data, colIndex, order) => {
                data = data.sort(function(a, b) {
                    return order==='desc'?
                        parseInt(b.data[colIndex]) - parseInt(a.data[colIndex])
                        :
                        parseInt(a.data[colIndex]) - parseInt(b.data[colIndex])
                });
                data = data.map((row, idx)=>{
                    row.data[0]=idx+1;
                    return row
                })
                return data
            },
            selectableRows: 'none',
            print: false,
            pagination: true,
            rowsPerPage: 100,
            rowsPerPageOptions: [100],
            count: data.length,
            responsive: 'scroll',
            downloadOptions: {filename: 'tableDownload.csv', separator: ','},
            onCellClick: (colData, colMeta) => {
                if(click)
                    window.open(row[colMeta.rowIndex].data[click], '_blank')
            },
        };
        return (
            <div  style={{zoom: 0.94, width: '100%'}}>
                <MuiThemeProvider theme={getMuiTheme()}>
                    <MUIDataTable
                        data={data}
                        columns={['#', ...columns]}
                        options={options}
                    />
                </MuiThemeProvider>
            </div>
        );
    }
)

export default MyTable;