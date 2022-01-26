import { InputText } from "./InputText";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ButtonLogin } from "./ButtonLogin";
import { Octicons } from "@expo/vector-icons";
import { createUser } from "../firebase";

const { width, height } = Dimensions.get("window");
export const RegisterPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    createUser(email, password, username);
    setEmail("");
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/imageforBackgroundnew.png")}
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
              <View style={styles.icon}>
                <Octicons name="sign-in" size={42} color="white" />
              </View>
              <Text style={styles.Welcome}>Register</Text>
              <Text style={styles.TagLine}>Register with us now.</Text>
            </View>

            <View style={styles.end}>
              <InputText
                onChangeText={setUsername}
                text={username}
                placeholder="Username"
                autoComplete="name"
                opacity={0.62}
                width={0.8}
              />
              <InputText
                onChangeText={setEmail}
                text={email}
                keyboardTypes="email-address"
                placeholder="Email"
                autoComplete="email"
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

              <ButtonLogin text={"Sign Up"} clickFunc={handleRegister} />
              <Text style={styles.HaveAccount}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("RegisterPage");
                }}
              >
                <Text style={styles.Login}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
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
    justifyContent: "center",
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
  HaveAccount: {
    color: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  Login: {
    fontWeight: "bold",
    color: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    paddingHorizontal: 15,
    paddingTop: 11,
    paddingBottom: 7,
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
