import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.secondary,
          headerLeft: () => {},
          headerTitle: "Cargar Operaciones",
          headerRight: () => {},
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
                  key === "fecha" ? () => setShowDatePicker(true) : undefined
                }
                options={
                  key === "tipo"
                    ? tipoOptions
                    : key === "moneda"
                      ? monedaOptions
                      : undefined
                }
              />
            ))}
        </View>
      </ScrollView>

      {showDatePicker && (
        <DatePicker
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          tempDate={tempDate}
          handleDateChange={handleDateChange}
          handleDateConfirm={handleDateConfirm}
        />
      )}

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
