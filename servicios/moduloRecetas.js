import axios from 'axios';

export const getRecetasByFicha = async (ID_FICHA) => {
  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/receta/allByReceta/${ID_FICHA}`,
      {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY
        }
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}


export const createRecetaByFicha = async (receta) => {

  try {
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/receta/createByReceta`, receta,
      {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY
        }
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const deleteRecetaByFicha = async (ID_RECETA) => {
  try {
    const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/receta/deleteByFicha/${ID_RECETA}`,
      {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY
        }
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}