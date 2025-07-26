// client/src/context/types/ModalTypes.ts

export type ModalType = 
  | 'login'
  | 'register'
  | 'sizeGuide'
  | 'payment'
  | 'address'
  | 'custom';

export type ModalProps<T = unknown> = {
  [key: string]: any;
  onClose?: () => void;
  onConfirm?: (result?: T) => void;
};

export type ModalContextType = {
  currentModal: ModalType | null;
  modalProps: ModalProps;
  openModal: <T = unknown>(
    type: ModalType,
    props?: ModalProps<T>
  ) => Promise<T | undefined>;
  closeModal: () => void;
};