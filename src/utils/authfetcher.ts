import axios from 'axios'
import { report } from 'process';

const authfetcher = (url:string) => {
	const returnArr:string[][] = [];
	// if ( typeof localStorage.getItem(" refreshToken") == string)
	// 	{
	// 		localStorage.setItem(" refreshToken", localStorage.getItem(" refreshToken"));
	// 	}
	if (!localStorage.getItem(" refreshToken"))
	{
		console.log ("authfetcher call", document.cookie);
		document.cookie.split(';').forEach((s)=>{returnArr.push(s.split("="))})	
		localStorage.setItem(returnArr[1][0],returnArr[1][1]);
		return returnArr[0][1];
	}
	else
		return ;
}


export default authfetcher;