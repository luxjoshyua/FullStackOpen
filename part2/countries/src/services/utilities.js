import axios from 'axios';

const baseAPI = `https://restcountries.com/v3.1/all`;

const getAll = () => {
  const request = axios.get(baseAPI);
  return request.then((response) => response.data);
};

const countryService = {
  getAll,
};

export { countryService };
