import React, { useEffect, useState, useMemo } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useOperations } from "../context/OperationsContext";
import { useCedearPrices } from "../hooks/useCedearPrices";
import { PortfolioTableHeader } from "../components/portfolio/PortfolioTableHeader";
import { PortfolioItem } from "../components/portfolio/PortfolioItem";
import CardMessage from "../components/buttons/card_messagge/CardMessagge";

export const PortfolioPage = () => {
  const {
    getAveragePurchasePriceAction,
    operations,
    showMessagge,
    setShowMessagge,
  } = useOperations();
  const { cedearPrices, apiData } = useCedearPrices();
  const [portfolio, setPortfolio] = useState([]);

  const uniqueOperations = useMemo(() => {
    return Object.values(
      operations.reduce((acc, op) => {
        if (!acc[op.titulo]) {
          acc[op.titulo] = { titulo: op.titulo, cantidad: 0 };
        }
        acc[op.titulo].cantidad += Number(op.cantidad);
        return acc;
      }, {})
    );
  }, [operations]);

  useEffect(() => {
    const updatedPortfolio = uniqueOperations.map((op) => {
      const source = cedearPrices.length > 0 ? cedearPrices : apiData;
      const cotizacionActual = source.find(
        (item) => Object.keys(item)[0] === op.titulo
      )?.[op.titulo];

      const precioPromedio = getAveragePurchasePriceAction(op.titulo);

      const cotizacionActualNumerica = cotizacionActual
        ? parseFloat(cotizacionActual.replace(",", "."))
        : 0;

      const rendimientoUSD =
        op.cantidad * (cotizacionActualNumerica - precioPromedio);

      const carteraTotalUSD = op.cantidad * cotizacionActualNumerica;

      const rendimientoPorcentaje =
        carteraTotalUSD > 0 ? (rendimientoUSD / carteraTotalUSD) * 100 : 0;

      return {
        ...op,
        cotizacionActual: cotizacionActualNumerica,
        precioPromedio: precioPromedio.toFixed(2),
        rendimientoUSD: rendimientoUSD.toFixed(2),
        carteraTotalUSD: carteraTotalUSD.toFixed(2),
        rendimientoPorcentaje: `${rendimientoPorcentaje.toFixed(2)}%`,
      };
    });

    setPortfolio(updatedPortfolio);
  }, [uniqueOperations, cedearPrices, apiData, getAveragePurchasePriceAction]);

  return (
    <View style={styles.container}>
      <PortfolioTableHeader />
      <FlatList
        data={portfolio}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <PortfolioItem item={item} />}
      />
      <View style={styles.container}>
        <Text></Text>
      </View>

      {showMessagge && (
        <CardMessage
          messageProperties={showMessagge}
          onClose={() => setShowMessagge(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});
