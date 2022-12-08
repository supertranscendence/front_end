import React, { FC, useState } from "react";
import { Avatar, Stack } from "@mui/material";
import gravatar from 'gravatar';
import { IUser } from "src/typings/db";
import fetcher from 'src/utils/fetcher';
import useSWR from "swr";

const PrintHostVsPlayer = () => {
	//const { data: member } = useSWR<IUser>('api/users', fetcher, {
    //	dedupingInterval: 2000, // 2초
  	//});
	return(
		<Stack direction="row" justifyContent="space-between">
			<div>
				<Avatar/>
				<b>jisokang</b>
			</div>
			<h3> VS </h3>
			<div>
				<Avatar/>
				{/*<b>{member?.nickname}</b>*/}
				<b>namename</b>
			</div>
		</Stack>
	);
};

export default PrintHostVsPlayer;
