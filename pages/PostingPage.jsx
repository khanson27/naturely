import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React from "react";

export const PostingPage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/backgroundlogin.png")}
      resizeMode="cover"
      style={{ width: "100%", height: "100%", flex: 1 }}
      blurRadius={5}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={{ ...styles.button, marginBottom: 20 }}
          onPress={() => {
            navigation.push("AddTopicPage");
          }}
        >
          <Text style={styles.buttonText}>ADD TOPIC</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push("PostPage");
          }}
        >
          <Text style={styles.buttonText}>ADD POST</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "50%",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#7C9A92",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
