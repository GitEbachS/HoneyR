import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { createTicket, updateTicket } from '../../data/serviceTicketsData';
import { getEmployees } from '../../data/employeeData';
import { getCustomers } from '../../data/customerData';



const initialState = {
  employeeId: null,
  customerId: null,
  description: "",
  emergency: false,
};
export default function CreateTicket({ obj }) {
 const [customers, setCustomers] = useState([]);
 const [employees, setEmployees] = useState([]);
 const [formInput, setFormInput] = useState(initialState);



  useEffect(() => {
    getEmployees().then(setEmployees);
    getCustomers().then(setCustomers);
    if (obj.id) setFormInput(obj);
  }, [obj]);

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
      updateTicket(formInput);
    } else {
      const payload = formInput;
      createTicket(payload);
    }
  };

  return (
  <Form onSubmit={handleSubmit}>
      <h3>Submit a Ticket</h3>


      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Customer</Form.Label>
        <Form.Select
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
        className="mb-3"
        type="switch"
        id="emergency"
        name="emergency"
        label="Emergency?"
        checked={formInput.emergency}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            emergency: e.target.checked,
          }));
        } } />

      {/* SUBMIT BUTTON  */}
      <Button type="submit"> Add Ticket </Button>
    </Form>
  );
}

CreateTicket.propTypes = {
  obj: PropTypes.shape({
    customerId: PropTypes.number,
    employeeId: PropTypes.number,
    emergency: PropTypes.bool,
    description: PropTypes.string,
    DateCompleted: PropTypes.string,
    id: PropTypes.number,
  }),
};

CreateTicket.defaultProps = {
  obj: initialState,
};




  
 
