import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getSingleCustomer } from "../../data/customerData";



export default function CustomerDetails() {
  const { id } = useParams();

  const [customer, setCustomer] = useState({});

  useEffect(() => {
    getSingleCustomer(id).then(setCustomer);
  }, [id]);

  if (!customer) {
    return null;
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">Customer</th>
          <td>{customer?.name}</td>
        </tr>
        <tr>
          <th scope="row">Address</th>
          <td>{customer.address}</td>
        </tr>
      </tbody>
    </Table>
  );
}
