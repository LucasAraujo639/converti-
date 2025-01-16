import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import theme from "../styles/theme";
import { CustomButton } from "../components/buttons/CustomButton";
import { DatePicker } from "../components/date_picker/DatePicker";
import { OperationFormInput } from "../components/forms/OperationFormInput";
import { useOperationForm } from "../hooks/useOperationForm";

export default function CargarOperacionPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const {
    formData,
    handleInputChange,
    handleSubmit,
    tipoOptions,
    monedaOptions,
  } = useOperationForm(id);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState([]);
  const [selectedField, setSelectedField] = useState("");

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const handleDateConfirm = () => {
    if (tempDate) {
      const day = String(tempDate.getDate()).padStart(2, "0");
      const month = String(tempDate.getMonth() + 1).padStart(2, "0");
      const year = tempDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      handleInputChange("fecha", formattedDate);
      setShowDatePicker(false);
    }
  };

  const handleOnPress = () => {
    handleSubmit();
    router.back();
  };

  const openModal = (field, options) => {
    setSelectedField(field);
    setModalOptions(options);
    setModalVisible(true);
  };

  const confirmModalSelection = (value) => {
    handleInputChange(selectedField, value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.secondary,
          headerLeft: () => null,
          headerTitle: "Cargar Operaciones",
          headerRight: () => null,
        }}
      />
      <ScrollView style={styles.operationsContainer}>
        <View style={styles.operationContour}>
          {Object.keys(formData)
            .filter((key) => key !== "id")
            .map((key) => (
              <OperationFormInput
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={formData[key]}
                onChangeText={(value) => handleInputChange(key, value)}
                placeholder={`Ingresa ${key}`}
                keyboardType={
                  [
                    "cantidad",
                    "precioTotal",
                    "precioTotalUSD",
                    "ccl",
                    "cotizacion",
                  ].includes(key)
                    ? "numeric"
                    : "default"
                }
                onFocus={
                  key === "fecha"
                    ? () => setShowDatePicker(true)
                    : key === "tipo"
                      ? () => openModal("tipo", tipoOptions)
                      : key === "moneda"
                        ? () => openModal("moneda", monedaOptions)
                        : undefined
                }
              />
            ))}
        </View>
      </ScrollView>

      <DatePicker
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        tempDate={tempDate}
        handleDateChange={handleDateChange}
        handleDateConfirm={handleDateConfirm}
      />

      <View style={styles.actionButtonContainer}>
        <View style={styles.actionButtonBox}>
          <CustomButton
            text={id ? "Actualizar Operación" : "Guardar Operación"}
            textColor="#1A0B70"
            backgroundColor={theme.colors.accent}
            backgroundColorHover={theme.colors.accentPressed}
            handleAction={handleOnPress}
          />
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {modalOptions.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => confirmModalSelection(option)}
                style={styles.modalOption}
              >
                <Text style={styles.modalOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  actionButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1A0B70",
    paddingVertical: 60,
  },
  actionButtonBox: {
    position: "absolute",
    bottom: 70,
    left: 100,
    right: 0,
    width: 200,
    height: 80,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalCloseButton: {
    marginTop: 10,
    alignItems: "center",
  },
  modalCloseText: {
    color: theme.colors.accent,
    fontWeight: "bold",
  },
});
