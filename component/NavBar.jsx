import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const NavBar = () => {
  return (
    <View style={styles.container}>
      <Text>THIS IS A NAV BAR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#253334",
    bottom: 0,
    minHeight: "12%",
    minWidth: "100%",
    borderRadius: 40,
  },
});

export default NavBar;
