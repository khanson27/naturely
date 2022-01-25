import { StyleSheet, SafeAreaView, Platform } from "react-native";
import LandingPage from "./component/LandingPage";
import { LoginPage } from "./component/LoginPage";
import { RegisterPage } from "./component/RegisterPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingPage">
          <Stack.Screen
            name="LandingPage"
            options={{ headerShown: false }}
            component={LandingPage}
          />
          <Stack.Screen
            name="LoginPage"
            options={{ headerShown: false }}
            component={LoginPage}
          />
          <Stack.Screen
            name="RegisterPage"
            options={{ headerShown: false }}
            component={RegisterPage}
          />
        </Stack.Navigator>
      </NavigationContainer>

      {/* <LandingPage />
      <LoginPage />
      <RegisterPage /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
