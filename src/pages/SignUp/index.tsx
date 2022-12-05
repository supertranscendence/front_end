import { Button, Error, Form, Header, Input, Label, LinkContainer, Success } from 'src/pages/SignUp/styles';
import React, { useCallback, useState } from 'react';
import useInput from 'src/hooks/useInput';
import fetcher from 'src/utils/fetcher';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import useSWR from 'swr';

const SignUp = () => {
//   const { data: userData } = useSWR('/api/users', fetcher);
//   const [signUpError, setSignUpError] = useState(false);
//   const [signUpSuccess, setSignUpSuccess] = useState(false);
//   const [mismatchError, setMismatchError] = useState(false);
//   const [email, onChangeEmail] = useInput('');
//   const [nickname, onChangeNickname] = useInput('');
//   const [password, , setPassword] = useInput('');
//   const [passwordCheck, , setPasswordCheck] = useInput('');

const {data, error, mutate}  = useSWR('api/users',fetcher);
const[email, onChangeEmail, setEmail] = useInput('');
const[nickname, onChangeNickname, setNickname] = useInput('');
const[password, setPassword] = useState('');
const[passwordCheck, setPasswordCheck] = useState('');
const[mismatchError, setMismatchError] = useState(false);
const[signUpError, setsignUpError] = useState('');
const[signUpSuccess, setSignUpSuccess] = useState(false);

const onSubmit = useCallback( (e:any)=>{
	e.preventDefault();
	// console.log(email,nickname,password,passwordCheck, missmatchError);
	if (mismatchError && nickname)
	{
		console.log("서버로 숑",email,nickname,password,passwordCheck, mismatchError);
		// axios.post("api/users",{
		setsignUpError('');
		setSignUpSuccess(false);
		axios.post("api/users",{
			email,
			nickname,
			password
		})
		.then((response)=>{
			console.log(response);
			setSignUpSuccess(true);
		})
		.catch((error)=>{
			console.log(error.response);
			setsignUpError(error.response.data);
		})
		.finally(()=>{})
		;
	}
}, [email,nickname,password,passwordCheck, mismatchError]);

// const onChangeEmail = useCallback( (e)=>{
// 	setEmail(e.target.value)
// }, []);

// const onChangeNickname = useCallback( (e)=>{
// 	setNickname(e.target.value);
// }, []);

const onChangePassword = useCallback(
    (e:any) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value === passwordCheck);
},[passwordCheck]);

const onChangePasswordCheck = useCallback(
    (e:any) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value === password);
},[password]);

if (data === undefined){
	return <div>로딩중!</div>
}
if (data){
	return <Redirect to="/workspace/sleact/channel/일반"/>
}


//   const onSubmit = useCallback(
//     (e) => {
//       e.preventDefault();
//       if (!nickname || !nickname.trim()) {
//         return;
//       }
//       if (!mismatchError) {
//         setSignUpError(false);
//         setSignUpSuccess(false);
//         axios
//           .post('/api/users', { email, nickname, password })
//           .then(() => {
//             setSignUpSuccess(true);
//           })
//           .catch((error) => {
//             console.log(error.response?.data);
//             setSignUpError(error.response?.data?.code === 403);
//           });
//       }
//     },
//     [email, nickname, password, mismatchError],
//   );

//   if (userData) {
//     return <Redirect to="/workspace/sleact" />;
//   }

  return (
    <div id="container">
      <Header>쓸모없는 회원가입 페이지</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {!mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {!nickname && <Error>닉네임을 입력해주세요.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;