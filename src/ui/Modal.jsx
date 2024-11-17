import styled from "styled-components";

import { createPortal } from "react-dom";
import { cloneElement, useEffect, useState } from "react";

import React from "react";
import useEditCabin from "../hooks/useEditCabin";
import useCloseModal from "../hooks/useCloseModal";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// const Modal = ({ children, setIsOpenModal }) => {
//   return createPortal(
//     <Overlay
//       onClick={() => {
//         setIsOpenModal(false);
//       }}
//     >
//       <StyledModal onClick={(e) => {

//         e.stopPropagation()

//       }}>
//         <Button onClick={() => setIsOpenModal(false)}>
//           <FaXmark />
//         </Button>
//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>,
//     document.body
//   );
// };

const ModalContext = React.createContext();

const Modal = ({ children }) => {

  const {ref,isModalOpen,setIsModalOpen} = useCloseModal()  

  return (
    <ModalContext.Provider value={{ ref,isModalOpen, setIsModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children }) => {
  const { setIsModalOpen } = React.useContext(ModalContext);

  return cloneElement(children, {
    onClick: (e) => {
      e.stopPropagation();
      setIsModalOpen(true);
    },
  });
};

const Window = ({ children, close }) => {
  const { isModalOpen, setIsModalOpen,ref } = React.useContext(ModalContext);

  if (!isModalOpen) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        {cloneElement(children, { setIsModalOpen : setIsModalOpen })}
        <Button onClick={() => setIsModalOpen(false)}>{close}</Button>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

const Close = ({ children }) => {
  const { setIsModalOpen } = React.useContext(ModalContext);

  return (
    <Button onClick={() => setIsModalOpen(false)}>{children} Manvitha</Button>
  );
};

Modal.Open = Open;

Modal.Window = Window;

Modal.Close = Close;

export default Modal;

//cloneElement lets you create a react element using another react element as a starting point.
