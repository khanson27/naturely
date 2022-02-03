import { Text, StyleSheet, View, ImageBackground, Image } from "react-native";
import {} from "react";

export const LoadingPage = () => {
  return (
    <>
      <ImageBackground
        source={require("../assets/backgroundlogin.png")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        blurRadius={5}
      >
        <Image
          source={require("../assets/naturely.png")}
          style={{ width: 100, height: 100 }}
        />
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({});
