import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { Link } from "expo-router";
import InputField from "../components/InputField";
import theme from "../styles/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomButton } from "./buttons/CustomButton";
import { useRouter } from "expo-router";
export default function Main() {
  const [text, setText] = useState("");
  const router = useRouter();

  const [error, setError] = useState("");
  const insets = useSafeAreaInsets();

  const handleInputChange = (input) => {
    setText(input);
    if (input === "") {
      setError("Este campo es obligatorio.");
    } else {
      setError("");
    }
  };

  const handleBackPress = () => {
    // Lógica para manejar el retroceso (por ejemplo, navegación)
    router.push("/operaciones");
  };

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "#000",
      }}
    >
      <View style={styles.container}>
        <Link href="/operaciones" asChild>
          <CustomButton
            text="Ir a Operaciones"
            backgroundColor="#F00"
            backgroundColorHover="#FF0"
            handleAction={handleBackPress}
          />
        </Link>
        <InputField
          text="Titulo"
          textColor={theme.colors.inputInactive}
          borderColor={theme.colors.inputInactive}
          value={text}
          onChangeText={handleInputChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
  link: {
    fontSize: 18,
    color: "blue",
  },
});
