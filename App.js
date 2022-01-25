import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import LandingPage from "./component/LandingPage";
import { LoginPage } from "./component/LoginPage";
import { createUser } from "./firebase";

export default function App() {
  createUser("test@test.com", "test123");

  return (
    <SafeAreaView style={styles.container}>
      {/* <LandingPage /> */}
      <LoginPage />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
