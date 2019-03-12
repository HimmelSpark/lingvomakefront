import axios from 'axios'

// axios.defaults.withCredentials(true);

export const HTTP = axios.create({
  baseURL: 'http://localhost:8090',
  headers: {
	'Access-Control-Allow-Origin': '*',
	'Content-Type': 'application/json',
  },
});

// HTTP.defaults.withCredentials(true);