import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import theme from "../styles/theme";
import { CustomButton } from "../components/buttons/CustomButton";
import OperationItem from "../components/items/OperationItem";
export default function OperacionesPage() {
  // Mock de operaciones
  const operations = [
    {
      letter: "A",
      name: "MC Donalds",
      size: 40,
      backgroundColor: "#FF5733",
      textColor: "#fff",
    },
    {
      letter: "B",
      name: "Burger King",
      size: 40,
      backgroundColor: "#FF4500",
      textColor: "#fff",
    },
    {
      letter: "C",
      name: "KFC",
      size: 40,
      backgroundColor: "#FF6347",
      textColor: "#fff",
    },
    {
      letter: "D",
      name: "Subway",
      size: 40,
      backgroundColor: "#32CD32",
      textColor: "#fff",
    },
  ];

  const router = useRouter();
  const handleOnPress = () => {
    // Lógica para manejar el retroceso (por ejemplo, navegación)
    router.push("/cargarOperacion");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.secondary,
          headerLeft: () => {},
          headerTitle: "Operaciones",
          headerRight: () => {},
        }}
      />

      <ScrollView style={styles.operationsContainer}>
        <View style={styles.operationContour}>
          {operations.map((operation, index) => (
            <OperationItem
              key={index}
              letter={operation.letter}
              name={operation.name}
              size={operation.size}
              backgroundColor={operation.backgroundColor}
              textColor={operation.textColor}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.actionButtonContainer}>
        <View style={styles.actionButtonBox}>
          <CustomButton
            text="Cargar Operacion"
            textColor="#1A0B70"
            backgroundColor={theme.colors.accent}
            backgroundColorHover={theme.colors.accentPressed}
            handleAction={handleOnPress}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "start",
  },
  operationContour: {
    margin: 20,
    width: "90%",
    height: "100%",
    backgroundColor: "#1A0B70", // primary color
    borderRadius: 10,
  },
  operationsContainer: {
    flex: 1, // Esto permite que el contenido se desplace
    width: "100%",
    backgroundColor: "#00002D", //morado casi oscuro
  },
  actionButtonContainer: {
    position: "absolute", // Mantén el botón fijo en la parte inferior
    bottom: 10, // Colócalo 20px desde el borde inferior
    left: 0,
    right: 0,
    backgroundColor: "#1A0B70", // Fondo del botón
    paddingVertical: 50,
  },
  actionButtonBox: {
    position: "absolute", // Mantén el botón fijo en la parte inferior
    bottom: 60, // Colócalo 20px desde el borde inferior
    left: 100,
    right: 0,
    width: 200,
    height: 80,
  },
});
