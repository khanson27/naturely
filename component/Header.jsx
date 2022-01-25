import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={require("../assets/naturely.png")} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.userItems}>
        <Text style={styles.username}>@DefaultUser</Text>
        <Image
          source={require("../assets/defaultuser.png")}
          style={styles.userImg}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#253334",
    top: -310,
    minHeight: "18%",
    maxHeight: "18%",
    borderColor: "#2f4d40",
    borderWidth: 1,
    minWidth: "100%",
    borderRadius: 40,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  logo: {
    width: 75,
    height: 75,
    marginTop: "20%",
    marginRight: 90,
  },

  userItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    marginLeft: 50,
  },

  username: {
    marginRight: 10,
    color: "#fff",
  },

  userImg: {
    width: 50,
    height: 50,
  },
});

export default Header;
