import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import theme from "../styles/theme";
import { CustomButton } from "../components/buttons/CustomButton";
import OperationItem from "../components/items/OperationItem";
import { useOperations } from "../context/OperationsContext";

export default function OperacionesPage() {
  const { operations, deleteOperation } = useOperations();
  const router = useRouter();
  const handleOnPress = () => {
    // Lógica para manejar el retroceso (por ejemplo, navegación)
    router.push("/cargarOperacion");
  };

  const handleDelete = (id) => {
    deleteOperation(id); // Llama a la función de eliminación
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
        <View style={styles.operationContourContainer}>
          <View style={styles.operationContour}>
            {operations.length > 0 ? (
              operations.map((operation, index) => (
                <OperationItem
                  key={operation.id}
                  id={operation.id}
                  letter={operation.titulo.slice(0, 2)}
                  size="40"
                  name={operation.titulo}
                  backgroundColor="#FF4500"
                  textColor="#fff"
                  onDelete={() => handleDelete(operation.id)}
                  onEdit={(id) =>
                    router.push({
                      pathname: "/cargarOperacion",
                      params: { id: operation.id },
                    })
                  }
                />
              ))
            ) : (
              <Text
                style={{ color: "white", textAlign: "center", marginTop: 20 }}
              >
                No hay operaciones registradas.
              </Text>
            )}
          </View>
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

  operationContourContainer: {
    margin: "auto",
    width: "95%",
    height: "100%",
    backgroundColor: "#1A0B70", // primary color
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 140,
  },
  operationContour: {
    margin: "auto",
    width: "90%",
    height: "100%",
    backgroundColor: "#1A0B70", // primary color
    borderRadius: 10,
    marginTop: 20,
  },

  operationsContainer: {
    flex: 1, // Esto permite que el contenido se desplace
    width: "100%",
    backgroundColor: "#00002D", //morado casi oscuro
  },
  actionButtonContainer: {
    position: "absolute", // Mantén el botón fijo en la parte inferior
    bottom: 0, // Colócalo 20px desde el borde inferior
    left: 0,
    right: 0,
    backgroundColor: "#1A0B70", // Fondo del botón
    paddingVertical: 60,
  },
  actionButtonBox: {
    position: "absolute", // Mantén el botón fijo en la parte inferior
    bottom: 70, // Colócalo 20px desde el borde inferior
    left: 100,
    right: 0,
    width: 200,
    height: 80,
  },
});
