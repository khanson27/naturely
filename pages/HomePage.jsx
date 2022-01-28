import { View, Text, Button } from "react-native";
import { signOutUser } from "../firebase";

export const HomePage = () => {
  return (
    <View>
      <Text>Home </Text>
      <Button onPress={signOutUser} title="Sign out" />
    </View>
  );
};
