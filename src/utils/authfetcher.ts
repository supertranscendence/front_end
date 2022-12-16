import axios from 'axios'
import { report } from 'process';

var deleteCookie = function(name:string){
	document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
  }
  
 const authfetcher = (url:string) => {
	const returnArr:string[][] = [];
	console.log("fetcher data", localStorage.getItem(" refreshToken"));
	if (!localStorage.getItem(" refreshToken"))
	{
		if (document.cookie != ''){
			console.log ("authfetcher call", document.cookie);
			document.cookie.split(';').forEach((s)=>{returnArr.push(s.split("="))});
			// document.cookie = '';
			deleteCookie("refreshToken");
			deleteCookie("accessToken");
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
