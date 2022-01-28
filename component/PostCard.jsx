import { Image, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { getUser } from "../firebase";

const PostCard = (posts) => {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/naturely-3428a.appspot.com/o/defaultuser.png?alt=media&token=c380dc03-d0b1-4d03-8c63-2854828ad027"
  );
  const [isLoading, setIsLoading] = useState(true);
  //   const { description, location, picUrl, tags, username } = posts;
  useEffect(() => {
    setIsLoading(true);
    getUser(posts.posts.username)
      .then((user) => {
        setUser(user);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => alert(err.message));
  }, []);

  useEffect(() => {
    user
      ? setAvatarUrl(user.avatar_url)
      : setAvatarUrl(
          "https://firebasestorage.googleapis.com/v0/b/naturely-3428a.appspot.com/o/defaultuser.png?alt=media&token=c380dc03-d0b1-4d03-8c63-2854828ad027"
        );
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Text>Post Card Loading...</Text>
      ) : (
        <Card>
          <Card.Title
            title={posts.posts.username}
            subtitle={posts.posts.location}
            left={() => (
              <Avatar.Image
                size={24}
                source={{
                  uri: avatarUrl,
                }}
              />
            )}
          />
          <Card.Content>
            <Card.Cover
              source={{
                uri: posts.posts.picUrl
                  ? posts.posts.picUrl
                  : "https://via.placeholder.com/50000",
              }}
            />
            <Paragraph>{posts.posts.description}</Paragraph>
          </Card.Content>
        </Card>
      )}
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
