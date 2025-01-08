import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper"; // Asegúrate de tener react-native-paper instalado

export default function CustomAvatar({ letter, size, name }) {
  return (
    <View style={styles.avatarContainer}>
      <Avatar.Text label={letter} size={size} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  avatar: {
    backgroundColor: "#FF5733",
  },
  name: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
