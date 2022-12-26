
import React, { useCallback, useState, useEffect } from 'react';
import { Container } from '@mui/system';
import { achievementType, dataFriend, dataUser, getAchievementType } from 'src/typings/types';
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
  const [userAchi, setUserAchi] = useState<getAchievementType>();
  //const onClickEditProfile = useCallback(() => { setShowFirstProfileModal(true); }, []);
  const onCloseModal = useCallback(() => { setShowFirstProfileModal(false); }, []);

  const checkIsFirstLogin = (achi:number | undefined) => {
    if(achi === undefined)
      setIsFirstLogin(true);
    //if(achi != 0)
    //  setIsFirstLogin(true);
  }

  useEffect(() => {
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
      console.log("response API/ACHIVMENT/");
      console.log(response.data);
      setUserAchi(response.data);
      checkIsFirstLogin(userAchi?.achievements[0].achievement);
    })
    .catch((err) => {
      console.log("[ERROR] get API/ACHIVMENT/")
      console.log(err)
    });

  }, []);
  return (
    <Container maxWidth="lg">
      <h1> Welcome {myUserData && myUserData.nickname} a.k.a. {myUserData && myUserData.intra} !! </h1>

    <FirstProfileModal
      //show={showFirstProfileModal}
      show={isFirstLogin}
      onCloseModal={onCloseModal}
      setShowProfileModal={setShowFirstProfileModal}
      />
    </Container>
  );
};

export default Intro;
