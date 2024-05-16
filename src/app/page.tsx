'use client'

import * as React from 'react';
import ResultTable from './resultTable';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function PersistentDrawerLeft() {
    
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');

  return (
    <>    
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="filled-basic"
            label="From"
            variant="filled"
            helperText="8자리 필수"
          />
          <TextField
            id="filled-basic"
            label="To"
            variant="filled"
            helperText="8자리 필수"
          />
          <Button 
            variant="contained"
            sx={{ margin: 4 }}
          >결과조회</Button>
        </div>
      </Box>
      <ResultTable dateFrom={dateFrom} dateTo={dateTo}/>
    </>
  )
}