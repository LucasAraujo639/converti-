import { View } from "react-native";
import { Button } from "../components/buttons/CustomButton";

export default function Home() {
  return (
    <View>
      <View>
        <Button
          text="Operaciones"
          handleAction={handleButtonClick}
          backgroundColor="#1A0B70"
          backgroundColorHover="#3A2C9E"
        />
      </View>
    </View>
  );
}
