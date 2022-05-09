import './App.css'
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import $ from 'jquery';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Container from '@mui/material/Container';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function App() {
  const axios = require('axios').default;

  const [msg, setMsg] = useState([]);
  const [dataSet, setDataSet] = useState([]);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      width: 10
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 20,
      width: 10
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
      sx: {
        width: [100, 200, 300]
      }
    },
  }));


  return (

    <div className="App">

      <header className="App-header">
        <Stack spacing={2} direction="row">
          <Button variant="outlined" color="secondary" size="large" onClick={() => {
            axios({
              method: 'get',
              baseURL: 'http://localhost:8000/lib/showList',
              'Content-Type': 'application/json',
            })
              .then((response) => {
                setMsg(response.data.msg);
                setDataSet(response.data.dataList);
              })
          }}>
            顯示書目清單
          </Button>
        </Stack>
      </header>
      <div className='showArea'>

        <h1>{msg}</h1>
        {/* {dataSet.map((data) =>
          <ul>
            <li>{data.bookName}</li>
            <li>{data.existing}</li>
          </ul>
        )} */}
      </div>
      <div>
        <Container sx={{ minWidth: 300 }}>
          <TableContainer component={Paper} maxWidth="sm">
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ minWidth: 10 }}>ID</StyledTableCell>
                  <StyledTableCell align="right">Book Name</StyledTableCell>
                  <StyledTableCell align="right">Existing</StyledTableCell>
                  <StyledTableCell align="right">Condition</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataSet.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell sx={{ minWidth: 10 }} component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.bookName}</StyledTableCell>
                    <StyledTableCell align="right">{row.existing}</StyledTableCell>
                    <StyledTableCell align="right">{row.condition}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
      <hr />
      <div>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            '& .MuiTextField-root': { width: '25ch' },
          }}
        >
          <TextField label={'姓名'} id="userName" />
          <TextField label={'信箱'} id="userMail" />
          <TextField label={'電話'} id="userPhone" />

        </Box>


        <Button variant="outlined" color="secondary" size="large" onClick={() => {
          axios({
            method: 'post',
            baseURL: 'http://localhost:8000/lib/register',
            'Content-Type': 'application/json',
            responseType: 'json',
            data: {
              name: $('#userName').val(),
              mail: $('#userMail').val(),
              phone: $('#userPhone').val(),
            }
          }).then((response) => {
            setMsg(response.data.msg);
          })
        }}>註冊</Button>
        <p>{msg}</p>
      </div>

      <div>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 3, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="bookId"
        label="書籍序號"
      />
      <TextField
        id="bookCondition"
        label="健康度"
      />
    </Box>
    <Button variant="outlined" color="secondary" size="large" onClick={() => {
          axios({
            method: 'put',
            baseURL: 'http://localhost:8000/lib/condition',
            'Content-Type': 'application/json',
            responseType: 'json',
            data: {
              id: $('#bookId').val(),
              condition: $('#bookCondition').val()
            }
          }).then((response) => {
            console.log($('#bookId').val())
            console.log(response.data)
            setMsg(response.data.msg);
          })
        }}>更新書本狀態</Button>
        <p>{msg}</p>
      </div>


    </div>


  );

}


export default App;

