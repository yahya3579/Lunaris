import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';
const API_URL = `${API_BASE_URL}/api/v1/property`;



// Fetch single property by ID
export const fetchPropertyById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const fetchProperties = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};



export const addProperty = async (property) => {
  let dataToSend = property;
  let config = {};
  // Get token from localStorage
  const token = localStorage.getItem('token');
  config.headers = config.headers || {};
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  if (property instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  config.withCredentials = true;
  const res = await axios.post(API_URL, dataToSend, config);
  return res.data;
};


export const editProperty = async (id, property) => {
  let dataToSend = property;
  let config = {};
  // Get token from localStorage
  const token = localStorage.getItem('token');
  config.headers = config.headers || {};
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  // If property is FormData, send as multipart
  if (property instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
    config.withCredentials = true;
    const res = await axios.patch(`${API_URL}/${id}`, property, config);
    return res.data;
  } else {
    // No new images: send images array as JSON string
    if (property.images && Array.isArray(property.images)) {
      dataToSend = { ...property, images: property.images };
      config.headers['Content-Type'] = 'application/json';
    }
    config.withCredentials = true;
    const res = await axios.patch(`${API_URL}/${id}`, dataToSend, config);
    return res.data;
  }
};


export const deleteProperty = async (id) => {
  const token = localStorage.getItem('token');
  const config = {
    withCredentials: true,
    headers: {}
  };
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await axios.delete(`${API_URL}/${id}`, config);
  return res.data;
};


export const updatePropertyImages = async (id, imagesData) => {
  const res = await axios.patch(`${API_URL}/update-images/${id}`, imagesData, { withCredentials: true });
  return res.data;
};
