import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Button from "../component/Button";

export const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/LandingBackground.jpg")}
        resizeMode="cover"
        style={styles.Background}
      >
        <View style={styles.contents}>
          <Image
            source={require("../assets/naturely-text-only.png")}
            style={styles.logo}
          />
          <Text style={styles.Welcome}>WELCOME</Text>
          <Text style={styles.TagLine}>Take pictures. Share Nature.</Text>
          <Text style={styles.TagLine}>Feel Naturely.</Text>
          <Button />
          <Text style={styles.NoAccount}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RegisterPage");
            }}
          >
            <Text style={styles.SignUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
//};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  contents: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 70,
  },

  Background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
  },

  logo: {
    top: -270,
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
  },

  Welcome: {
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  TagLine: {
    textShadowColor: "#000000",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 3,
    color: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  NoAccount: {
    textShadowColor: "#000000",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 3,
    color: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  SignUp: {
    textShadowColor: "#000000",
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 2.5,
    fontWeight: "bold",
    color: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
