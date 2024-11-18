import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

import useCabins from "../../hooks/useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import React from "react";
import Empty from "../../ui/Empty";

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

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";

  //filtering
  const filteredCabins = React.useMemo(() => {
    return cabins?.filter((cabin) => {
      if (filterValue === "all") return true;

      if (filterValue === "no-discount") return cabin.discount === 0;

      if (filterValue === "with-discount") return cabin.discount > 0;
    });
  }, [cabins, filterValue]);

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resource="cabins" />;

  //sorting
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

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
        data={sortedCabins}
        render={(cabin) => {
          return <CabinRow cabin={cabin} key={cabin.id} />;
        }}
      ></Table.Body>
    </Table>
  );
};

export default CabinTable;
