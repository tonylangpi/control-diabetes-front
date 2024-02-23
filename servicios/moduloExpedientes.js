import axios from 'axios';

export const getExpedientesByPaciente = async (idPaciente) => {
  try {
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/expedientes/allByPaciente/${idPaciente}`,
    {
      headers:{
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      }
    }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}


export const createExpedienteByPaciente = async (datosExpediente) => {

  try {
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/expedientes/createByPaciente`,datosExpediente,
    {
      headers:{
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      }
    }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}