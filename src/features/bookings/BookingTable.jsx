import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import Empty from "../../ui/Empty";
import useBookings from "./useBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";

function BookingTable() {
  const { isLoading, error, data } = useBookings();

  const [searchParams] = useSearchParams();

  const bookings = data?.data;

  if (isLoading) return <Spinner />;

  if (!bookings?.length) return <Empty resource="bookings" />;

  const filterStatus = searchParams.get("status");

  const sortBy = searchParams.get("sortBy");

  let filteredBookings = bookings;

  if (filterStatus) {
    filteredBookings = filteredBookings.filter((booking) => {
      return booking.status === filterStatus || filterStatus === "all";
    });
  }

  if (sortBy) {
    const [key, direction] = sortBy.split("-");

    filteredBookings = filteredBookings.sort((a, b) => {

       if(typeof a[key] === 'string') {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
       }      
       else
       {
          return direction === "asc" ? a[key] - b[key] : b[key] - a[key];

       }

    });
  }

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
