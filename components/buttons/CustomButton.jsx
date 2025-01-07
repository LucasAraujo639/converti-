import React from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";

export const CustomButton = ({
  text,
  backgroundColor,
  backgroundColorHover,
  handleAction,
}) => {
  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          styles.buttonStyle,
          { backgroundColor: pressed ? backgroundColorHover : backgroundColor },
        ]}
        onPress={() => handleAction()} // Acción principal del botón
      >
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#f0f0f0",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonStyle: {
    width: "95%",
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
