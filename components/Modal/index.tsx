import { CreateModal, CloseModalButton } from '@components/Modal/style';
import React, { FC, PropsWithChildren, useCallback } from 'react';

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
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;