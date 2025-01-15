import { useState, useEffect } from "react";
import { CedearsApiService } from "../services/quotesApiService";
import { useCedear } from "../context/CedearContext";
import { useOperations } from "../context/OperationsContext";

export const useCedearPrices = () => {
  const { setCedearPrices, cedearPrices } = useCedear();
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setShowMessagge } = useOperations();

  useEffect(() => {
    const fetchCedearPrices = async () => {
      try {
        console.log(
          "Llamando a la API para obtener los precios de los Cedears"
        );
        const response = await CedearsApiService.getCedears();
        console.log("respuesta", response);
        if (response) {
          setCedearPrices(response);
          setApiData(response);
        }
      } catch (error) {
        setShowMessagge({
          text: `Error al obtener los precios de los Cedears. Error: ${error}`,
          type: "error",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    if (Object.keys(cedearPrices).length === 0) {
      fetchCedearPrices();
    } else {
      setLoading(false);
    }
  }, []);

  return { cedearPrices, apiData, loading };
};
