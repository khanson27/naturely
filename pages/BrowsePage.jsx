import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { useState, useEffect } from 'react';
import { getUsers } from '../Server/firebase';
import TopUsersCard from '../component/TopUsersCard';
const { width, height } = Dimensions.get('window');

export const BrowsePage = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((usersArr) => {
        setUsers(usersArr);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/backgroundlogin.png')}
        resizeMode="cover"
        style={styles.Background}
        blurRadius={5}
      >
        <View style={styles.input}>
          <TextInput
            style={styles.searchBar}
            onChangeText={setQuery}
            text={query}
            placeholder="Search..."
            opacity={0.62}
            width={0.8}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.logInText}>search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.topicsBox}>
          {isLoading ? (
            <Text>Browse is Loading...</Text>
          ) : (
            <FlatList
              data={users}
              renderItem={({ item }) => <TopUsersCard users={item} />}
              keyExtractor={(item) => item.userId}
              style={{ paddingTop: 30 }}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
  },
  searchBar: {
    flex: 0.55,
    alignItems: 'center',
    height: 40,
    minWidth: 290,
    maxWidth: 295,
    height: 35,
    borderWidth: 1,
    borderRadius: 25,
    marginLeft: 15,
    marginTop: 15,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#7C9A92',
    padding: 2,
    borderColor: '#2f4d40',
    borderWidth: 1,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    width: width * 0.75,
    maxWidth: 85,
  },
  logInText: {
    color: '#FFF',
    fontSize: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topicsBox: {
    height: 260,
    backgroundColor: '#FCFFEF',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    flexDirection: 'row',
    width: 250,
  },
  Background: {
    height: '100%',
    width: '100%',
  },
});

// <Button
// title="single screen"
// onPress={() => {
//   navigation.push('SingleUser');
// }}
// />
