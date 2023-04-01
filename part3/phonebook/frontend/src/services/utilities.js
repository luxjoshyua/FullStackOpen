import axios from 'axios';

// for local
// const baseURL = `http://localhost:3001/persons`;
// for database
const baseURL = `/api/persons`;

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const handleDelete = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, newPerson) => {
  const request = axios.put(`${baseURL}/${id}`, newPerson);
  return request.then((response) => response.data);
};

export const formatString = (string) => {
  return string
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
};

const personService = {
  getAll,
  create,
  handleDelete,
  update,
};

export default personService;
