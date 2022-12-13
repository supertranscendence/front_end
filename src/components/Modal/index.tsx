import { CreateModal, CloseModalButton } from 'src/components/Modal/style';
import React, { FC, PropsWithChildren, useCallback } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton } from '@mui/material';

interface Props {
  show: boolean;
  onCloseModal: () => void;
}

const Modal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal }) => {
  const stopPropagation = useCallback((e:any) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }
  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <IconButton aria-label="cancle" onClick={onCloseModal}
          sx={{position: 'absolute', right: '10px', top: '10px', border: 'none'}}><CancelIcon /></IconButton>
        {/*<CloseModalButton onClick={onCloseModal}></CloseModalButton>*/}
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
