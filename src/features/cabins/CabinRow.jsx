import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";

import { toast } from "react-hot-toast";

import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

import { AiOutlineDash } from "react-icons/ai";
import useDeleteCabin from "../../hooks/useDeleteCabin";


const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1fr 1.6fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);

  text-align: center;

  & .icon
  {
    margin : 0px auto;

  }
`;

const CabinRowButton = styled.button`
  background-color: var(--color-brand-600);
  padding: 10px 20px;
  color: wheat;

  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.8rem;
`;


// in onSuccess we tell what has to happen after a successful mutation

const CabinRow = ({ cabin }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  // const queryClient = useQueryClient();

  // const { isLoading: isDeleting, mutate } = useMutation({
  //   mutationFn: deleteCabin,
  //   onSuccess: () => {
  //     toast("Cabin has been deleted successfully");

  //     queryClient.invalidateQueries({
  //       queryKey: ["cabin"],
  //     });
  //   },

  //   onError: (err) => {
  //     window.alert(" An error occured while deleting the cabin");
  //   },
  // });

  const {isDeleting,mutate} = useDeleteCabin()

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  return (
    <>
      <TableRow>
        <Img src={image} />

        <Cabin>{name}</Cabin>

        <div>Fits up to {maxCapacity} guests</div>

        <Price>{formatCurrency(regularPrice)}</Price>

        <Discount>{(discount>0)?formatCurrency(discount):(<AiOutlineDash className="icon" size = {24}/>)}</Discount>

        <ButtonContainer>
          <CabinRowButton
            onClick={() => {
              setShowEditForm((prev) => !prev);
            }}
          >
            Edit
          </CabinRowButton>

          <CabinRowButton
            onClick={() => {
              mutate(cabinId);
            }}
          >
            Delete
          </CabinRowButton>
        </ButtonContainer>
      </TableRow>

      {showEditForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
};

export default CabinRow;
