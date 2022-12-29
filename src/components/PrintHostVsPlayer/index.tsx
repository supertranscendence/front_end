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
	return(
		<Stack direction="row" justifyContent="space-between">
			<div>
				<h1><b>{userNameA}</b></h1>
			</div>
			<h3> VS </h3>
			<div>
				<h1><b>{userNameB}</b></h1>
			</div>
		</Stack>
	);
};

export default PrintHostVsPlayer;
