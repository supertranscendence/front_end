import axios from 'axios'
import { report } from 'process';

const fetcher = (url:string) =>
axios
.get(url,{
	withCredentials:true,
	headers:{
        authorization: 'Bearer ' + localStorage.getItem(" refreshToken"),
        accept: "*/*"
        }
})
.then((response) => response.data);

export default fetcher;
