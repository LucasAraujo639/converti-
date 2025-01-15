import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export const PortfolioItem = ({ item }) => (
  <View style={styles.row}>
    <Text style={styles.cell}>{item.titulo}</Text>
    <Text style={styles.cell}>{item.cantidad}</Text>
    <Text style={styles.cell}>{item.cotizacionActual}</Text>
    <Text style={styles.cell}>{item.precioPromedio}</Text>
    <Text
      style={[
        styles.cell,
        { color: parseFloat(item.rendimientoUSD) < 0 ? "red" : "green" },
      ]}
    >
      {item.rendimientoUSD}
    </Text>
    <Text
      style={[
        styles.cell,
        {
          color: parseFloat(item.rendimientoPorcentaje) < 0 ? "red" : "green",
        },
      ]}
    >
      {item.rendimientoPorcentaje}
    </Text>
    <Text style={styles.cell}>{item.carteraTotalUSD}</Text>
  </View>
);

PortfolioItem.propTypes = {
  item: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
    cotizacionActual: PropTypes.number.isRequired,
    precioPromedio: PropTypes.string.isRequired,
    rendimientoUSD: PropTypes.string.isRequired,
    rendimientoPorcentaje: PropTypes.string.isRequired,
    carteraTotalUSD: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
  },

  cell: {
    flex: 1,
    textAlign: "center",
    padding: 5,
  },
});
