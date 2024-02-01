import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { createTicket, updateTicket } from '../../data/serviceTicketsData';



const initialState = {
  employeeId: '',
  customerId: '',
  description: '',
  emergency: false,
  dateCompleted: '',
};
export default function TicketForm({ obj }) {
 const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateTicket(formInput).then(() => router.push(`/tickets/${obj.id}`));
    } else {
      const payload = { ...formInput, volunteerId: user.uid };
      createTicket(payload).then(({ name }) => {
        const patchPayload = { id: name };
        updateTicket(patchPayload).then(() => {
          router.push('/tickets');
        });
      });
    }
  };

  return (
  <Form onSubmit={handleSubmit}>
      <h3>Submit a Ticket</h3>;


      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          aria-label="Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Customer</Form.Label>
        <Form.Select
          aria-label="Customer"
          name="customerId"
          onChange={handleChange}
          className="mb-3"
          value={formInput.customerId}
          required
        >
          <option value="">Select a Customer</option>
          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.name}
            </option>
          ))}
        </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Label>Employee</Form.Label>
        <Form.Select
          aria-label="Employee"
          name="employeeId"
          onChange={handleChange}
          className="mb-3"
          value={formInput.employeeId}
          required
        >
          <option value="">Select an Employee</option>
          {employees.map((employee) => (
            <option
              key={employee.id}
              value={employee.id}
            >
              {employee.name}
            </option>
          ))}
        </Form.Select>
        </Form.Group>
        <Form.Check
        className="text-white mb-3"
        type="switch"
        id="emergency"
        name="emergency"
        label="emergency"
        aria-label="Emergency"
        checked={formInput.emergency}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            emergency: e.target.checked,
          }));
        } } />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Add'} Service Ticket </Button>
    </Form>
  );
}

TicketForm.propTypes = {
  obj: PropTypes.shape({
    customerId: PropTypes.string,
    employeeId: PropTypes.string,
    emergency: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.string,
  }),
};





  
 
