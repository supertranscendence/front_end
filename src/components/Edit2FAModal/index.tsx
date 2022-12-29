import React, { FC, PropsWithChildren, useCallback, useState, useRef, useEffect } from 'react';
import Modal from "src/components/Modal"
import { Stack } from '@mui/system';
import { TextField, Button } from '@mui/material';
import useInput from "src/hooks/useInput"
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import useSWR from 'swr';
import fetcher from 'src/utils/fetcher';
import { dataUser } from '@typings/types';
interface Props {
  show: boolean;
  //onClose2FAModal: () => void;
  setShow2FAModal : (flag:boolean) => void
  }
//1. props로 myUserData를 넘겨준다!
//2. 아니 근데 SWR은 백엔드에서 변경된건지 어케암?
const Edit2FAModal: FC<PropsWithChildren<Props>> = ({ show, children, setShow2FAModal }) => {

  const [newEmail, onChangeNewEmail, setNewEmail] = useInput('');
  const [checked, setChecked] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    console.log("useeffect called");
    axios
    .get(process.env.REACT_APP_API_URL + '/api/users/my/', {
      withCredentials:true,
      headers:{
        authorization: 'Bearer ' + localStorage.getItem("accessToken"),
        accept: "*/*"
        }
    })
    .then((response)=>{
      if(response.status === 500)
        location.href = "/error";
      setChecked(response.data.tf);
    }).catch((err) => {
      console.log("[ERROR] post /api/users/email for 2FA")
      console.log(err)
      window.location.href = "/error";
  });
  }, []);

  const onSubmitEmail = useCallback((event: any) => {
    axios
      .post(process.env.REACT_APP_API_URL + `/api/users/email`, {tf: checked, email: newEmail}, {
      withCredentials:true,
        headers:{
          authorization: 'Bearer ' + localStorage.getItem("accessToken"),
          accept: "*/*"
          }
      })
      .then((response) =>{
        if(response.status === 500)
          location.href = "/error";
        setChecked(checked);
      })
      .catch((err) => {
        console.log("[ERROR] post /api/users/email for 2FA")
        console.log(err)
        window.location.href = "/error";
    });
  }, [newEmail, checked ]);

  if (!show) {
    return null;
    }
  return(
  <Modal show={show} >
  <form onSubmit={onSubmitEmail}>
    <Stack spacing={1}>
      <h1>2FA 설정</h1>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
        />
        <>설정 켜기</>
      <TextField
        id="Edit_email"
        label="인증 받을 email 주소"
        size='small'
        type='email'
        value={newEmail}
        onChange={onChangeNewEmail}
        required={true}
        disabled={!checked}
        helperText="설정하기 버튼을 눌러야 적용됩니다."
        />
        <Button type="submit" variant='outlined'>2차 인증 설정하기</Button>
    </Stack>
  </form>
  </Modal>
  );
};
export default Edit2FAModal;
