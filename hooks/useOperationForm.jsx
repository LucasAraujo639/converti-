import { useState, useEffect } from "react";
import { useOperations } from "../context/OperationsContext";
import { DolarCCLUtils } from "../utils/dolarCCLUtils";

export const useOperationForm = (id) => {
  const { addOperation, updateOperation, getOperationById } = useOperations();
  const [formData, setFormData] = useState({
    fecha: "",
    titulo: "",
    cantidad: "",
    tipo: "Compra", // Valor por defecto
    moneda: "ARS", // Valor por defecto
    cotizacion: "",
    ccl: "",
    precioTotal: "",
    precioTotalUSD: "",
  });
  const [dollarData, setDollarData] = useState(null);

  const tipoOptions = ["Compra", "Venta"];
  const monedaOptions = ["ARS", "USD"];

  useEffect(() => {
    if (id) {
      const operation = getOperationById(id);
      if (operation) setFormData(operation);
    }
  }, [id]);

  useEffect(() => {
    const fetchDollarValue = async () => {
      if (formData.fecha) {
        try {
          const DolarCclValue = await DolarCCLUtils.getDollarValue(
            formData.fecha,
            formData.tipo
          );
          setDollarData(DolarCclValue);
          setFormData((prevFormData) => ({
            ...prevFormData,
            ccl: DolarCclValue,
          }));
        } catch (error) {
          console.log("Error fetching dollar value:", error);
        }
      }
    };

    fetchDollarValue();
  }, [formData.fecha, formData.tipo]);

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => {
      let updatedValue = value;
      if (name === "titulo") {
        updatedValue = value.toUpperCase();
      }
      const updatedData = { ...prevFormData, [name]: updatedValue };
      return recalcularPrecios(updatedData);
    });
  };

  const recalcularPrecios = (updatedData) => {
    const cantidad = parseFloat(updatedData.cantidad) || 0;
    const cotizacion = parseFloat(updatedData.cotizacion) || 0;
    const ccl = parseFloat(updatedData.ccl) || 0;
    const moneda = updatedData.moneda;
    const tipo = updatedData.tipo;

    const cclValue = tipo === "Compra" ? dollarData?.compra : dollarData?.venta;
    const finalCcl = ccl || cclValue;

    if (isNaN(cantidad) || isNaN(cotizacion) || isNaN(finalCcl)) {
      console.error(
        "Error: uno de los valores proporcionados no es un número válido"
      );
      return updatedData;
    }

    const precioTotal = cantidad * cotizacion;
    const precioTotalUSD =
      moneda === "ARS" ? precioTotal / finalCcl : precioTotal;

    return {
      ...updatedData,
      precioTotal: !isNaN(precioTotal)
        ? precioTotal.toFixed(2).toString()
        : "0.00",
      precioTotalUSD: !isNaN(precioTotalUSD)
        ? precioTotalUSD.toFixed(2).toString()
        : "0.00",
      ccl: !isNaN(finalCcl) ? finalCcl.toFixed(2).toString() : "0.00",
    };
  };

  const handleSubmit = () => {
    if (id) {
      updateOperation(id, formData);
    } else {
      addOperation(formData);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    tipoOptions,
    monedaOptions,
  };
};
