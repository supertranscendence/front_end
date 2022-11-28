import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import React, { useCallback, useState } from 'react';

const LogIn = () => {
//   const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
	const {data, error, mutate}  = useSWR('/api/users',fetcher,{
		dedupingInterval:100000
		});
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e:any) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          '/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
            mutate(response.data, false);
        })
        .catch((error) => {
          setLogInError(error.response?.data?.code === 401);
        });
    },
    [email, password, mutate],
  );
  if (data){
    console.log("dataaaaa",data);
    // localStorage.setItem("access", data.email);
    return <Redirect to="/workspace/sleact/intro"/>
  }
  //   console.log(error, userData);
  //   if (!error && userData) {
    //     console.log('로그인됨', userData);
    //     return <Redirect to="/workspace/sleact/channel/일반" />;
    //   }
    
  return (
    <div id="container">
      <Header>Jiiranscendence</Header>
      <Form onSubmit={onSubmit}>
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
        <button onClick= {()=>{
          window.location.href="http://127.0.0.1:3000/api/auth/ft/redirect"
        }}>로그인</button>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;