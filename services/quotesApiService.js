import axios from "axios";

export const CedearsApiService = {
  //Api propia que scrapea los cedears de IOL
  getCedears: async () => {
    try {
      const BASE_URL = "http://192.168.30.142:8000/api/cotizaciones/cedears";

      console.log("Consultando cotizaciones de CEDEARs...");

      const response = await axios.get(BASE_URL);

      // Devuelve las cotizaciones directamente
      return response.data;
    } catch (error) {
      console.error("Error al obtener las cotizaciones de CEDEARs:", error);
      throw error; // Lanza el error para manejarlo donde se llame a la función
    }
  },
};
