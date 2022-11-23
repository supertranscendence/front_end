import { CreateModal, CloseModalButton } from '@components/Modal/style';
import { IconButton } from '@mui/material';
import React, { FC, PropsWithChildren, useCallback } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { Stack } from '@mui/system';


interface Props {
  show: boolean;
  onCloseModal: () => void;
}

const MyModal: FC<PropsWithChildren<Props>> = ({ show, children, onCloseModal }) => {
  const stopPropagation = useCallback((e:any) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }
  return (
      <CreateModal onClick={onCloseModal}>
        <div onClick={stopPropagation}>
          <IconButton onClick={onCloseModal}>
            <CancelIcon />
          </IconButton>
          {children}
        </div>
    </CreateModal>
  );
};

export default MyModal;
