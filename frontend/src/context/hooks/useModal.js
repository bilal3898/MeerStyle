import { useContext } from 'react';
import { ModalContext } from '../ui/ModalContext';

/**
 * useModal - Custom hook to consume modal context
 * @returns {{
 *   currentModal: string|null,
 *   modalProps: object,
 *   openModal: Function,
 *   closeModal: Function
 * }}
 */
export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('useModal called outside of ModalProvider');
    }
    throw new Error('useModal must be used within a ModalProvider');
  }

  return {
    currentModal: context.currentModal,
    modalProps: context.modalProps,
    openModal: context.openModal,
    closeModal: context.closeModal
  };
};
