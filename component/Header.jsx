import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { Octicons, FontAwesome } from "@expo/vector-icons";
import { signOutUser } from "../Server/firebase";

export function Header({ title, navigation }) {
  const openMenu = () => {
    navigation.navigate("Post");
  };

  return (
    <View style={styles.header}>
      <View style={styles.icons}>
        <TouchableOpacity
          style={{ paddingRight: 15 }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image
            source={require("../assets/naturely.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.icons}>
        <FontAwesome
          name="sign-out"
          size={45}
          color="white"
          onPress={signOutUser}
          style={{ paddingRight: 15 }}
        />
        <Octicons
          name="diff-added"
          size={45}
          color="white"
          onPress={openMenu}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get("screen").width,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#253334",
    paddingHorizontal: 20,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
    color: "white",
    fontStyle: "italic",
    fontFamily: "serif",
  },
  logo: {
    height: 45,
    width: 45,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
});
