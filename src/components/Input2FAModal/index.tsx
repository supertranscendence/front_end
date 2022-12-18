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

const Input2FAModal: FC<PropsWithChildren<Props>> = ({ show, children, onClose2FAModal, setShow2FAModal }) => {
	if (!show) {
		return null;
	  }
	return(
	<Modal show={show} onCloseModal={onClose2FAModal}>
	<form>
		<Stack spacing={1}>
			<h1>인증 코드 입력</h1>
			<TextField
			  id="2FA_input"
              label="인증 코드 입력"
              size='small'
			  type='text'
              required={true}
			  inputProps={{ maxLength: 4}}
			  helperText='email로 받은 인증코드를 입력해주세요.'
			  />
			  <Button type="submit" variant='outlined'>인증 보내기</Button>
		</Stack>
	</form>
	</Modal>
	);
};
export default Input2FAModal;
