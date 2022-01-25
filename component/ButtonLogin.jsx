import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
const { width, height } = Dimensions.get("window");

export function ButtonLogin({ text }) {
  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.logInText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#7C9A92",
    padding: 10,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    width: width * 0.75,
    maxWidth: 700,
  },

  logInText: {
    color: "#FFF",
    fontSize: 20,
    alignContent: "center",
    justifyContent: "center",
  },
});
