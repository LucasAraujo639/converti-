import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export const OperationFormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  onFocus,
  options,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    {options ? (
      <Picker
        selectedValue={value}
        style={styles.picker}
        onValueChange={(itemValue) => onChangeText(itemValue)}
      >
        {options.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    ) : (
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#D9E8F5"
        keyboardType={keyboardType}
        onFocus={onFocus}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
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
});
