import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Platform,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import theme from "../styles/theme";
import { CustomButton } from "../components/buttons/CustomButton";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CargarOperacionPage() {
  const router = useRouter();
  const [tempDate, setTempDate] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "",
    titulo: "",
    cantidad: "",
    tipo: "",
    moneda: "",
    precioTotal: "",
    precioTotalUSD: "",
    ccl: "",
    cotizacion: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setTempDate(selectedDate); // Almacena la fecha seleccionada temporalmente
    }
  };

  const handleDateConfirm = () => {
    if (tempDate) {
      //Formatea la fecha a DD-MM-YYYY ya que no hay una funcion nativa que haga esto
      const day = String(tempDate.getDate()).padStart(2, "0");
      const month = String(tempDate.getMonth() + 1).padStart(2, "0");
      const year = tempDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      handleInputChange("fecha", formattedDate);
      setShowDatePicker(false);
    }
  };

  const handleOnPress = () => {
    router.back();
    console.log(formData);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.secondary,
          headerTitle: "Cargar Operacion",
        }}
      />

      <ScrollView style={styles.operationsContainer}>
        <View style={styles.operationContour}>
          {Object.keys(formData).map((key) => (
            <View key={key} style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              {key === "fecha" ? (
                <TextInput
                  style={styles.input}
                  value={formData[key]}
                  placeholder="Selecciona una fecha"
                  placeholderTextColor="#D9E8F5"
                  onFocus={() => setShowDatePicker(true)}
                />
              ) : (
                <TextInput
                  style={styles.input}
                  value={formData[key]}
                  onChangeText={(value) => handleInputChange(key, value)}
                  placeholder={`Ingresa ${key}`}
                  placeholderTextColor="#D9E8F5"
                  keyboardType={
                    key === "cantidad" ||
                    key === "precioTotal" ||
                    key === "precioTotalUSD" ||
                    key === "ccl" ||
                    key === "cotizacion"
                      ? "numeric"
                      : "default"
                  }
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {showDatePicker && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={showDatePicker}
        >
          <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback>
                <View style={styles.dateContainer}>
                  <DateTimePicker
                    value={tempDate || new Date()} // Usa la fecha temporal si está disponible
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={handleDateChange}
                    themeVariant="light"
                  />
                  <CustomButton
                    text="Confirmar Fecha"
                    textColor="#FFF"
                    backgroundColor={theme.colors.accent}
                    backgroundColorHover={theme.colors.accentPressed}
                    handleAction={handleDateConfirm}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}

      <View style={styles.actionButtonContainer}>
        <View style={styles.actionButtonBox}>
          <CustomButton
            text="Guardar Operacion"
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
  },

  operationsContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#00002D",
    marginBottom: 100,
  },

  operationContour: {
    margin: 20,
    width: "90%",
    backgroundColor: "#1A0B70",
    borderRadius: 10,
    padding: 15,
  },

  inputContainer: {
    marginBottom: 15,
  },

  inputLabel: {
    color: "#D9E8F5",
    fontSize: 14,
    marginBottom: 5,
  },

  input: {
    height: 40,
    borderColor: "#D9E8F5",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 10,
    color: "#D9E8F5",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  dateContainer: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  actionButtonContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: "#1A0B70",
    paddingVertical: 50,
  },

  actionButtonBox: {
    position: "absolute",
    bottom: 60,
    left: 100,
    width: 200,
    height: 80,
  },
});
