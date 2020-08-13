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
const savePalette = async (colours) => {
  const { data } = await axios.post('/api/palettes', colours);
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
};

export default {
  createPalette,
  savePalette,
  deletePalette,
  getPalette,
  getPalettes,
};
