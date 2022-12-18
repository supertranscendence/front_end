import { IconButton, Tooltip, Divider, Button, Avatar, Chip } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useCallback, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditProfileModal from 'src/components/EditProfileModal';
import axios, { Axios } from 'axios';
import { dataUser } from 'src/typings/types';
import useSWR from 'swr';
import fetcher from 'src/utils/fetcher';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditIcon from '@mui/icons-material/Edit';
import FtAvatar from '@components/FtAvatar';


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
  ];

const Profile = () => {
  const [showCreateChannelModal, setShowProfileModal] = useState(false);
  const onClickEditProfile = useCallback(() => { setShowProfileModal(true); }, []);
  const onCloseModal = useCallback(() => { setShowProfileModal(false); }, []);
  const { data:myUserData } = useSWR<dataUser>('/api/users/my/friends', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const [isUserMe, setIsUserMe] = useState(false);
  const { intra } = useParams<{ intra: string }>();
  //const [user, setUser] = useState<dataUser>();
  const [user, setUser] = useState<dataUser>({
    avatar:   "default",
    created:  null,
    id:       0,
	  intra:    "UNKNOWN",
    level:    0,
    nickname: "UNKNOWN",
    updated:  null,
    friends:  []
  });

  useEffect(() => {
    console.log("Check isMyUser");
    console.log("user?.intra: ", user?.intra);
    console.log("myUserData?.intra: ", myUserData?.intra);
    if (user?.intra != "UNKNOWN" && user?.intra === myUserData?.intra){
      setIsUserMe(true);
    }
    else{
      setIsUserMe(false);
    }
    console.log("isUserMe:", isUserMe);
  }, [user, myUserData]);

  useEffect(() => {
    axios
    //.get("http://127.0.0.1:3000/api/users/jisokang", {
      .get(`/api/users/${intra}`, {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
          accept: "*/*"
          }
      })
    .then((response) =>{
      console.log(response);
      //console.log("friends: ", response.data);
      console.log("intra: ",response.data.intra)
      setUser(response.data);
    })
    .catch((err) => {
      console.log("[ERROR] get /api/users/{id}")
      console.log(err)
    });
  }, []);

  const handleAddFriend = useCallback(() => {
    const value = {intra: user.intra};
    axios
      .post(`/api/users/`, value, {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
          accept: "*/*"
          }
      })
    .then((response) =>{
      console.log(response);
      //setUser(response.data);
    })
    .catch((err) => {
      console.log("[ERROR] post /api/users/ for adduser")
      console.log(err)
    });
  }, [user, ]);

  //const handleAddFriend = useCallback(() => {
  //  const value = {intra: user?.intra};
  //  axios
  //    .post(`/api/users/`, value, {
  //    withCredentials:true,
  //      headers:{
  //        authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
  //        accept: "*/*"
  //        }
  //    })
  //  .then((response) =>{
  //    console.log(response);
  //    //setUser(response.data);
  //  })
  //  .catch((err) => {
  //    console.log("[ERROR] post /api/users/ for adduser")
  //    console.log(err)
  //  });
  //}, []);

  return (
    <Container maxWidth="lg">
      <Stack spacing={1}>
        <Stack />
          {isUserMe === true ?(
            <div>
              <h1>MY PROFILE</h1>
                <Button
                  aria-label="edit"
                  variant='outlined'
                  onClick={onClickEditProfile}
                  startIcon={<EditIcon />}
                  color='info'
                  >
                  수정하기
                </Button>
            </div>
            ) : (
            <div>
              <h1>{ user && user.nickname } PROFILE</h1>
              <Button variant='outlined' onClick={handleAddFriend} startIcon={<PersonAddAlt1Icon />}>친구 추가</Button>
            </div>
          )}
          {/*img src: https://server.gilee.click/avatar/${uuid}.png*/}
        <Stack alignItems="center">
          <FtAvatar userAvatar={user.avatar} size={128}/>
          <b>Nickname:</b><>{ user && user.nickname }</>
          <b>Intra:</b><>{ user && user.intra }</>
          <b>Level:</b><>{ user && user.level }</>
          <b>Created Date:</b><>{ user && user.created }</>
          <b>Updated Date:</b><>{ user && user.updated }</>
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
      <EditProfileModal
        show={showCreateChannelModal}
        //show={true}
        onCloseModal={onCloseModal}
        setShowProfileModal={setShowProfileModal}
      />
    </Container>

  );
};

export default Profile;
