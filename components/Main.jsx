import React, { useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Link } from "expo-router";
import InputField from "../components/InputField";
import theme from "../styles/theme";
import { CustomButton } from "./buttons/CustomButton";
import { useRouter } from "expo-router";
import { LogoImage } from "./images/Images";

export default function Main() {
  const router = useRouter();

  // Manejar la navegación dinámica según la ruta
  const handleOnPress = (path) => {
    switch (path) {
      case "/operaciones":
        console.log("Navegando a Operaciones...");
        router.push("/operaciones");
        break;

      case "/portfolio":
        console.log("Navegando a Portafolio...");
        router.push("/portfolio");
        break;

      case "/analisis":
        console.log("Navegando a Análisis...");
        router.push("/analisis");
        break;

      case "/configuration":
        console.log("Navegando a Configuración...");
        router.push("/configuration");
        break;

      default:
        console.warn("Ruta desconocida:", path);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light" />
      <View>
        <View style={styles.imageLogoContainer}>
          <LogoImage style={styles.logo} />
        </View>

        {/* Botón para Operaciones */}
        <Link href="/operaciones" asChild>
          <CustomButton
            text="Operaciones"
            textColor={theme.colors.text}
            backgroundColor={theme.colors.primary}
            backgroundColorHover={theme.colors.primaryPressed}
            handleAction={() => handleOnPress("/operaciones")}
          />
        </Link>

        {/* Botón para Portafolio */}
        <Link href="/portfolio" asChild>
          <CustomButton
            text="Portafolio"
            textColor={theme.colors.text}
            backgroundColor={theme.colors.primary}
            backgroundColorHover={theme.colors.primaryPressed}
            handleAction={() => handleOnPress("/portfolio")}
          />
        </Link>

        {/* Botón para Análisis */}
        <Link href="/analisis" asChild>
          <CustomButton
            text="Análisis"
            textColor={theme.colors.text}
            backgroundColor={theme.colors.primary}
            backgroundColorHover={theme.colors.primaryPressed}
            handleAction={() => handleOnPress("/analisis")}
          />
        </Link>

        {/* Botón para Configuración */}
        <Link href="/configuration" asChild>
          <CustomButton
            text="Configuración"
            textColor={theme.colors.text}
            backgroundColor={theme.colors.primary}
            backgroundColorHover={theme.colors.primaryPressed}
            handleAction={() => handleOnPress("/configuration")}
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
