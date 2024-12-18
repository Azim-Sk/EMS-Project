// src/Services/EmployeeService.js
import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8090/api/employees'; // API URL

export const listEmployees = () => {
  return axios.get(REST_API_BASE_URL)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching employees:', error);
      throw error; // Propagate the error to handle it properly in components
    });
};

export const createEmployee = (employee) => {
  return axios.post(REST_API_BASE_URL, employee)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error creating employee:', error);
      throw error; // Propagate the error
    });
};

export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId);

export const updateEmployee = (employeeId, employeeData) => {
    return axios.put(REST_API_BASE_URL + '/' + employeeId, employeeData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  export const deleteEmployee = (employeeId) => {
    return axios.delete(REST_API_BASE_URL + '/' + employeeId, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };