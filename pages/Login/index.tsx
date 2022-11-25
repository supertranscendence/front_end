import useInput from '@hooks/useInput';
import { Button, Error, Form, Header, Input, Label, LinkContainer } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import authfetcher from '@utils/authfetcher';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';
import React, { useCallback, useState } from 'react';

const LogIn = () => {
//   const { data: userData, error, mutate } = useSWR('/api/users', fetcher);
	const {data, error, mutate}  = useSWR('/api/users/login',fetcher,{
		dedupingInterval:100000
		});

	//const  {data:data1, error:error1, mutate:mutate1} = useSWR('/auth/api/auth/ft/redirect',fetcher,{
	//	dedupingInterval:100000
	//	});
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e:any) => {
      e.preventDefault();
      setLogInError(false);
      axios
        .post(
          //'/api/auth/ft/redirect',
          '/api/users/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then((response) => {
            console.log(response);
            mutate(response.data, false);
          })
          .catch((error) => {
          console.log("🛑 Axios POST Error");
          setLogInError(error.response?.data?.code === 401);
        });
    },
    [email, password, mutate],
  );
  if (data){
    console.log("dataaaaa",data);
    localStorage.setItem("access", data.email);
    return <Redirect to="/workspace/sleact/intro"/>
  }
  //   console.log(error, userData);
  //   if (!error && userData) {
    //     console.log('로그인됨', userData);
    //     return <Redirect to="/workspace/sleact/channel/일반" />;
    //   }
    const handleLogin = () => {
      //event?.preventDefault();
      location.href =
      '/api/users/login';
        //'http://3.39.238.148/api/auth/ft/redirect?code=60741852a1517eed6d1cdaf0990e89f7ccd022b0e60a9d42ba13f2024fa145cc';
    };

  return (
    <div id="container">
      <Header>Jiiranscendence</Header>
      {/*<Form onSubmit={onSubmit}>*/}
      <Form>
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
        <Button onClick={handleLogin}>아집</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
