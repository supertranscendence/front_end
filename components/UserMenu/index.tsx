import * as React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { Route, Redirect, Link, useParams } from 'react-router-dom';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
	<Menu
		anchorEl={anchorEl}
		open={open}
		onClose={handleClose}
		MenuListProps={{
			'aria-labelledby': 'basic-button',
		}}
	>
		<MenuItem onClick={handleClose}>프로필 보기</MenuItem>
		<MenuItem onClick={handleClose}>DM 보내기</MenuItem>
		<MenuItem onClick={handleClose}>친구 추가/삭제</MenuItem>
		<MenuItem onClick={handleClose}>음소거하기</MenuItem>
	</Menu>
  );
}
