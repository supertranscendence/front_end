import axios from 'axios'
import { report } from 'process';

const fetcher = (url:string) => axios.get(url,{
	withCredentials:true,
}).then((response) => response.data);

export default fetcher;