import React, { FC, PropsWithChildren, useCallback, useState, useRef } from 'react';
import Modal from "src/components/Modal"
import { Stack } from '@mui/system';
import { TextField, Button } from '@mui/material';
import useInput from "src/hooks/useInput"
import axios from 'axios';

interface Props {
  show: boolean;
  onClose2FAModal: () => void;
  setShow2FAModal : (flag:boolean) => void
  }

const Edit2FAModal: FC<PropsWithChildren<Props>> = ({ show, children, onClose2FAModal, setShow2FAModal }) => {

  const [newEmail, onChangeNewEmail, setNewEmail] = useInput('');

  const onSubmitEmail = useCallback((e:any) => {
    e.preventDefault();
    console.log("onSubmitEmail called!!")
    console.log("newEmail: ",newEmail);
    axios
      .post(process.env.REACT_APP_API_URL + `/api/auth/ft/email`, {email: newEmail}, {
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
        console.log("[ERROR] post /api/auth/ft/email for 2FA")
        console.log(err)
    });
  }, [newEmail, ]);

  if (!show) {
    return null;
    }
    return(
  <Modal show={show} onCloseModal={onClose2FAModal}>
  <form onSubmit={onSubmitEmail}>
    <Stack spacing={1}>
      <h1>2FA 설정</h1>
      <TextField
        id="Edit_email"
        label="인증 받을 email 주소"
        size='small'
        type='email'
        value={newEmail}
        onChange={onChangeNewEmail}
        required={true}
        />
        <Button type="submit" variant='outlined'>인증 메일 설정하기</Button>
    </Stack>
  </form>
  </Modal>
  );
};
export default Edit2FAModal;
