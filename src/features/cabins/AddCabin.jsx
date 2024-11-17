import CreateCabinForm from "./CreateCabinForm";

import Button from "../../ui/Button";

import { useState } from "react";
import Modal from "../../ui/Modal";

import { FaXmark } from "react-icons/fa6";




// const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <>
//       <Button
//         onClick={() => {
//           setIsOpenModal(!isOpenModal);
//         }}
//       >
//         Add Cabin
//       </Button>
//       {isOpenModal && (<Modal setIsOpenModal = {setIsOpenModal}>
//         <CreateCabinForm setIsOpenModal = {setIsOpenModal}/>
//         </Modal>)}
//     </>
//   );
// };

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open>
        <Button>Add new Cabin</Button>
      </Modal.Open>
      <Modal.Window close={<FaXmark />}>
        <CreateCabinForm />
      </Modal.Window>

    </Modal>
  );
};

export default AddCabin;


//We dont want the user of the modal component to keep track of whether the modal component should be displayed or not. We want to handle that in the modal component itself. So we will move the state to the modal component.
