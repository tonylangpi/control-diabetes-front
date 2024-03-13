import axios from 'axios';

export const createUsuarios = async (usuarioInfo) => {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/create`, usuarioInfo, {
      headers: {
        apiKey: process.env.NEXT_PUBLIC_API_KEY
      }
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const changeStatusUsuario = async (id, estado) => {
    try {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/inactivateUser/${id}`, { Estado: estado }, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY
        }
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
 export const usuarioByID = async (idUsuario) => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/usuarioById/${idUsuario}`, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY
        }
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  export const updateUser = async (id, datos) => {
    try {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/updateUser/${id}`, datos, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY
        }
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }

 export const updatePassword = async (id, datos) => {
    try {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/updatePassword/${id}`, datos, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY
        }
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  }