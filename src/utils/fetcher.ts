import axios from 'axios'
import { report } from 'process';

const fetcher = (url:string) =>
axios
.get( url,
{
  withCredentials:true,
  headers:{
    authorization: 'Bearer ' + localStorage.getItem("accessToken"),
    accept: "*/*"
  }
})
.then((response) => {
  if(response.status === 500)
    location.href = "/error";
  return response.data;
})
.catch((err) => {

});

export default fetcher;
