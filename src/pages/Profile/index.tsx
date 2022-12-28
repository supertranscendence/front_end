import { IconButton, Tooltip, Divider, Button, Avatar, Chip } from '@mui/material';
import { Container, Stack } from '@mui/system';
import React, { useCallback, useState, useEffect } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditProfileModal from 'src/components/EditProfileModal';
import Edit2FAModal from 'src/components/Edit2FAModal';
import axios, { Axios } from 'axios';
import { achievementTypeList, dataUser, GameType, listGame,  } from 'src/typings/types';
import useSWR from 'swr';
import fetcher from 'src/utils/fetcher';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import FtAvatar from 'src/components/FtAvatar';
import { Socket } from 'dgram';
import useSocket from "src/hooks/useSocket";
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const { data:myUserData } = useSWR<dataUser>(process.env.REACT_APP_API_URL + '/api/users/my/', fetcher, {
    //dedupingInterval: 2000, // 2초
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const onClickEditProfile = useCallback(() => { setShowProfileModal(true); }, []);
  const onClick2FAModal = useCallback(() => { setShow2FAModal(true); }, []);
  const onCloseModal = useCallback(() => { setShowProfileModal(false); }, []);
  const onClose2FAModal = useCallback(() => { setShow2FAModal(false); }, []);
  const [isUserMe, setIsUserMe] = useState(false);
  const { intra } = useParams<{ intra: string }>();
  const [user, setUser] = useState<dataUser>();
  const [userGame, setUserGame] = useState<listGame>();
  const [userAchi, setUserAchi] = useState<achievementTypeList>([]);
  const { workspace } = useParams<{ workspace?: string }>();
  const [socket] = useSocket(workspace);
  const history = useHistory();

  useEffect(() => {
    if(intra && myUserData)
    {
      console.log("profile intra in!")
      console.log("myUserData:", myUserData);
      axios
        .get(process.env.REACT_APP_API_URL + `/api/users/${intra}`, {
        withCredentials:true,
          headers:{
            authorization: 'Bearer ' + localStorage.getItem("accessToken"),
            accept: "*/*"
            }
        })
      .then((response) =>{
        console.log(response);
        console.log("intra: ",response.data.intra)
        setUser(response.data);
        if (intra === myUserData.intra){
          setIsUserMe(true);
        } else{
          setIsUserMe(false);
        }
      })
      .catch((err) => {
        console.log("[ERROR] get /api/users/{id}");
        console.log(err);
        history.push('/workspace/sleact/intro');
      });
    }
  }, [myUserData]);

  //////////////////
  const handleAddFriend = useCallback(() => {
    //const value = {intra: user?.intra};
    if(user)
    {
      console.log("AddMyFriend: ", user.intra);
      socket?.emit("AddMyFriend", user.intra);
    }
    //axios
    //  .post(process.env.REACT_APP_API_URL + `/api/users/`, value, {
    //  withCredentials:true,
    //    headers:{
    //      authorization: 'Bearer ' + localStorage.getItem("accessToken"),
    //      accept: "*/*"
    //      }
    //  })
    //.then((response) =>{
    //  console.log(response);
    //  //setUser(response.data);
    //})
    //.catch((err) => {
    //  console.log("[ERROR] post /api/users/ for adduser")
    //  console.log(err)
    //});
  }, [socket, user ]);

  useEffect(() => {
    console.log("/api/game/ user.intra: ", user?.intra);
    axios
      .get(process.env.REACT_APP_API_URL + `/api/game/${user?.intra}`, {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem("accessToken"),
          accept: "*/*"
          }
      })
    .then((response) =>{
      console.log("response API/GAME/");
      console.log(response);
      setUserGame(response.data);
    })
    .catch((err) => {
      console.log("[ERROR] post /api/users/ for adduser")
      console.log(err)
    });
  }, [user ]);

  const handleBlockUser = useCallback(() => {
    console.log("on handler Block");
    socket?.emit("Block",intra);
  }, [socket]);

  //achiv
  // id: 0 - first_login (이걸로 초기 계정 설정창 띄움)
  // id: 1 - first_win

  const printAchi = (num:number) => {
    if(num === 0){
      return "👋 Welcome, Cadet"
    }
    else if(num === 1){
      return "🔥 1st, Win!"
    }
    else{
      return "😞 Wrong"
    }
  }

  useEffect(() => {
    console.log("GET /achievements/user.intra: ", user?.intra);
    axios
      .get(process.env.REACT_APP_API_URL + `/api/achievements/${user?.intra}`, {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem("accessToken"),
          accept: "*/*"
          }
      })
    .then((response) =>{
      console.log("response API/ACHIVMENT/");
      console.log(response.data);
      setUserAchi(response.data);
    })
    .catch((err) => {
      console.log("[ERROR] get API/ACHIVMENT/")
      console.log(err)
    });
  }, [user]);


  return (
    <Container maxWidth="lg">
      <Stack spacing={1}>
        <Stack />
        {/*{isUserMe != true ?(*/}
        {isUserMe === true ?(
            <Stack spacing={0}>
              <h1>MY PROFILE</h1>
              <Stack spacing={1} direction="row">
                <Button
                  aria-label="edit"
                  variant='outlined'
                  onClick={onClickEditProfile}
                  startIcon={<EditIcon />}
                  color='info'
                  >
                  수정하기
                </Button>
                <Button
                  aria-label="2fa"
                  variant='outlined'
                  startIcon={<KeyIcon />}
                  onClick={onClick2FAModal}
                  color='warning'
                  >
                  2차 인증
                </Button>
                </Stack>
            </Stack>
            ) : (
            <div>
              <h1>{ user && user.nickname } PROFILE</h1>
              <Stack spacing={1} direction="row">
                <Button variant='outlined' onClick={handleAddFriend} startIcon={<PersonAddAlt1Icon />}>친구 추가</Button>
                <Button variant='outlined' color='error' onClick={handleBlockUser} startIcon={<PersonAddAlt1Icon />}>블락 설정/해제</Button>
              </Stack>
            </div>
          )}
        <Stack alignItems="center">
          <FtAvatar userAvatar={user?.avatar} size={128}/>
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
            {userAchi && userAchi.map((row) => (
                  <Chip label={printAchi(row.achievement)} variant="outlined" />
              ))}
        </Stack>
        {/* observer list 출력 */}
        <Divider variant="middle" />
        <h2>Battle log</h2>
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
              {userGame && userGame.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell>{row.player}</TableCell>
                    <TableCell>{row.score}</TableCell>
                    <TableCell>{row.created.toString()}</TableCell>
                  </TableRow>
              ))}
              </TableBody>
            </Table>
        </TableContainer>
      </Stack>
      <EditProfileModal
        show={showProfileModal}
        onCloseModal={onCloseModal}
        setShowProfileModal={setShowProfileModal}
      />
      <Edit2FAModal
        show={show2FAModal}
        //onClose2FAModal={onClose2FAModal}
        setShow2FAModal={setShow2FAModal}
      />
    </Container>

  );
};

export default Profile;
