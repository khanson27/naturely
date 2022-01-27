import NavBar from './NavBar';
import Header from './Header';
import Button from './Button';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getPosts } from '../firebase';
import { useState, useEffect } from 'react';

const NewsFeedCards = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts(), [];
  });
  //getposts)
  //setposts to getposts
  //dependencies = empty array
  //refresh button which calls get posts again
  return (
    <View>
      <Header />
      <Text>Posts</Text>
      <NavBar />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#253334',
    top: -310,
    minHeight: '18%',
    maxHeight: '18%',
    borderColor: '#2F4D40',
    borderWidth: 1,
    minWidth: '100%',
    borderRadius: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: 75,
    height: 75,
    marginTop: '20%',
    marginRight: 90,
  },
  userItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    marginLeft: 50,
  },
  username: {
    marginRight: 10,
    color: '#fff',
  },
  userImg: {
    width: 50,
    height: 50,
  },
});
export default NewsFeedCards;
