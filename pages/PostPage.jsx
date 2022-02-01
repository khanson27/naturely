import React, { useState, useContext } from "react";
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
import { PositionContext } from "../context/positionContext";
import { ImageContext } from "../context/imageContext";
import { UserContext } from "../context/userContext";
import * as ImagePicker from "expo-image-picker";
import {
  TextInput,
  Button,
  Chip,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { createPost } from "../Server/PostsData";
import { uploadImage } from "../Server/ImageStorage";
import { ChooseTopic } from "../component/ChooseTopics";
import { LoadingPage } from "./LoadingPage";

const { width, height } = Dimensions.get("window");

export const PostPage = ({ navigation }) => {
  const { postLocation, postLocationName, setPostLocationName } =
    useContext(PositionContext);
  const { userData } = useContext(UserContext);
  const { img, setImg } = useContext(ImageContext);
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const addPost = async () => {
    if (
      !selectedTopics.length ||
      img.uri.includes("upload.wikimedia.org") ||
      !description.length ||
      !postLocationName ||
      !postLocation
    ) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    } else {
      setIsLoading(true);
      createPost({
        description,
        createdDate: Date.now(),
        locationName: postLocationName,
        topics: selectedTopics,
        Latitude1: postLocation.latitude,
        Latitude2: postLocation.latitude,
        Longitude1: postLocation.longitude,
        Longitude2: postLocation.longitude,
        likes: [],
        comments: [],
        author: userData.username,
        image: await uploadImage({
          image: img.uri,
          path: `posts/${Math.random().toString(36)}`,
        }),
      }).then(() => {
        setIsLoading(false);
      });
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
    });
    if (!result.cancelled) {
      [result.width, result.height] = [result.height, result.width];
      // math below is not important
      setImg({
        ...result,
        width: width > 700 ? 700 : width - 20,
        height: width > 700 ? 700 : width - 20,
      });
    }
  };

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          mode="flat"
          label="Description"
          placeholder="Add a description"
          right={<TextInput.Affix text={description.length} />}
          onChangeText={setDescription}
          multiline={true}
          activeUnderlineColor="#253334"
          style={{ paddingVertical: 5, marginVertical: 5, width: "95%" }}
        />
        <Image
          source={{
            uri: img.uri,
          }}
          style={{
            width: img.width,
            height: img.height,
            marginVertical: 20,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            icon="camera-plus"
            mode="contained"
            onPress={() => {
              navigation.push("TakePhoto");
            }}
            style={{ marginRight: 5, width: "45%" }}
            dark={true}
            color="#7C9A92"
          >
            Take a picture
          </Button>
          <Button
            onPress={pickImage}
            icon="upload"
            mode="contained"
            dark={true}
            color="#7C9A92"
            style={{ width: "45%" }}
          >
            Upload Image
          </Button>
        </View>
        <View style={styles.mb5}>
          {!postLocationName ? (
            <Button
              icon={() => (
                <MaterialCommunityIcons
                  name="map-marker-plus"
                  size={24}
                  color="#fff"
                />
              )}
              mode="contained"
              onPress={() => {
                navigation.push("LocateUser");
              }}
              dark={true}
              color="#7C9A92"
              style={{ width: "90%" }}
            >
              Add Location
            </Button>
          ) : (
            <Chip
              icon={() => (
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={20}
                  color="#fff"
                />
              )}
              closeIcon={() => (
                <MaterialCommunityIcons name="close" size={26} color="#fff" />
              )}
              onClose={() => setPostLocationName(false)}
              style={styles.chip}
              textStyle={{ color: "#fff", fontSize: 16 }}
            >
              {postLocationName}
            </Chip>
          )}
        </View>
        <View style={styles.mb5}>
          {!selectedTopics.length ? (
            <Button
              icon={() => <Entypo name="add-to-list" size={24} color="#fff" />}
              mode="contained"
              onPress={showModal}
              dark={true}
              color="#7C9A92"
              style={{ width: "90%" }}
            >
              Add Topics
            </Button>
          ) : (
            <Chip
              closeIcon={() => <Entypo name="edit" size={23} color="#fff" />}
              onClose={showModal}
              style={styles.chip}
              textStyle={{ color: "#fff", fontSize: 16 }}
            >
              {`#${selectedTopics.join(" #")}`}
            </Chip>
          )}
        </View>
        <View style={styles.mb5}>
          <Button
            mode="contained"
            dark={true}
            onPress={addPost}
            color="#7C9A92"
            style={{ width: "35%", paddingVertical: 6 }}
          >
            Post
          </Button>
        </View>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.topicsWrap}
          >
            <ChooseTopic
              setSelectedTopics={setSelectedTopics}
              selectedTopics={selectedTopics}
            />
          </Modal>
        </Portal>
      </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  mb5: {
    marginBottom: 0,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  wrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 10,
    width: "100%",
    maxWidth: 700,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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
    width: "90%",
    height: 50,
    borderRadius: 5,
  },
  topicsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    marginBottom: 10,
  },
  topics: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  borderImg: {
    borderWidth: 8,
    borderRadius: 150,
    marginBottom: 3,
  },
  center: {
    alignItems: "center",
    margin: 10,
  },
  hash: {
    color: "#253334",
    fontSize: 15,
    fontFamily: "serif",
  },
});
