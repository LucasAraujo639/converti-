import React, { useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Link } from "expo-router";
import InputField from "../components/InputField";
import theme from "../styles/theme";
import { CustomButton } from "./buttons/CustomButton";
import { useRouter } from "expo-router";
import { LogoImage } from "./images/Images";
export default function Main() {
  const [text, setText] = useState("");
  const router = useRouter();

  const [error, setError] = useState("");

  const handleInputChange = (input) => {
    setText(input);
    if (input === "") {
      setError("Este campo es obligatorio.");
    } else {
      setError("");
    }
  };

  const handleOnPress = () => {
    // Lógica para manejar el retroceso (por ejemplo, navegación)
    router.push("/operaciones");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light" />
      <View>
        <View style={styles.imageLogoContainer}>
          <LogoImage style={styles.logo} />
        </View>
        <Link href="/operaciones" asChild>
          <CustomButton
            text="Operaciones"
            textColor={theme.colors.text}
            backgroundColor={theme.colors.primary}
            backgroundColorHover={theme.colors.primaryPressed}
            handleAction={handleOnPress}
          />
        </Link>

        <Link href="/operaciones" asChild>
          <CustomButton
            text="Portafolio"
            textColor={theme.colors.text}
            backgroundColor={theme.colors.primary}
            backgroundColorHover={theme.colors.primaryPressed}
            handleAction={handleOnPress}
          />
        </Link>

        <Link href="/operaciones" asChild>
          <CustomButton
            text="Analisis"
            textColor={theme.colors.text}
            backgroundColor={theme.colors.primary}
            backgroundColorHover={theme.colors.primaryPressed}
            handleAction={handleOnPress}
          />
        </Link>
        <Link href="/operaciones" asChild>
          <CustomButton
            text="Configuracion"
            textColor={theme.colors.text}
            backgroundColor={theme.colors.primary}
            backgroundColorHover={theme.colors.primaryPressed}
            handleAction={handleOnPress}
          />
        </Link>
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
  imageLogoContainer: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50, // Mueve el logo un poco hacia arriba
  },
  logo: {
    width: 100, // Ajusta el ancho del logo
    height: 100, // Ajusta la altura del logo
  },
});
