import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useOperations } from "../context/OperationsContext";
import { useCedear } from "../context/CedearContext";
import { CedearsApiService } from "../services/quotesApiService";

export const PortfolioPage = () => {
  const { getAveragePurchasePriceAction, operations } = useOperations();
  const { setCedearPrices, cedearPrices } = useCedear();
  const [portfolio, setPortfolio] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCedearPrices = async () => {
      try {
        console.log(
          "Llamando a la API para obtener los precios de los Cedears"
        );
        const response = await CedearsApiService.getCedears(); // ObtieneDatosD
        console.log("respuesta");
        console.log(response);
        if (response) {
          setCedearPrices(response);
          setApiData(response);
        } else {
          console.error("No se pudieron obtener los precios de los Cedears.");
        }
      } catch (error) {
        console.error("Error al obtener los precios de los Cedears:", error);
      }
    };
    console.log("CEDEAR");
    console.log(cedearPrices);
    if (Object.keys(cedearPrices).length === 0) {
      fetchCedearPrices();
    }
  }, []);

  useEffect(() => {
    // Filtrar operaciones únicas por título
    const uniqueOperations = Object.values(
      operations.reduce((acc, op) => {
        if (!acc[op.titulo]) {
          acc[op.titulo] = { titulo: op.titulo, cantidad: 0 };
        }
        // Dentro de useEffect, donde sumas las cantidades
        acc[op.titulo].cantidad += Number(op.cantidad);
        // Sumar cantidades del mismo título
        return acc;
      }, {})
    );

    const updatedPortfolio = uniqueOperations.map((op) => {
      const source = cedearPrices.length > 0 ? cedearPrices : apiData;
      const cotizacionActual = source.find(
        (item) => Object.keys(item)[0] === op.titulo
      )?.[op.titulo];

      const precioPromedio = getAveragePurchasePriceAction(op.titulo); // Precio promedio calculado

      const cotizacionActualNumerica = cotizacionActual
        ? parseFloat(cotizacionActual.replace(",", "."))
        : 0;

      const rendimientoUSD =
        op.cantidad * (cotizacionActualNumerica - precioPromedio); // Rendimiento en USD

      const carteraTotalUSD = op.cantidad * cotizacionActualNumerica; // Total de la cartera en USD

      const rendimientoPorcentaje =
        carteraTotalUSD > 0 ? (rendimientoUSD / carteraTotalUSD) * 100 : 0; // Rendimiento en porcentaje

      return {
        ...op,
        cotizacionActual: cotizacionActualNumerica,
        precioPromedio: precioPromedio.toFixed(2), // Redondear a 2 decimales
        rendimientoUSD: rendimientoUSD.toFixed(2), // Redondear a 2 decimales
        carteraTotalUSD: carteraTotalUSD.toFixed(2), // Redondear a 2 decimales
        rendimientoPorcentaje: `${rendimientoPorcentaje.toFixed(2)}%`, // Formato porcentaje
      };
    });

    setPortfolio(updatedPortfolio);
  }, [operations, cedearPrices, getAveragePurchasePriceAction]);
  return (
    <View style={styles.container}>
      {/* Encabezados de la tabla */}
      <View style={[styles.row, styles.header]}>
        <Text style={styles.headerCell}>Título</Text>
        <Text style={styles.headerCell}>Cantidad</Text>
        <Text style={styles.headerCell}>Cotización Actual</Text>
        <Text style={styles.headerCell}>Precio Promedio</Text>
        <Text style={styles.headerCell}>Rendimiento USD</Text>
        <Text style={styles.headerCell}>Rendimiento %</Text>
        <Text style={styles.headerCell}>Cartera Total USD</Text>
      </View>

      {/* Contenido de la tabla */}
      <FlatList
        data={portfolio}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.titulo}</Text>
            <Text style={styles.cell}>{item.cantidad}</Text>
            <Text style={styles.cell}>{item.cotizacionActual}</Text>
            <Text style={styles.cell}>{item.precioPromedio}</Text>
            <Text
              style={[
                styles.cell,
                { color: item.rendimientoUSD < 0 ? "red" : "green" },
              ]}
            >
              {item.rendimientoUSD}
            </Text>
            <Text
              style={[
                styles.cell,
                {
                  color:
                    parseFloat(item.rendimientoPorcentaje) < 0
                      ? "red"
                      : "green",
                },
              ]}
            >
              {item.rendimientoPorcentaje}
            </Text>
            <Text style={styles.cell}>{item.carteraTotalUSD}</Text>
          </View>
        )}
      />
      <View style={styles.container}>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
  },
  header: {
    backgroundColor: "#e0e0e0",
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    padding: 5,
  },
});
