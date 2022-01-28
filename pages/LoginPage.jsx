import { InputText } from "../component/InputText";
import React, { useState, useContext } from "react";
import { loginUser } from "../firebase";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ButtonLogin } from "../component/ButtonLogin";
import { AntDesign } from "@expo/vector-icons";
import { UserContext } from "../context/userContext";

const { width, height } = Dimensions.get("window");

export const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("test999@test.com");
  const [password, setPassword] = useState("test999");
  const { setUserData } = useContext(UserContext);

  const handleLogin = () => {
    loginUser(email, password).then((username) => {
      setUserData(username);
    });
    setEmail("");
    setPassword("");
    navigation.replace("NewsFeedPage");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/backgroundlogin.png")}
        resizeMode="cover"
        style={styles.Background}
      >
        <View style={styles.maxWidth}>
          <View style={styles.start}>
            <Image
              source={require("../assets/naturely.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.header}>
            <View>
              <AntDesign name="login" size={46} color="white" />
            </View>
            <Text style={styles.Welcome}>Login</Text>
            <Text style={styles.TagLine}>Welcome back to the app.</Text>
          </View>

          <View style={styles.end}>
            <InputText
              onChangeText={setEmail}
              text={email}
              placeholder="Email"
              autoComplete="name"
              opacity={0.62}
              width={0.8}
            />
            <InputText
              onChangeText={setPassword}
              text={password}
              secureTextEntry={true}
              keyboardTypes="email-address"
              placeholder="Password"
              autoComplete="password"
              opacity={0.62}
              width={0.8}
            />
            <ButtonLogin text={"Login"} clickFunc={handleLogin} />
            <Text style={styles.NoAccount}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("RegisterPage");
              }}
            >
              <Text style={styles.SignUp}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.35,
  },
  start: {
    paddingTop: height * 0.04,
    flex: 0.1,
    width: width - width * 0.2,
    maxWidth: 700,
  },
  logo: {
    width: 80,
    height: 80,
  },
  end: {
    flex: 0.55,
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  Background: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  maxWidth: {
    maxWidth: 700,
    flex: 1,
    alignItems: "center",
  },
  Welcome: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  TagLine: { color: "#FFF", justifyContent: "center", alignItems: "center" },
  NoAccount: { color: "#FFF", justifyContent: "center", alignItems: "center" },
  SignUp: {
    fontWeight: "bold",
    color: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 50,
    backgroundColor: "#7C9A92",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
