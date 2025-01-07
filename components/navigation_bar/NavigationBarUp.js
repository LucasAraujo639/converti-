import { Link } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
export const NavigationBarUp = ({ title, onBackPress }) => {
  const { width } = Dimensions.get("window");
  return (
    <View style={[styles.container, { width: width }]}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Link asChild href="/">
          <Icon name="arrow-back" size={26} color="#FFFFFF" />
        </Link>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1A0B70", //primary color
    height: 67,
    alignItems: "center",
    justifyContent: "start",
    padding: 15,
    gap: 15,
  },
  title: {
    fontSize: 20,
    color: "#FFFFFF", // Color blanco para el texto
    fontWeight: "bold",
  },
});
