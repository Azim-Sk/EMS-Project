// src/Components/EmployeeComponent.js
import React, { useEffect, useState } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const{id} = useParams();

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const navigator = useNavigate();

  useEffect(() => {

    if(id){
      getEmployee(id).then((response) =>{
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

  // Handle form submission
  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    // Log the employee data to verify the structure
    const employee = { firstName, lastName, email };
    console.log('Employee data being sent:', employee);
  
    if (id) {
      updateEmployee(id, employee)
        .then((response) => {
          console.log('Employee updated successfully:', response.data);
          navigator('/employees');
        })
        .catch((error) => {
          console.error('Error updating employee:', error);
          if (error.response) {
            console.error('API error details:', error.response.data);
          }
        });
    } else {
      createEmployee(employee)
        .then(() => {
          navigator('/employees');
        })
        .catch((error) => {
          console.error('Error creating employee:', error);
        });
    }
  };
  
  // Form validation
  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!firstName.trim()) {
      errorsCopy.firstName = 'First name required';
      valid = false;
    } else {
      errorsCopy.firstName = '';
    }

    if (!lastName.trim()) {
      errorsCopy.lastName = 'Last name required';
      valid = false;
    } else {
      errorsCopy.lastName = '';
    }

    if (!email.trim()) {
      errorsCopy.email = 'Email required';
      valid = false;
    } else {
      errorsCopy.email = '';
    }

    setErrors(errorsCopy);
    return valid;
  };

  function pageTitle(){
    if(id){
      return <h2 className="text-center">Update Employee</h2>
    }else{
      return <h2 className="text-center">Add Employee</h2>
    }
  }

  return (
    <div className="container">
      <div className="card col-md-6 offset-md-3">
        {
          pageTitle()
        }
        <div className="card-body">
          <form onSubmit={saveOrUpdateEmployee}>
            <div className="form-group mb-2">
              <label className="form-label">First Name:</label>
              <input
                type="text"
                placeholder="Enter Employee First Name"
                name="firstName"
                value={firstName}
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <span className="text-danger">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group mb-2">
              <label className="form-label">Last Name:</label>
              <input
                type="text"
                placeholder="Enter Employee Last Name"
                name="lastName"
                value={lastName}
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <span className="text-danger">{errors.lastName}</span>
              )}
            </div>

            <div className="form-group mb-2">
              <label className="form-label">Email:</label>
              <input
                type="email"
                placeholder="Enter Employee Email"
                name="email"
                value={email}
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>

            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
