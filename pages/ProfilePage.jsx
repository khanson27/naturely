import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import {
  TextInput,
  Button,
  Chip,
  Modal,
  Portal,
  Provider,
  Searchbar,
} from "react-native-paper";
import { Icon } from "react-native-elements";
import { getUser } from "../Server/Auth-user";
import { uploadImage } from "../Server/ImageStorage";
import { editProfilePicture } from "../Server/Auth-user";
import { LoadingPage } from "./LoadingPage";
import { getUserPosts } from "../Server/PostsData";
import CssPostCard from "../component/CssPostCard";

export const ProfilePage = () => {
  const { userData } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [img, setImg] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setUser(await getUser(userData.username));
    setLoading(false);
  }, [img]);

  useEffect(() => {
    setLoading(true);
    getUserPosts(userData.username).then((posts) => {
      setPosts(posts);
      setLoading(false);
    });
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });
    if (!result.cancelled) {
      setImg(result);
    }
  };

  const editAvatar = async () => {
    setLoading(true);
    try {
      const imageURL = await uploadImage({
        image: img.uri,
        path: `user/${user.username}/${Math.random().toString(36)}`,
      });
      await editProfilePicture(imageURL, user.username);
      setImg({});
      setLoading(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <ImageBackground
      source={require("../assets/backgroundlogin.png")}
      resizeMode="cover"
      style={styles.Background}
      blurRadius={5}
    >
      <ScrollView>
        <View style={styles.profileContainer}>
          <View style={styles.borderImg}>
            <Image
              style={styles.avatar}
              source={{ uri: img.uri || user.avatar_url }}
            />
          </View>
          <View style={styles.buttonContainer}>
            {img.uri ? (
              <Chip
                closeIcon={() => (
                  <MaterialCommunityIcons name="close" size={20} color="#fff" />
                )}
                onClose={() => setImg({})}
                style={styles.chip}
                textStyle={{ color: "#fff", fontSize: 16 }}
                onPress={editAvatar}
              >
                <Icon name="save" />
              </Chip>
            ) : (
              <TouchableOpacity style={styles.customButton} onPress={pickImage}>
                <Icon name="edit" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.userDetails}>
            <View style={{ marginLeft: 55 }}>
              <Text style={{ textAlign: "center" }}>{user.username}</Text>
              <Text style={{ textAlign: "center" }}>{user.email}</Text>
            </View>
            <TouchableOpacity style={styles.customButton}>
              <Icon name="edit" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.customButton}>
              <Icon name="delete" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.friendContainer}>
          <Image
            source={{
              uri: "https://media.comicbook.com/2021/04/attack-on-titan-ending-levi-ackerman-1263774.jpeg?auto=webp&width=1200&height=675&crop=1200:675,smart",
            }}
            style={styles.friendImage}
          />
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu1MMT8BUmERLt1GEZwFvYVtTD7YOfEYsYxA&usqp=CAU",
            }}
            style={styles.friendImage}
          />
          <Image
            source={{
              uri: "https://www.personality-database.com/profile_images/12344.png",
            }}
            style={styles.friendImage}
          />
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfXmGRshbNAaElslvI4CLpQwG_LbFJw3YBaw&usqp=CAU",
            }}
            style={styles.friendImage}
          />
          <Image
            source={{
              uri: "https://mfiles.alphacoders.com/749/749909.jpg",
            }}
            style={styles.friendImage}
          />
        </View>
        <View>
          {loading ? (
            <Text>User Posts Loading...</Text>
          ) : (
            posts.map((post) => {
              return <CssPostCard posts={post} />;
            })
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  friendContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  friendImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    margin: 5,
    borderWidth: 1.5,
    borderColor: "black",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  Background: {
    height: "100%",
    width: "100%",
  },
  borderImg: {
    borderWidth: 8,
    borderRadius: 150,
    borderColor: "gray",
    width: 88,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
  },
  chip: {
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: "#7C9A92",
    width: 70,
    height: 35,
    borderRadius: 5,
  },
  profileContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.77)",
  },
  buttonContainer: {
    margin: 10,
  },
  customButton: {
    display: "flex",
    justifyContent: "center",
    width: 35,
    height: 35,
    backgroundColor: "#7C9A92",
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  userDetails: {
    display: "flex",
    flexDirection: "row",
  },
});
