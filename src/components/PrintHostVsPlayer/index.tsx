import React, { FC, useState,PropsWithChildren } from "react";
import { Avatar, Stack } from "@mui/material";
import gravatar from 'gravatar';
import { IUser } from "src/typings/db";
import fetcher from 'src/utils/fetcher';
import useSWR from "swr";


interface Props {
	userNameA:string;
	userNameB:string;
  }
  
const PrintHostVsPlayer :FC<PropsWithChildren<Props>> = ({userNameA,userNameB}) => {
	//const { data: member } = useSWR<IUser>('api/users', fetcher, {
    //	dedupingInterval: 2000, // 2초
  	//});
	return(
		<Stack direction="row" justifyContent="space-between">
			<div>
				<Avatar/>
				<b>{userNameA}</b>
			</div>
			<h3> VS </h3>
			<div>
				<Avatar/>
				{/*<b>{member?.nickname}</b>*/}
				<b>{userNameB}</b>
			</div>
		</Stack>
	);
};

export default PrintHostVsPlayer;
