import axios from 'axios';

export const getAzucar = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/nivel_azucar/all`, {
      headers: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      }
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}