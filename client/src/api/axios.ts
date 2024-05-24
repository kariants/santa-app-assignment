import axios from "axios";

const BASE_URL = 'http://localhost:5000/api'

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

