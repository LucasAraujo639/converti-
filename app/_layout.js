import { View, StyleSheet, Text } from "react-native";
import { Stack } from "expo-router";
import theme from "../styles/theme";
import { OperationsProvider } from "../context/OperationsContext";
import { CedearProvider } from "../context/CedearContext";
export default function Layout() {
  return (
    <OperationsProvider>
      <CedearProvider>
        <View style={styles.container}>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: theme.colors.primary },
              headerTintColor: "yellow",
              headerTitle: "",
              headerLeft: () => <Text style={styles.title}>Home</Text>,
            }}
          />
        </View>
      </CedearProvider>
    </OperationsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    color: "#FFFFFF", // Color blanco para el texto
    fontWeight: "bold",
  },
});
