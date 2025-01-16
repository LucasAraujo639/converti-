import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CustomButton } from "../buttons/CustomButton";
import theme from "../../styles/theme";
import { CustomModal } from "../modal_picker/CustomModal";

export const DatePicker = ({
  showDatePicker,
  setShowDatePicker,
  tempDate,
  handleDateChange,
  handleDateConfirm,
}) => {
  const validDate =
    tempDate instanceof Date && !isNaN(tempDate.getTime())
      ? tempDate
      : new Date();

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      handleDateChange(event, selectedDate);
    }
  };

  return (
    <CustomModal
      visible={showDatePicker}
      onClose={() => setShowDatePicker(false)}
    >
      <View style={styles.datePickerContainer}>
        <DateTimePicker
          value={validDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
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
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    width: "100%",
    alignItems: "center",
  },
});
