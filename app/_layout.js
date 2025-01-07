import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
export default function Layout() {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
}
//SLOT cambiara STACK

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
});
