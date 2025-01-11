import {
  Modal,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CustomButton } from "../buttons/CustomButton";
import theme from "../../styles/theme";

export const DatePicker = ({
  showDatePicker,
  setShowDatePicker,
  tempDate,
  handleDateChange,
  handleDateConfirm,
}) => {
  // Validar si tempDate es una fecha válida
  const validDate =
    tempDate instanceof Date && !isNaN(tempDate) ? tempDate : new Date();

  const onDateChange = (event, selectedDate) => {
    console.log("AAAA CAMBIANDO", selectedDate);
    if (selectedDate) {
      // Actualiza el estado de la fecha seleccionada (en tempDate)
      handleDateChange(event, selectedDate);
    }
  };

  return (
    <Modal transparent={true} animationType="slide" visible={showDatePicker}>
      <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.dateContainer}>
              <DateTimePicker
                value={validDate} // Usar validDate asegurando que sea un Date válido
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateChange} // Actualizar la fecha seleccionada al cambiarla
                locale="es"
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
  );
};

const styles = StyleSheet.create({
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
});
