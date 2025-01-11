import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper"; // Usando Avatar de react-native-paper
import Icon from "react-native-vector-icons/FontAwesome"; // Iconos de FontAwesome
import { Pressable } from "react-native"; // Usando Pressable
import CustomAvatar from "../avatar/CustomAvatar";

export default function OperationItem({
  id,
  letter,
  size,
  name,
  onEdit,
  onDelete,
}) {
  return (
    <View style={styles.itemContainer}>
      <CustomAvatar letter={letter} size={size} name={name} />

      <View style={styles.iconsContainer}>
        <Pressable
          onPress={() => onEdit(id)}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        >
          <Icon name="edit" size={26} color="#4CAF50" style={styles.icon} />
        </Pressable>
        <Pressable
          onPress={onDelete}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        >
          <Icon name="trash" size={26} color="#F44336" style={styles.icon} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
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
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  icon: {
    marginLeft: 10,
  },
});
