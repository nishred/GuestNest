import styled from "styled-components";

import { createPortal } from "react-dom";
import { cloneElement, useEffect, useState, useRef } from "react";

import { FaRegCircleXmark } from "react-icons/fa6";

import React from "react";
import useEditCabin from "../hooks/useEditCabin";

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
  const [openModal, setOpenModal] = useState("");

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens }) => {
  const { setOpenModal } = React.useContext(ModalContext);

  return cloneElement(children, {
    onClick: (e) => {
      e.stopPropagation();
      setOpenModal(opens);
    },
  });
};

const Window = ({ children, name }) => {
  const { openModal, setOpenModal } = React.useContext(ModalContext);

  const ref = useRef();

  if (openModal !== name) return null;

  return createPortal(
    <Overlay
      onClick={(e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setOpenModal("");
        }

        e.stopPropagation();
      }}
    >
      <StyledModal ref={ref}>
        {cloneElement(children, { setOpenModal })}
        <Button onClick={() => setOpenModal("")}>{<FaRegCircleXmark />}</Button>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

const Close = ({ children }) => {
  const { setOpenModal } = React.useContext(ModalContext);

  return <Button onClick={() => setOpenModal("")}>{children}</Button>;
};

Modal.Open = Open;

Modal.Window = Window;

Modal.Close = Close;

export default Modal;

//cloneElement lets you create a react element using another react element as a starting point.
