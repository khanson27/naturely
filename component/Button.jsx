import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Button() {
  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.logInText}>Login With Username</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 70,
    backgroundColor: "#253334",
    padding: 15,
    borderRadius: 25,
    borderColor: "#2f4d40",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  logInText: {
    color: "#FFF",
    fontSize: 20,
    alignContent: "center",
    justifyContent: "center",
    paddingLeft: 45,
    paddingRight: 45,
  },
});

export default Button;
