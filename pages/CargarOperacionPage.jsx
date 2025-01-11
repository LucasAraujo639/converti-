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
import { useRouter, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import theme from "../styles/theme";
import { CustomButton } from "../components/buttons/CustomButton";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useOperations } from "../context/OperationsContext";
import { DolarCCLUtils } from "../utils/dolarCCLUtils";
import { DatePicker } from "../components/date_picker/DatePicker";

export default function CargarOperacionPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addOperation, updateOperation, getOperationById } = useOperations();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(null);
  const [dollarData, setDollarData] = useState(null);
  const [formData, setFormData] = useState({
    fecha: "",
    titulo: "",
    cantidad: "",
    tipo: "",
    moneda: "",
    cotizacion: "",
    ccl: "",
    precioTotal: "",
    precioTotalUSD: "",
  });

  // Carga los datos si se está editando
  useEffect(() => {
    if (id) {
      const operation = getOperationById(id);
      if (operation) setFormData(operation);
    }
  }, [id]);

  //Cambia el dolar ccl cuando la fecha cambia
  useEffect(() => {
    const fetchDollarValue = async () => {
      if (formData.fecha) {
        try {
          // Esperamos a que la promesa se resuelva antes de continuar
          const DolarCclValue = await DolarCCLUtils.getDollarValue(
            formData.fecha,
            formData.tipo
          );

          // Actualizamos el estado con el valor de DolarCclValue
          setDollarData(DolarCclValue);

          // Actualizamos formData con el valor de ccl
          setFormData((prevFormData) => ({
            ...prevFormData,
            ccl: DolarCclValue,
          }));
        } catch (error) {
          console.log("Error fetching dollar value:", error);
        }
      }
    };

    fetchDollarValue();
  }, [formData.fecha, formData.tipo]);

  const handleInputDateChange = (name, value) => {
    setFormData((prevFormData) => {
      const updatedData = { ...prevFormData, [name]: value };

      // Asegurarse de que recalcularPrecios no muta el objeto original
      const recalculatedData = recalcularPrecios({ ...updatedData });

      // Actualizar el estado con los datos recalculados
      return recalculatedData;
    });
  };

  //TODO: Funcion secundaria lo puedo poner en otro componente
  const recalcularPrecios = (updatedData) => {
    const cantidad = parseFloat(updatedData.cantidad) || 0;
    const cotizacion = parseFloat(updatedData.cotizacion) || 0;
    const ccl = parseFloat(updatedData.ccl) || 0;
    const moneda = updatedData.moneda;
    const tipo = updatedData.tipo; // Obtener el tipo de operación (compra/venta)

    // Si el tipo es 'compra', usamos el valor de compra para ccl, si es 'venta' usamos el de venta
    const cclValue = tipo === "compra" ? dollarData?.compra : dollarData?.venta;

    // Si hay un valor de ccl proporcionado en el input, lo usamos, de lo contrario, usamos el valor calculado
    const finalCcl = ccl || cclValue;

    // Verificación antes de realizar operaciones con valores numéricos
    if (isNaN(cantidad) || isNaN(cotizacion) || isNaN(finalCcl)) {
      console.error(
        "Error: uno de los valores proporcionados no es un número válido"
      );
      return updatedData;
    }

    const precioTotal = cantidad * cotizacion;

    const precioTotalUSD =
      moneda === "ARS" ? precioTotal / finalCcl : precioTotal;

    updatedData.precioTotal = !isNaN(precioTotal)
      ? precioTotal.toFixed(2).toString()
      : "0.00";
    updatedData.precioTotalUSD = !isNaN(precioTotalUSD)
      ? precioTotalUSD.toFixed(2).toString()
      : "0.00";
    updatedData.ccl = !isNaN(finalCcl)
      ? finalCcl.toFixed(2).toString()
      : "0.00"; // Actualizamos el campo ccl

    return updatedData;
  };

  const handleDateChange = (event, selectedDate) => {
    console.log("selected date0", selectedDate);
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

      handleInputDateChange("fecha", formattedDate);
      setShowDatePicker(false);
    }
  };

  const handleOnPress = () => {
    if (id) {
      updateOperation(id, formData);
    } else {
      addOperation({
        ...formData,
      });
    }
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
                    onChangeText={(value) => handleInputDateChange(key, value)}
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
