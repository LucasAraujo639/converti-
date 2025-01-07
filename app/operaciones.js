import { View, StyleSheet, Text } from "react-native";
import { NavigationBarUp } from "../components/navigation_bar/NavigationBarUp";

export default function Operaciones() {
  return (
    <View style={styles.container}>
      <NavigationBarUp title="Operaciones" onBackPress={"/"} />
      <Text style={{ color: "#fff" }}>operaciones</Text>
    </View>
  );
}
//SLOT cambiara STACK

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "start",
  },
});
