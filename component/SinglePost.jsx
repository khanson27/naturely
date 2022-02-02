import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { getSinglePost } from "../Server/PostsData";
import { UserContext } from "../context/userContext";
import { createComment, getComments } from "../Server/PostsData";
import { InputText } from "./InputText";

export const SinglePost = ({ navigation, route }) => {
  const [singlePost, setSinglePost] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(UserContext);
  const { postId } = route.params;
  useEffect(() => {
    setIsLoading(true);
    getSinglePost(postId).then((post) => {
      setSinglePost(post);
      setIsLoading(false);
    });
  }, [postId]);
  const handlePress = () => {
    createComment(
      postId,
      {
        comment: comment,
        author: userData.username,
        createdDate: Date.now(),
        postId: postId,
      },
      userData.username
    );
  };
  return (
    <ImageBackground
      source={require("../assets/backgroundlogin.png")}
      resizeMode="cover"
      style={styles.Background}
      blurRadius={5}
    >
      <View style={styles.container}>
        {isLoading ? (
          <Text>Post is Loading...</Text>
        ) : (
          <View>
            <Image style={styles.image} source={{ uri: singlePost.image }} />
            <TouchableOpacity>
              <Text style={styles.text}>{singlePost.author}</Text>
            </TouchableOpacity>
            <View style={styles.locationTextContainer}>
              <Image
                style={styles.locationIcon}
                source={require("../assets/location-pin.png")}
              />
              <Text style={styles.locationText}>{singlePost.locationName}</Text>
            </View>
            <Text styles={styles.text}>{singlePost.description}</Text>
            <Text>{singlePost.likes}</Text>
          </View>
        )}
      </View>
      <View>
        <InputText onChangeText={setComment} value={comment} multiline={true} />
        <Button onPress={handlePress} title="submit">
          Submit
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    backgroundColor: "#FCFFEF",
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
  },
  image: {
    height: 300,
    width: 300,
  },
  text: {
    fontSize: 15,
  },
  Background: {
    height: "100%",
    width: "100%",
  },
  locationTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    height: 24,
    width: 24,
  },
  locationText: {
    color: "#7C9A92",
    fontSize: 13,
    marginRight: 5,
  },
});
