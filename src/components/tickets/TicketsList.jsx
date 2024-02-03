import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { completeToday, deleteTicket, getServiceTickets } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";




export default function TicketsList() {
  const [tickets, setTickets] = useState([]);


  const completeTicket = (id) => {
    completeToday(id);
  };
  const deleteThisTicket = (id) => {
    if (window.confirm('Do you want to delete this ticket?')) {
      deleteTicket(id);
    }
  };
  useEffect(() => {
    getServiceTickets().then(setTickets);
  }, [tickets]);

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Description</th>
          <th>Emergency?</th>
          <th>Date Completed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={`ticket-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.description}</td>
            <td>{t.emergency ? "yes" : "no"}</td>
            <td>{t.dateCompleted?.split("T")[0] || "Incomplete"}</td>
            <td>
              <Link to={`${t.id}`}>Details</Link>
            </td>
            <td>
            <Button variant="outline-warning" onClick={() => deleteThisTicket(t.id)} className="m-2">
          DELETE
        </Button>
        {t.employeeId && !t.dateCompleted ? 
        <Button variant="outline-success" onClick={() => completeTicket(t.id)} className="m-2">
          COMPLETE
        </Button> : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
