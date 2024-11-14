import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { fetchCabins } from "../services/apiCabins";

function Cabins() {

   
  const [cabin,setCabin] = useState(null)


  useEffect(() => {

     fetchCabins().then((data) => {
      setCabin(data[0])
     }) 

  })


 if(!cabin)
  return null

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
 
      <img src={cabin.image} />

    </Row>
  );
}

export default Cabins;
