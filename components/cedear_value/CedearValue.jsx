import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";

export const CedearValue = () => {
  const [cedearPrice, setCedearPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCedearPrice = async () => {
      try {
        const apiKey = "N6V88KJLTZ30EYHW"; // Reemplaza con tu clave de API de Alphavantage
        const symbol = "MCD"; // Símbolo de la acción de McDonald's
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

        const response = await axios.get(url);
        const data = response.data;

        if (data["Time Series (5min)"]) {
          const latestTime = Object.keys(data["Time Series (5min)"])[0];
          const latestPrice =
            data["Time Series (5min)"][latestTime]["4. close"];
          setCedearPrice(latestPrice);
          console.log("Último precio de MCD:", latestPrice);
        } else {
          setError("No se pudo obtener el precio");
        }
      } catch (err) {
        setError("Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchCedearPrice();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>El valor actual de MCD (McDonald's) es: ${cedearPrice}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
