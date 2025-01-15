import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const PortfolioTableHeader = () => (
  <View style={[styles.row, styles.header]}>
    <Text style={styles.headerCell}>Título</Text>
    <Text style={styles.headerCell}>Cantidad</Text>
    <Text style={styles.headerCell}>Cotización Actual</Text>
    <Text style={styles.headerCell}>Precio Promedio</Text>
    <Text style={styles.headerCell}>Rendimiento USD</Text>
    <Text style={styles.headerCell}>Rendimiento %</Text>
    <Text style={styles.headerCell}>Cartera Total USD</Text>
  </View>
);

const styles = StyleSheet.create({
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
});
