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
import { getUser } from "../Server/Auth-user";
import { uploadImage } from "../Server/ImageStorage";
import { editProfilePicture } from "../Server/Auth-user";
import { LoadingPage } from "./LoadingPage";

export const ProfilePage = () => {
  const { userData } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [img, setImg] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setUser(await getUser(userData.username));
    setLoading(false);
  }, [img]);

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
    <View>
      <Text>Name: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <View style={styles.borderImg}>
        <Image
          style={styles.avatar}
          source={{ uri: img.uri || user.avatar_url }}
        />
      </View>
      {img.uri ? (
        <Chip
          closeIcon={() => (
            <MaterialCommunityIcons name="close" size={26} color="#fff" />
          )}
          onClose={() => setImg({})}
          style={styles.chip}
          textStyle={{ color: "#fff", fontSize: 16 }}
          onPress={editAvatar}
        >
          Save change
        </Chip>
      ) : (
        <Button
          onPress={pickImage}
          icon="image-edit-outline"
          mode="contained"
          dark={true}
          color="#7C9A92"
          style={{ width: "35%" }}
        >
          Edit Picture
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    width: "40%",
    height: 50,
    borderRadius: 5,
  },
});
