import useInput from '@hooks/useInput';
import { Button } from '@mui/material';
import { Error, Form, Header, Input, Label, LinkContainer } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import React, { useCallback, useState, useEffect } from 'react';
import { Stack } from '@mui/system';

const LogIn = () => {
//   const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
	//const {data, error, mutate}  = useSWR('http://localhost:3095/api/users',fetcher,{
	//	dedupingInterval:100000
	//	});
  //const [logInError, setLogInError] = useState(false);
  //const [email, onChangeEmail] = useInput('');
  //const [password, onChangePassword] = useInput('');
  //const onSubmit = useCallback(
  //  (e:any) => {
  //    e.preventDefault();
  //    setLogInError(false);
  //    axios
  //      .post(
  //        'http://localhost:3095/api/users/login',
  //        { email, password },
  //        {
  //          withCredentials: true,
  //        },
  //      )
  //      .then((response) => {
  //          mutate(response.data, false);
  //      })
  //      .catch((error) => {
  //        setLogInError(error.response?.data?.code === 401);
  //      });
  //  },
  //  [email, password, mutate],
  //);
  //if (data){
  //  console.log("dataaaaa",data);
  //  localStorage.setItem("access", data.email);
  //  return <Redirect to="/workspace/sleact/intro"/>
  //}
  //   console.log(error, userData);
  //   if (!error && userData) {
    //     console.log('로그인됨', userData);
    //     return <Redirect to="/workspace/sleact/channel/일반" />;
    //   }
  const getLoginCode = () => {
    return new URLSearchParams(location.search).get('code');
  }
  const handleLogin = async() => {
    //axios
    //.get('/api/auth/ft/redirect')
    //.get('http://localhost:3000/api/auth/ft/redirect')
    //.then(response => {
    //  console.log(response);
    //})
    //.catch(error => {
    //  console.log(error);
    //});
    //location.href = 'http://localhost:3000/api/auth/ft/redirect'
    location.href = 'http://3.39.238.148/api/auth/ft/redirect'
  };

  useEffect(() => {
    let code = getLoginCode();
    console.log("Code=");
    console.log(code);
    code &&
      axios
        .get(`http://localhost:3001/login/?code=${code}`)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
  }, []);

  return (
    <div id="container">
      <Header>Jiiranscendence</Header>
      <Stack spacing={2}>
        <Button onClick={handleLogin} variant="contained">42 Login</Button>

      </Stack>
      {/*<Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>*/}
    </div>
  );
};

export default LogIn;
