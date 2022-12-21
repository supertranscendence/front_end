
import React, { useCallback, useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { dataFriend, dataUser } from 'src/typings/types';
import fetcher from 'src/utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import FirstProfileModal from 'src/components/FirstProfileModal';

const Intro = () => {
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/users/my/", {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
          accept: "*/*"
          }
      })
    .then((response) =>{
      console.log("[response]: ", response);
      //console.log("friends: ", response.data);
      console.log("[친구]: ",response.data)
    })
    .catch((err) => {
      console.log("[ERROR] get /api/users/")
      console.log(err)
    });
  }, []);
  const { data: myUserData } = useSWR<dataUser>(process.env.REACT_APP_API_URL + '/api/users/my/', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  console.log("myUserData:", myUserData);

  const [showFirstProfileModal, setShowFirstProfileModal] = useState(true);
  //const onClickEditProfile = useCallback(() => { setShowFirstProfileModal(true); }, []);
  const onCloseModal = useCallback(() => { setShowFirstProfileModal(false); }, []);
  return (
    <Container maxWidth="lg">
      <h1> Welcome {myUserData && myUserData.nickname} a.k.a. {myUserData && myUserData.intra} !! </h1>

    <FirstProfileModal
      //show={showFirstProfileModal}
      show={false}
      onCloseModal={onCloseModal}
      setShowProfileModal={setShowFirstProfileModal}
      />
    </Container>
  );
};

export default Intro;
