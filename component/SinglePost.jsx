import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { getSinglePost } from "../Server/PostsData";
import { UserContext } from "../context/userContext";
import { createComment, getComments } from "../Server/PostsData";
import { InputText } from "./InputText";
import CommentsCard from "./CommentsCard";
import { ScrollView } from "react-native-gesture-handler";

export const SinglePost = ({ navigation, route }) => {
  const [singlePost, setSinglePost] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(UserContext);
  const { postId } = route.params;
  const [place, setPlace] = useState([]);

  useEffect(() => {
    getSinglePost(postId)
      .then((post) => {
        setSinglePost(post);
      })
      .then(() => {
        return getComments(postId);
      })
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setPlace(singlePost.locationName);
  }, [singlePost]);

  const handlePress = () => {
    setIsLoading(true);
    if (comment === "") {
      setIsLoading(false);
      return;
    }
    return createComment(
      postId,
      {
        comment: comment,
        author: userData.username,
        createdDate: Date.now(),
        postId: postId,
      },
      userData.username
    )
      .then((comment) => {
        setComment("");
        return getSinglePost(postId);
      })
      .then((post) => {
        setSinglePost(post);
      })
      .then(() => {
        return getComments(postId);
      })
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      });
  };
  return (
    <ImageBackground
      source={require("../assets/backgroundlogin.png")}
      resizeMode="cover"
      style={styles.Background}
      blurRadius={5}
    >
      <ScrollView>
        <View style={styles.container}>
          {isLoading ? (
            <Text>Post is Loading...</Text>
          ) : (
            <View style={styles.detailsContainer}>
              <Image style={styles.image} source={{ uri: singlePost.image }} />
              <TouchableOpacity>
                <Text style={styles.text}>{singlePost.author}</Text>
              </TouchableOpacity>
              <View style={styles.locationTextContainer}>
                <Image
                  style={styles.locationIcon}
                  source={require("../assets/location-pin.png")}
                />
                <Text style={styles.locationText}>
                  {place[0] ||
                    place[1] ||
                    place[2] ||
                    place[3] ||
                    place[4] ||
                    place[5]}
                </Text>
              </View>
              <Text styles={styles.text}>{singlePost.description}</Text>
              <Text>{singlePost.likes}</Text>
            </View>
          )}
        </View>
        <View style={styles.textBoxContainer}>
          <InputText
            onChangeText={setComment}
            text={comment}
            multiline={true}
            placeholder="Write your comment here"
          />
          <Button onPress={handlePress} title="submit">
            Submit
          </Button>
        </View>
        <View style={styles.commentListContainer}>
          {comments.map((comment) => {
            return (
              <CommentsCard comments={comment} key={comment.createdDate} />
            );
          })}
        </View>
      </ScrollView>
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
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    width: 300,
    marginTop: 25,
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
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textBoxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  commentListContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
