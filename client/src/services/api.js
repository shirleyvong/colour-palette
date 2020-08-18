import axios from 'axios';

const generatePalette = async (imageFile) => {
  const formData = new FormData();
  formData.append('file', imageFile);

  const { data } = await axios.post('/api/palettes/generate',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  return data;
};

const savePalette = async (imageFile, colours, authToken) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('colours', JSON.stringify(colours));

  const { data } = await axios.post('/api/palettes',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`,
      },
    }
  );

  return data;
};

const deletePalette = async (id, authToken) => {
  const { data } = await axios.delete(`/api/palettes/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    }
  );

  return data;
};

const getPalette = async (id) => {
  const { data } = await axios.get(`/api/palettes/${id}`);
  return data;
};

const getAllPalettes = async () => {
  const { data } = await axios.get('/api/palettes');
  return data;
};

// const getPalettesByUserId = async (userID) => {
//   const { data } = await axios.get(`/api/palettes/users/${userID}`);
//   return data;
// }

const getPalettesByUsername = async (username) => {
  const { data } = await axios.get(`/api/palettes/users/${username}`);
  return data;
}

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
  generatePalette,
  savePalette,
  deletePalette,
  getPalette,
  // getPalettesByUserId,
  getPalettesByUsername,
  getAllPalettes,
  register,
  login,
  logout,
  getUserStatus,
};
