import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LandingPage from "./component/LandingPage";
import { createUser } from "./firebase";

export default function App() {
  createUser("test@test.com", "test123");

  return (
    <View style={styles.container}>
      <LandingPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
