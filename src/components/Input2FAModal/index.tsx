import React, { FC, PropsWithChildren, useCallback, useState, useRef } from 'react';
import Modal from "src/components/Modal"
import { Stack } from '@mui/system';
import { TextField, Button } from '@mui/material';
import useInput from "src/hooks/useInput"
import axios from 'axios';
import { Redirect } from 'react-router';
import { mutate } from 'swr';

interface Props {
  show: boolean;
  onClose2FAModal: () => void;
  setShow2FAModal : (flag:boolean) => void
}

const Input2FAModal: FC<PropsWithChildren<Props>> = ({ show, children, onClose2FAModal, setShow2FAModal }) => {

  const [code, onChangeCode, setCode] = useInput('');
  const [isDone2FA, setIsDone2FA] = useState(false);
  const [returnURL, setReturnURL] = useState("");
  //const onSubmit2FAcode = useCallback((e:any) => {
  const onSubmit2FAcode = useCallback((e:any) => {
    /**
     * code는 잘 들어가고 있음
     * 왜 axios 가운데에서는
     *  - alert이나
     *  - location.herf도 안됨.
     * form submit안에서 리다이렉션 일어나는거 같아서 지웠는데 이것도 아님
     * e.preventDefault가 영향을 주는 것도 아님 - on/off 해도 안됨
     *
     *    */
    console.log("code: ", code);
    console.log("onSubmit2FAcode called!!");
    //e.preventDefault();
    alert("onSubmit2FAcode ale");
    axios
      .post(process.env.REACT_APP_API_URL + `/api/auth/ft/email`, {code: code}, {
        withCredentials:true,
          headers:{
            authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
            accept: "*/*"
            }
      })
      .then((response) =>{
        //location.href = "/";
        setReturnURL('/');

        //alert("then response");
        //console.log(response.status);
        //if (response.status == 200)
        //{
          //alert("response 200!");
          //console.log("response 200!");
          //window.location.href = "https://server.gilee.click/api/auth/ft/redirect";
          //location.href=(`https://server.gilee.click/api/auth/ft/redirect`);
          //alert("location.href=(`https://server.gilee.click/api/auth/ft/redirect`)");
          //setReturnURL('/');
          //alert("setReturnURL(`https://server.gilee.click/api/auth/ft/redirect`)");
        //}
        //else
        //{
        //  alert("no! something wrong!");
        //  console.log("no! something wrong!");
        //}
      })
      .catch((err) => {
        setReturnURL('/');
        alert("then response");
        console.log("[ERROR] post /api/auth/ft/email for 2FA")
        console.log(err)
    });
  }, [code,setReturnURL ]);

  if (returnURL)
  {
    // location.href = "/";
    return (<Redirect to = {returnURL}/>)
  }
  if (!show) {
      return null;
    }
  return(
  <Modal show={show}>
  <form onSubmit={onSubmit2FAcode}>
    <Stack spacing={1}>
      <h1>인증 코드 입력</h1>
      <TextField
        id="2FA_input"
        label="인증 코드 입력"
        size='small'
        type='text'
        value={code}
        onChange={onChangeCode}
        required={true}
        //inputProps={{ maxLength: }}
        helperText='email로 받은 인증코드를 입력해주세요.'
        />
    </Stack>
  </form>
      <Button type="submit" variant='outlined'>인증 보내기</Button>
      <Button variant='outlined' onClick={onSubmit2FAcode}>인증 보내기2</Button>
  </Modal>
  );
};
export default Input2FAModal;
