'use client'

import * as React from 'react';
import ResultTable from './resultTable';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function PersistentDrawerLeft() {
    
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');
  const [sclResultList, setSclResultList] = React.useState({});

  // JSON 데이터 호출 부분
const axiosConfig = {
  headers: {
        'Content-Type': 'application/json',
        'x-api-key' : 'suPkjx7bwpmePaiqKXoOkQ=='
  }
};

async function getSclResult() {
  try {
    const requestOptions = {
      result_kind: 1,
      date_kind : 2,
      date_from : dateFrom,
      date_to : dateTo,
      send_kind : 0
    };

    await axios.post('/scl/ResultApiSvr', requestOptions, axiosConfig)
      .then(r=> {
        setSclResultList(r.data.PATIENT_LIST);
      }
    );
  } catch (error) {
    console.error('API 호출 에러: ', error);
  }
};

  return (
    <>    
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={e => {
            getSclResult()
            e.preventDefault()
          }}
        >
          <TextField
            id="filled-basic-from"
            label="From"
            variant="filled"
            helperText="YYYY-MM-DD"
            value={dateFrom}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setDateFrom(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
          />
          <TextField
            id="filled-basic-to"
            label="To"
            variant="filled"
            helperText="YYYY-MM-DD"
            value={dateTo}
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setDateTo(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
          />
          <Button 
            variant="contained"
            sx={{ margin: 4 }}
            type='submit'
          >결과조회</Button>
        </Box>
      <ResultTable sclResultList={sclResultList}/>
    </>
  )
}