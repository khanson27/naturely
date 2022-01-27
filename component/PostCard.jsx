import { Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { getUser } from "../firebase";

const PostCard = (posts) => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  //   const { description, location, picUrl, tags, username } = posts;

  getUser(posts.posts.username)
    .then((user) => {
      setUser(user);
    })
    .then(() => {
      //   console.log(user);
    });

  const LeftContent = <Avatar.Image size={24} source={user.avatar_url} />;
  return (
    <>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Card>
          <Card.Title
            title={posts.posts.username}
            subtitle={posts.posts.location}
            left={LeftContent}
          />
          <Card.Content>
            <Card.Cover
              source={
                posts.posts.picUrl
                  ? posts.posts.picUrl
                  : "https://via.placeholder.com/400"
              }
            />
            <Paragraph>{posts.posts.description}</Paragraph>
          </Card.Content>
        </Card>
      )}

      {/* <View style={styles.input}>
        <Image
          source={}
          style={styles.image}
        />
      </View> */}
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    height: 30,
  },
});
export default PostCard;
