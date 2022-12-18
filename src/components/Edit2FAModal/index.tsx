import React, { FC, PropsWithChildren, useCallback, useState, useRef } from 'react';
import Modal from "src/components/Modal"
import { Stack } from '@mui/system';
import { TextField, Button } from '@mui/material';
import useInput from "src/hooks/useInput"

interface Props {
	show: boolean;
	onClose2FAModal: () => void;
	setShow2FAModal : (flag:boolean) => void
  }

const Edit2FAModal: FC<PropsWithChildren<Props>> = ({ show, children, onClose2FAModal, setShow2FAModal }) => {
	if (!show) {
		return null;
	  }
	return(
	<Modal show={show} onCloseModal={onClose2FAModal}>
	<form>
		<Stack spacing={1}>
			<h1>2FA 설정</h1>
			<TextField
			  id="Edit_email"
              label="인증 받을 email 주소"
              size='small'
			  type='email'
              required={true}
			  />
			  <Button type="submit" variant='outlined'>인증 보내기</Button>
		</Stack>
	</form>
	</Modal>
	);
};
export default Edit2FAModal;
