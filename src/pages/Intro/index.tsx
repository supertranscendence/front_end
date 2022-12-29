
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
    //dedupingInterval: 2000, // 2초
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

  useEffect(() => {
    if(myUserData){
      console.log("GET /api/achievement/ MY user.intra: ", myUserData.intra);
      axios
      .get(process.env.REACT_APP_API_URL + `/api/achievements/${myUserData.intra}`, {
        withCredentials:true,
          headers:{
            authorization: 'Bearer ' + localStorage.getItem("accessToken"),
            accept: "*/*"
            }
        })
      .then((response) =>{
        if(response.status === 500)
            location.href = "/error";
        if(response && response.data && response.data[0] && response.data[0].achievement === 0){
          // Back-End에서 순서 못바꾸면 data.find()로 0있는지 찾는 방식으로 해야함.
          console.log("NOT 처음 로그인!");
          setIsFirstLogin(false);
        }
        else{
          console.log("😄 첫번째 로그인");
          setIsFirstLogin(true);
        }
      })
      .catch((err) => {
        console.log("[ERROR] get API/ACHIVMENT/")
        console.log(err)
        window.location.href = "/error";
      });
    }
  }, [myUserData]);

  if(isFirstLogin === true){
    return (
      <Container maxWidth="lg">
      <FirstProfileModal
        show={isFirstLogin}
        setShowProfileModal={setShowFirstProfileModal}
        />
    </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <h1> Welcome {myUserData && myUserData.nickname} a.k.a. {myUserData && myUserData.intra} !! </h1>
    </Container>
  );
};

export default Intro;
