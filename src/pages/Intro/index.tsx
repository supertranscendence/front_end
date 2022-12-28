
import React, { useCallback, useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import { achievementType, dataFriend, dataUser, achievementTypeList } from 'src/typings/types';
import fetcher from 'src/utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import FirstProfileModal from 'src/components/FirstProfileModal';

const Intro = () => {

  const { data: myUserData } = useSWR<dataUser>(process.env.REACT_APP_API_URL + '/api/users/my/', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const [showFirstProfileModal, setShowFirstProfileModal] = useState(true);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [userAchi, setUserAchi] = useState<achievementTypeList>();
  //const onClickEditProfile = useCallback(() => { setShowFirstProfileModal(true); }, []);
  const onCloseModal = useCallback(() => { setShowFirstProfileModal(false); }, []);

  const checkIsFirstLogin = (achi:number | undefined) => {
    if(achi === undefined)
    {
      console.log("checkIsFirstLogin -> achi = undefined");
      setIsFirstLogin(true);
    }
    //if(achi != 0)
    //  setIsFirstLogin(true);
  }

  const onClickTestFirst = useCallback(() => {
    console.log("GET /api/achievement/ MY user.intra: ", myUserData?.intra);
    axios
    .get(process.env.REACT_APP_API_URL + `/api/achievements/${myUserData?.intra}`, {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem("accessToken"),
          accept: "*/*"
          }
      })
    .then((response) =>{
      console.log("response /api/achievement/", response.data);
      setUserAchi(response.data);
    })
    .then(() => {
      console.log("userAchi: ", userAchi);
      console.log("userAchi[0]: ", userAchi[0]);
      if(userAchi[0] === undefined) {
          console.log("😄 첫번째 로그인");
          setIsFirstLogin(true);
        }
        else{
          console.log("NOT 처음 로그인!");
          setIsFirstLogin(false);
      }
    })
    .catch((err) => {
      console.log("[ERROR] get API/ACHIVMENT/")
      console.log(err.status)
    });

  }, []);
  if(isFirstLogin === true){
    return (
      <Container maxWidth="lg">
      <FirstProfileModal
        //show={showFirstProfileModal}
        show={isFirstLogin}
        //onCloseModal={onCloseModal}
        setShowProfileModal={setShowFirstProfileModal}
        />
    </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <h1> Welcome {myUserData && myUserData.nickname} a.k.a. {myUserData && myUserData.intra} !! </h1>
      <Button onClick={onClickTestFirst}>첫 로그인 테스트</Button>
      <FirstProfileModal
        //show={showFirstProfileModal}
        show={isFirstLogin}
        //onCloseModal={onCloseModal}
        setShowProfileModal={setShowFirstProfileModal}
        />
    </Container>
  );
};

export default Intro;
