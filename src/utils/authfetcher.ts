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
			localStorage.setItem(returnArr[1][0],returnArr[1][1]);
			// document.cookie = '';
			deleteCookie(" refreshToken");
			deleteCookie("accessToken");
			return returnArr[0][1];
		}
		else{
			console.log("fetcher end", localStorage.getItem(" refreshToken"));
			return null;
		}
	}
	else{
		// console.log("fetcher end", localStorage.getItem(" refreshToken"));
		// return null;
	}
}


export default authfetcher;
