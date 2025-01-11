import { DolarCCLService } from "../services/dolarCCLService";
export const DolarCCLUtils = {
  getDollarValue: async (fecha, tipo) => {
    try {
      console.log("get dolar value funcion la fecha es", fecha);
      const data = await DolarCCLService.fetchData(fecha);
      console.log("CACA");
      console.log(data);
      // Recalcular el ccl con la nueva cotización
      const cclValue = tipo === "compra" ? data?.compra : data?.venta;
      return cclValue.toFixed(2);
    } catch (err) {
      console.log("Failed to fetch data", err);
    }
  },
};
