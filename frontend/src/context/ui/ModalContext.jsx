import { createContext, useContext, useReducer } from 'react';

const ModalContext = createContext();

const modalReducer = (state, action) => {
  switch(action.type) {
    case 'OPEN_MODAL':
      return {
        currentModal: action.modalType,
        modalProps: action.props || {}
      };
    case 'CLOSE_MODAL':
      return { currentModal: null, modalProps: {} };
    default:
      return state;
  }
};

export function ModalProvider({ children }) {
  const [state, dispatch] = useReducer(modalReducer, {
    currentModal: null,
    modalProps: {}
  });

  const openModal = (modalType, props = {}) => {
    dispatch({ type: 'OPEN_MODAL', modalType, props });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <ModalContext.Provider value={{ ...state, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if(!context) throw new Error('useModal must be used within ModalProvider');
  return context;
};