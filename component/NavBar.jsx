import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NavBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconsLayout}>
        <Text style={styles.icons}> 🏠 </Text>
        <Text style={styles.icons}> 🗺 </Text>
        <Text style={styles.icons}> 🔍 </Text>
        <Text style={styles.icons}> ➕ </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#253334',
    bottom: 0,
    minHeight: '12%',
    minWidth: '100%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconsLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  icons: {
    fontSize: 45,
  },
});

export default NavBar;
