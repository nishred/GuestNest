import styled from "styled-components";

import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";

import { toast } from "react-hot-toast";

import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

import { AiOutlineDash } from "react-icons/ai";
import useDeleteCabin from "../../hooks/useDeleteCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import Table from "../../ui/Table";

import useCreateCabin from "../../hooks/useCreateCabin";

import { FaRegCopy } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

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
  display: inline-block;
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

  & .icon {
    margin: 0px auto;
  }
`;

const CabinRowButton = styled.button`
  background-color: wheat;
  padding: 2px 4px;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
`;

// in onSuccess we tell what has to happen after a successful mutation

const CabinRow = ({ cabin }) => {
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

  const { isDeleting, mutate } = useDeleteCabin();

  const { isCreating, mutate: createMutate } = useCreateCabin();

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
      <Table.Row>
        <div>
          <Img src={image} />
        </div>

        <Cabin>{name}</Cabin>

        <div>Fits up to {maxCapacity} guests</div>

        <Price>{formatCurrency(regularPrice)}</Price>

        <Discount>
          {discount > 0 ? (
            formatCurrency(discount)
          ) : (
            <AiOutlineDash className="icon" size={24} />
          )}
        </Discount>

        <ButtonContainer>
          <CabinRowButton
            onClick={() => {
              createMutate({
                name: cabin.name,
                maxCapacity: cabin.maxCapacity,
                regularPrice: cabin.regularPrice,
                discount: cabin.discount,
                description: cabin.description,
                image: cabin.image,
              });
            }}
          >
            <FaRegCopy />
          </CabinRowButton>

          <Modal>
            <Modal.Open>
              <CabinRowButton>
                <MdEdit />
              </CabinRowButton>
            </Modal.Open>

            <Modal.Window>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>

          <Modal>
            <Modal.Open>
              <CabinRowButton>
                <FaTrashAlt />
              </CabinRowButton>
            </Modal.Open>

            <Modal.Window>
              <ConfirmDelete
                resourceName={cabin.name}
                disabled={isDeleting}
                onConfirm={() => {
                  mutate(cabinId);
                }}
              />
            </Modal.Window>
          </Modal>
        </ButtonContainer>
      </Table.Row>
    </>
  );
};

export default CabinRow;
