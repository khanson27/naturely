import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={require('../assets/naturely.png')} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={require('../assets/naturely.png')} style={styles.user} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#253334',
    top: -333,
    minHeight: '12%',
    borderColor: '#2f4d40',
    borderWidth: 1,
    minWidth: '100%',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  logo: {
    width: 75,
    height: 75,
    position: 'relative',
    marginRight: 120,
  },

  user: {
    width: 75,
    height: 75,
    position: 'relative',
    marginLeft: 120,
  },
});

export default Header;
