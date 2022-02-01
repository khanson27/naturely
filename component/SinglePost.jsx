import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { PostContext } from "../context/postContext";
import { getSinglePost } from "../Server/PostsData";

export const SinglePost = ({ navigation, route }) => {
  const [singlePost, setSinglePost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { postId } = route.params;
  useEffect(() => {
    setIsLoading(true);
    getSinglePost(postId).then((post) => {
      setSinglePost(post);
      setIsLoading(false);
    });
  }, [postId]);

  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
