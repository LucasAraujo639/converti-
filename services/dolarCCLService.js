import axios from "axios";

export const DolarCCLService = {
  fetchData: async (date) => {
    try {
      console.log("servicio fecha", date);
      console.log(typeof date);

      // Dividir la fecha en partes (día, mes y año)
      const [dia, mes, anio] = date.split("-");

      // Mostrar los resultados
      console.log(dia, mes, anio); // "10", "01", "2023"

      const url = `https://api.argentinadatos.com/v1/cotizaciones/dolares/contadoconliqui/${anio}/${mes}/${dia}`;
      const response = await axios.get(url);
      console.log(response.data);
      const { compra, venta } = response.data; // Extraer compra y venta de la respuesta
      return { compra, venta };
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      throw error; // Lanza el error para manejarlo donde se llame a la función
    }
  },
};
