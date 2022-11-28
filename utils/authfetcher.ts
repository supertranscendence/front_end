import axios from 'axios'
import { report } from 'process';

const authfetcher = (url:string) => axios.get(url,{
	withCredentials:true,
	headers:{
		// "Access-Control-Allow-Origin": "http://localhost:3090",
		"Access-Control-Allow-Origin": "http://3.39.238.148",
		"Access-Control-Allow-Credentials": true,
		}
}).then((response) => response.data);

export default authfetcher;