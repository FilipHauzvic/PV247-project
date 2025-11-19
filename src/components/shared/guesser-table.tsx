'use client';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const GuesserTable = ({rowNames, data}: {rowNames: string[], data: string[][]}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {rowNames.map((rowName, rowNameId) => (
                <StyledTableCell key={rowNameId}>{rowName}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
            {data.map((row, rowId) => (
                <StyledTableRow key={rowId}>
                    {row.map((rowPart, rowPartId) => (
                        <StyledTableCell key={rowPartId}>{rowPart}</StyledTableCell>
                    ))}
                </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default GuesserTable;
