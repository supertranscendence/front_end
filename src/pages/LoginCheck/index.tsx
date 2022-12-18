import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import React, { useCallback, useState } from 'react';
import authfetcher from 'src/utils/authfetcher';
import { Avatar, Button, Container } from '@mui/material';
import { Box, Stack } from '@mui/system';
import axios from 'axios'
import Input2FAModal from 'src/components/Input2FAModal';
import { dataUser } from 'src/typings/types';
import fetcher from 'src/utils/fetcher';

const LoginCheck = () => {
  const [showInput2FAModal, setShowInput2FAModal] = useState(true);
  const onCloseModal = useCallback(() => { setShowInput2FAModal(false); }, []);
  //const { data:myUserData } = useSWR<dataUser>(process.env.REACT_APP_API_URL + '/api/users/my/friends', fetcher, {
  //  dedupingInterval: 2000, // 2초
  //});
  //if(myUserData.is2FA === true){
  //  setShowInput2FAModal(true);
  //}

  return (
    <Input2FAModal
      show={showInput2FAModal}
      onClose2FAModal={onCloseModal}
      setShow2FAModal={setShowInput2FAModal}
    />

  );
};

export default LoginCheck;
