import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`, options);
    const { data } = response;
    return data;
  } catch (error) {
    console.error('Error status:', error.response ? error.response.status : 'Unknown');
    console.error('Response headers:', error.response ? error.response.headers : 'Unknown');
    throw error;
  }
};
