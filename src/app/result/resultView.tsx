import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Typography from '@mui/material/Typography'
import LastPageIcon from '@mui/icons-material/LastPage';
import Grid from '@mui/material/Grid';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function CustomizedTables(Props: {sclResultList: {}}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [resultList, setResultList] = React.useState({});
  const [selectedData, setSelectedData] = React.useState({});

  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Props.sclResultList.length) : 0;

  useEffect(() => {
    setResultList(Props.sclResultList);
  }, [Props.sclResultList]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const handleOpen = (row) => {
    setSelectedData(row);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table aria-label="SCL 결과리스트">
            <TableHead>
              <TableRow>
                <StyledTableCell>성명</StyledTableCell>
                <StyledTableCell>차트번호</StyledTableCell>
                <StyledTableCell>검사코드</StyledTableCell>
                <StyledTableCell>검사명</StyledTableCell>
                <StyledTableCell>보험코드</StyledTableCell>
                <StyledTableCell>접수일자</StyledTableCell>
                <StyledTableCell>접수번호</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!resultList || Object.keys(resultList).length === 0 ? null :
                (rowsPerPage > 0
                  ? resultList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : resultList
                ).map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ cursor: 'pointer' }}
                    onClick={(event) => {
                      handleOpen(row);      
                    }}
                  >
                    <TableCell>
                      {row.PNAME}
                    </TableCell>
                    <TableCell>
                      {row.CHARTNO}
                    </TableCell>
                    <TableCell>
                      {row.HITEMCODE}
                    </TableCell>
                    <TableCell>
                      {row.HITEMNAME}
                    </TableCell>
                    <TableCell>
                      {row.INSUCODE}
                    </TableCell>
                    <TableCell>
                      {row.ORDDATE}
                    </TableCell>
                    <TableCell>
                      {row.ORDNO}
                    </TableCell>
                  </TableRow>
                ))
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={!resultList || Object.keys(resultList).length === 0 ? 0 : resultList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
      { JSON.stringify(selectedData) != '{}'
        ?
      <Grid item xs={6}>
        <Grid container xs={12} spacing={4}>
          <Grid item xs={4}>
            <Typography paragraph>{ selectedData.PNAME }</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography paragraph>{ selectedData.CHARTNO }</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography paragraph>{ selectedData.CHARTNO }</Typography>
          </Grid>
        </Grid>
        <Typography paragraph>결과: { selectedData.RESULT }</Typography>
        <Typography paragraph>서술형 결과: { selectedData.FRESULT}</Typography>
      </Grid>
      : null
      }
    </Grid>
  );
}