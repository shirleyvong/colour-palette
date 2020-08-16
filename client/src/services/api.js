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

export default {
  createPalette,
  savePalette,
  deletePalette,
  getPalette,
  getPalettes,
};
