import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useEditCabin from "../hooks/useEditCabin";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const ref = useRef()

   useEffect(() => {

     if(openId)
     {

       function handleClickOutside(e)
       {
  
          if(ref.current && !ref.current.contains(e.target))
          {
            setOpenId('')
          }

       }


       document.addEventListener('click',handleClickOutside)

       return () => {

        document.removeEventListener('click',handleClickOutside)

       }


     }


   },[openId])


  return (
    <MenusContext.Provider value={{ openId, setOpenId, position, setPosition,ref }}>
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }) => {
  const { openId, setOpenId, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 8,
    });

    if (openId === id) setOpenId("");
    else setOpenId(id);

    e.stopPropagation();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ id, children}) => {
  const { openId, position,ref } = useContext(MenusContext);

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>{children}</StyledList>,
    document.body
  );
};

const Button = ({ children,icon,onClick }) => {


  return (
    <li onClick={onClick?onClick:null}>
      <StyledButton>
      <span>{children}</span>
      {icon}
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;

Menus.List = List;

Menus.Toggle = Toggle;

Menus.Button = Button;

export default Menus;
