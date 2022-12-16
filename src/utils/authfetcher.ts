import axios from 'axios'
import { report } from 'process';

var deleteCookie = function(name:string){
	document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
  }
  const allDelCookies = (domain?:any, path?:any) => {
    // const doc = document;
    domain = domain || document.domain;
    path = path || '/';
  
    const cookies = document.cookie.split('; '); // 배열로 반환
    console.log(cookies);
    const expiration = 'Sat, 01 Jan 1972 00:00:00 GMT';
  
    // 반목문 순회하면서 쿠키 전체 삭제
    if (!document.cookie) {
      console.log('삭제할 쿠키가 없습니다.');
    } else {
      for (let i:any = 0; i < cookies.length; i++) {
        // const uname = cookies[i].split('=')[0];
        // document.cookie = `${uname}=; expires=${expiration}`;
        document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration;
        // document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration + '; domain =' + domain;
      }
      console.log('쿠키 전부 삭제완료!![',document.cookie,"]");
    }
  };
  
 const authfetcher = (url:string) => {
	const returnArr:string[][] = [];
	console.log("fetcher data", localStorage.getItem(" refreshToken"));
	if (!localStorage.getItem(" refreshToken"))
	{
		if (document.cookie != ''){
			console.log ("authfetcher call", document.cookie);
			document.cookie.split(';').forEach((s)=>{returnArr.push(s.split("="))});
			// document.cookie = '';
			// deleteCookie("refreshToken");
			// deleteCookie("accessToken");
			allDelCookies();
			localStorage.setItem(returnArr[1][0],returnArr[1][1]);
			localStorage.setItem(returnArr[0][0],returnArr[0][1]);
			return returnArr[0][1];
		}
		else{
			console.log("fetcher end", localStorage.getItem(" refreshToken"));
			return null;
		}
	}
	else{
		axios.get("https://server.gilee.click/api/auth/ft/refresh", {
		withCredentials:true,
			headers:{
			authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
			accept: "*/*"
			}
		}).then((response) =>{ 
			console.log(response);
			console.log("data",response.data);
			localStorage.setItem("accessToken",response.data.act);
			})
		.catch((err) => console.log(err));
	}
}


export default authfetcher;
