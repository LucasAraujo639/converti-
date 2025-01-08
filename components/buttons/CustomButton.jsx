import React from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";

export const CustomButton = ({
  text,
  textColor,
  backgroundColor,
  backgroundColorHover,
  handleAction,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonStyle,
        { backgroundColor: pressed ? backgroundColorHover : backgroundColor },
      ]}
      onPress={() => handleAction()} // Acción principal del botón
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonStyle: {
    width: "95%",
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    minWidth: 150,
  },
});
