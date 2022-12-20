import React, { FC, PropsWithChildren, useCallback, useState, useRef } from 'react';
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

const Edit2FAModal: FC<PropsWithChildren<Props>> = ({ show, children, setShow2FAModal }) => {

  const { data:myUserData } = useSWR<dataUser>(process.env.REACT_APP_API_URL + '/api/users/my', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const [newEmail, onChangeNewEmail, setNewEmail] = useInput('');
  const [checked, setChecked] = useState(myUserData?.tf);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    //setChecked(e.target.checked);
    console.log("myUserData?.tf: ",myUserData?.tf);
    console.log("2FA Checked(e.target): ", event.target.checked);
    console.log("2FA Checked(checked): ",  checked);
  };

  //const onSubmitEmail = useCallback((e:any) => {
  const onSubmitEmail = useCallback((event: any) => {
    console.log("onSubmitEmail called!!")
    console.log("newEmail: ",newEmail);
    console.log("2FA Checked Box(e.target): ", event.target.checked);
    setChecked(event.target.checked);
    axios
      .post(process.env.REACT_APP_API_URL + `/api/users/email`, {tf: checked, email: newEmail}, {
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
        console.log("[ERROR] post /api/users/email for 2FA")
        console.log(err)
    });
  }, [newEmail, checked ]);

  if (!show) {
    return null;
    }
    return(
  //<Modal show={show} onCloseModal={onClose2FAModal}>
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
        <Button type="submit" variant='outlined'>인증 메일 설정하기</Button>
    </Stack>
  </form>
  </Modal>
  );
};
export default Edit2FAModal;
