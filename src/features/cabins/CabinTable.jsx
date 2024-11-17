import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

import useCabins from "../../hooks/useCabins";
import Table from "../../ui/Table";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1fr 1.6fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

// the query key uniquely indentifies the data that we are going to query

//querFn is the actual function responsible for fetching the data from the api

const CabinTable = () => {
  const { isLoading, error, data: cabins } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    <Table columns="2fr 2fr 2fr 1.6fr 2fr 2fr">
      <Table.Header>
        <div></div>

        <div>Cabin</div>

        <div>Capacity</div>

        <div>Price</div>

        <div>Discount</div>

        <div></div>
      </Table.Header>

      <Table.Body
        data={cabins}
        render={(cabin) => {
          return <CabinRow cabin={cabin} key={cabin.id} />;
        }}
      ></Table.Body>
    </Table>
  );
};

export default CabinTable;
