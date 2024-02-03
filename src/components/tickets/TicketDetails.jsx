import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { employeeToAssign, getSingleTicket } from "../../data/serviceTicketsData";
import { Button } from "react-bootstrap";



export default function TicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] = useState({});

  const assignEmp = () => {
    employeeToAssign(id);
  };

  useEffect(() => {
    getSingleTicket(id).then(setTicket);
  }, [ticket]);

  if (!ticket) {
    return null;
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">Customer</th>
          <td>{ticket.customer?.name}</td>
        </tr>
        <tr>
          <th scope="row">Description</th>
          <td>{ticket.description}</td>
        </tr>
        <tr>
          <th scope="row">Emergency</th>
          <td>{ticket.emergency ? "yes" : "no"}</td>
        </tr>
        <tr>
          <th scope="row">Employee</th>
          <td>{ticket.employee?.name || "Unassigned"}</td>
          {ticket.employeeId ? "" 
          :
          <td><Button variant="outline-success" onClick={assignEmp} className="m-2">
          ASSIGN
        </Button></td>}
        </tr>
        <tr>
          <th scope="row">Completed?</th>
          <td>{ticket.dateCompleted?.split("T")[0] || "Incomplete"}</td>
        </tr>
      </tbody>
    </Table>
  );
}
