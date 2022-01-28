import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  ImageBackground,
} from "react-native";
import { getPosts } from "../firebase";
import { useState, useEffect } from "react";
import CssPostCard from "../component/CssPostCard";
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
      <ImageBackground
        source={require("../assets/backgroundlogin.png")}
        resizeMode="cover"
        style={styles.Background}
        blurRadius={5}
      >
        {isLoading ? (
          <Text>News Feed Loading...</Text>
        ) : (
          <FlatList
            data={posts}
            renderItem={({ item }) => <CssPostCard posts={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
        <Button onPress={signOutUser} title="Sign out" />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  Background: {
    height: "100%",
    width: "100%",
  },
});
