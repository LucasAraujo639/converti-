import React, { useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Animated } from "react-native";
import PropTypes from "prop-types";

const CardMessage = ({ messageProperties, onClose }) => {
  const { text, type, duration } = messageProperties;
  const opacity = new Animated.Value(0);

  useEffect(() => {
    // Animación de entrada
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Configurar temporizador para ocultar automáticamente el mensaje
    const timer = setTimeout(() => {
      closeCard();
    }, duration);

    return () => clearTimeout(timer); // Limpiar temporizador al desmontar
  }, [duration]);

  const closeCard = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) onClose(); // Llamar la función onClose después de la animación
    });
  };

  return (
    <Animated.View style={[styles.card, styles[type], { opacity }]}>
      <Text style={styles.text}>{text}</Text>
      <Pressable onPress={closeCard} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>&times;</Text>
      </Pressable>
    </Animated.View>
  );
};

// Definir los tipos y valores por defecto de las propiedades
CardMessage.propTypes = {
  messageProperties: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["info", "success", "error", "warning"]),
    duration: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

CardMessage.defaultProps = {
  messageProperties: {
    type: "info",
    duration: 3000,
  },
};

export default CardMessage;

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  closeButton: {
    marginLeft: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  info: {
    backgroundColor: "#007bff",
  },
  success: {
    backgroundColor: "#28a745",
  },
  error: {
    backgroundColor: "#dc3545",
  },
  warning: {
    backgroundColor: "#ffc107",
  },
});
