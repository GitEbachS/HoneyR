import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { getCustomers } from "../../data/customerData";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Address</th>
         
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customers.map((t) => (
          <tr key={`customers-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.name}</td>
            <td>{t.address}</td>
            <td>
              <Link to={`${t.id}`}>Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
