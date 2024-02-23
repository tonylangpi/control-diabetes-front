import axios from 'axios';

export const getTipoDiabetess = async () => {
  try {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tiposdiabetes/all`,{
      headers:{
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      }
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const createTipoDiabetes = async (tipodiabetes) => {
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tiposdiabetes/create`, tipodiabetes,{
             headers:{
               apiKey: process.env.NEXT_PUBLIC_API_KEY
             }
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getTipoDiabetesById = async (id) => {
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tiposdiabetes/TipoDiabetesById/${id}`,{
              headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
              }
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const updateTipoDiabetes = async (id, tipodiabetes) => {
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tiposdiabetes/update/${id}`, tipodiabetes,{
              headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
              }
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}

