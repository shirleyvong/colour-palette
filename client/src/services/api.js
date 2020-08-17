import axios from 'axios';

const createPalette = async (formData) => {
  const { data } = await axios.post('/api/palettes/generate',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  return data;
};

// Colours must have hex values
const savePalette = async (formData) => {
  const { data } = await axios.post('/api/palettes',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  return data;
};

const deletePalette = async (id) => {
  const { data } = await axios.delete(`/api/palettes/${id}`);
  return data;
};

const getPalette = async (id) => {
  const { data } = await axios.get(`/api/palettes/${id}`);
  return data;
};

const getPalettes = async () => {
  const { data } = await axios.get('/api/palettes');
  return data;
};

const register = async (username, password) => {
  const { data } = await axios.post('/api/auth/register',
    {
      username,
      password
    }
  );
  return data;
};

const login = async (username, password) => {
  const { data } = await axios.post('/api/auth/login',
    {
      username,
      password
    }
  );
  return data;
};

const logout = async (authToken) => {
  const { data } = await axios.get('/api/auth/logout',
    { 
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
};

const getUserStatus = async (authToken) => {
  const { data } = await axios.get('/api/auth/status',
    { 
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );
  return data;
};

export default {
  createPalette,
  savePalette,
  deletePalette,
  getPalette,
  getPalettes,
  register,
  login,
  logout,
  getUserStatus,
};
