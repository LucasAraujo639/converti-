import { View, Text, StyleSheet } from "react-native";
import { useOperations } from "../context/OperationsContext";
import { CedearValue } from "../components/cedear_value/CedearValue";

export const PortfolioPage = () => {
  const { getAveragePurchasePriceAction } = useOperations();

  // Obtener el promedio de compra para "MCD"
  const averagePrice = getAveragePurchasePriceAction("Mcd");
  console.log("AVERAGEPRICEACTION");
  console.log(averagePrice);
  return (
    <View style={styles.container}>
      <Text>
        El precio promedio de compra de MCD es: ${averagePrice.toFixed(2)}
      </Text>
      <CedearValue />
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
