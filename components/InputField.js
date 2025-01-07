import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const InputField = ({
  text,
  textColor,
  borderColor,
  placeHolderText,
  onChangeText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>{text}</Text>
      <TextInput
        style={[styles.input, { borderColor: borderColor }]}
        placeholder={placeHolderText}
        placeholderTextColor="#000000"
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    marginVertical: 10,
    position: "relative",
  },
  label: {
    position: "absolute",
    top: -10,
    left: 15,
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 16,
    backgroundColor: "#f0f0f0", // Fondo que coincide con el contenedor
    paddingHorizontal: 5,
    zIndex: 1, // Asegura que el label esté encima del borde
  },
  input: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
    backgroundColor: "#f0f0f0", // Fondo del input
  },
});

export default InputField;
