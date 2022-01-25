import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NavBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconsLayout}>
        <Image
          source={require('../assets/NavIcons/home1.png')}
          style={styles.icons}
        />
        <Image
          source={require('../assets/NavIcons/map1.png')}
          style={styles.icons}
        />
        <Image
          source={require('../assets/NavIcons/search1.png')}
          style={styles.icons}
        />
        <Image
          source={require('../assets/NavIcons/plus1.png')}
          style={styles.icons}
        />
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
    marginLeft: 30,
    marginRight: 30,
    height: 30,
    width: 30,
  },
});

export default NavBar;
