import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import { getPosts } from "../firebase";
import { useState, useEffect } from "react";
import PostCard from "../component/PostCard";
import { signOutUser } from "../firebase";

export const HomePage = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPosts()
      .then((postArr) => {
        setPosts(postArr);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  //refresh button which calls get posts again
  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>News Feed Loading...</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostCard posts={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
      <Button onPress={signOutUser} title="Sign out" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

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
