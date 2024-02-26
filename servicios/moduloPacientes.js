import axios from 'axios';

export const getPatients = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/pacientes');
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const createPaciente = async (paciente) => {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pacientes/create`, paciente, {
      headers: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      }
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const getPacienteById = async (id) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/pacientes/pacienteById/${id}`, {
      headers: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      }
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const updatePaciente = async (id, paciente) => {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/pacientes/update/${id}`, paciente, {
      headers: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      }
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const changeStatusPaciente = async (id, estado) => {
  try {
    const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/pacientes/changeStatusPaciente/${id}`, { Estado: estado }, {
      headers: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      }
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}