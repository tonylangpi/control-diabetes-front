import axios from 'axios';

export const getMedicamentoss = async () => {
  try {
    const {data} = await axios.get('http://localhost:3000/api/medicamento');
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const createMedicamentos = async (medicamentos) => {
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/medicamento/create`, medicamentos,{
             headers:{
               apiKey: process.env.NEXT_PUBLIC_API_KEY
             }
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getMedicamentosById = async (id) => {
    try {
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/medicamento/MedicamentoById/${id}`,{
              headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
              }
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const updateMedicamentos = async (id, medicamentos) => {
    try {
        const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/medicamento/update/${id}`, medicamentos,{
              headers:{
                apiKey: process.env.NEXT_PUBLIC_API_KEY
              }
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}
