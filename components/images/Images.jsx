import { Image } from "react-native";

export const LogoImage = ({ uri, style }) => (
  <Image
    source={require("../../assets/favicon.png")}
    style={[{ width: 100, height: 100 }, style]}
  />
);
