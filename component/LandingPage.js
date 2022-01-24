import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

const LandingPage = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../LandingBackground.jpg")}
        resizeMode="cover"
        style={styles.Background}
      >
        <Text style={styles.Welcome}>WELCOME</Text>
        <Text style={styles.TagLine}>
          Take pictures. Share Nature. Feel Naturely.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.logInText}>Login With Username</Text>
        </TouchableOpacity>
        <Text style={styles.NoAccount}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.SignUp}>Sign Up</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  Background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
  },

  Welcome: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFF",
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  TagLine: {
    paddingBottom: 75,
    color: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  logInText: {
    color: "#FFF",
    fontSize: 20,
    alignContent: "center",
    justifyContent: "center",
    paddingLeft: 45,
    paddingRight: 45,
  },
  //change colour to white when background sorted

  NoAccount: {
    color: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  SignUp: {
    fontWeight: "bold",
    color: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#253334",
    padding: 15,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default LandingPage;
