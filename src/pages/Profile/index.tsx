import { IconButton, Tooltip, Divider, Button, Avatar, Chip } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useCallback, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from 'react-router-dom';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    player: string,
    score: number,
    time: string,
  ) {
    return { player, score, time};
  }

  const rows = [
    createData('jisokang VS hypark', 15, '2021-01-01'),
    createData('jisokang VS hypark', 15, '2021-01-01'),
    createData('jisokang VS hypark', 15, '2021-01-01'),
    createData('jisokang VS hypark', 15, '2021-01-01'),
    createData('jisokang VS hypark', 15, '2021-01-01'),
  ];

const Profile = () => {

  return (
    <Container maxWidth="lg">
        <Stack spacing={1}>
            <Stack />
            <Stack
                direction="row"
                alignItems="flex-end"
            >
                <Avatar sx={{ width: 128, height: 128 }}/>
                <b>JISOKANG</b>
                <Tooltip title="수정하기" arrow>
                    <IconButton aria-label="edit"> {/* Link to Modal for edit */}
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Divider variant="middle" />
            <h2>Achivment</h2>
            <Stack
            spacing={1}
            direction="row"
            >
                <Chip label="🔥 3연승" variant="outlined" />
                <Chip label="🔥 10연승" variant="outlined" />
            </Stack>
            {/* observer list 출력 */}
            <Divider variant="middle" />
            <h2>Battle log</h2>
            20전 7승 13패 승률 35%
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                    <TableRow>
                        <TableCell>Players</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Time</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.player}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell>{row.player}</TableCell>
                        <TableCell>{row.score}</TableCell>
                        <TableCell>{row.time}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
        </Stack>
    </Container>
  );
};

export default Profile;
