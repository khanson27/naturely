import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useFonts } from 'expo-font';
import Button from './Button';

const LandingPage = () => {
  const [loaded] = useFonts({
    Alegreya: require('../assets/Alegreya/static/Alegreya-Regular.ttf'),
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../LandingBackground.jpg')}
        resizeMode="cover"
        style={styles.Background}
      >
        <View style={styles.contents}>
          <Text style={styles.Welcome}>WELCOME</Text>
          <Text style={styles.TagLine}>Take pictures. Share Nature.</Text>
          <Text style={styles.TagLine}>Feel Naturely.</Text>
          <Button />
          <Text style={styles.NoAccount}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.SignUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contents: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 70,
  },

  Background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100%',
  },

  Welcome: {
    fontFamily: 'Alegreya_400Regular',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF',
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  TagLine: {
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  NoAccount: {
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  SignUp: {
    fontWeight: 'bold',
    color: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LandingPage;
