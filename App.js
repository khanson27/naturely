import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "./component/Header";
import LandingPage from "./component/LandingPage";
import NavBar from "./component/NavBar";
import { createUser } from "./firebase";

export default function App() {
  createUser("test@test.com", "test123");

  return (
    <View style={styles.container}>
      <Header />
      <NavBar />
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
