import { StyleSheet, View, Alert, Image, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { uploadImage } from "../Server/ImageStorage";
import { createTopic } from "../Server/TopicsData";
import { LoadingPage } from "./LoadingPage";
import * as ImagePicker from "expo-image-picker";

export const AddTopicPage = () => {
  const [img, setImg] = useState({});
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { userData } = useContext(UserContext);

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

  const addTopic = async () => {
    try {
      if (
        !img.uri ||
        !description.length ||
        !title.length ||
        img.uri.includes("upload.wikimedia.org")
      ) {
        Alert.alert("Error", "Please fill all required fields");
        return;
      }
      setLoading(true);
      const imageURL = await uploadImage({
        image: img.uri,
        path: `topic/${Math.random().toString(36)}`,
        page: "topic",
      });
      await createTopic({
        image: imageURL,
        username: userData.username,
        title,
        description,
        numberOfUses: 0,
      });
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
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
      }}
    >
      <TextInput
        mode="outlined"
        label="Title"
        placeholder="Add a title"
        right={<TextInput.Affix text={title.length} />}
        onChangeText={setTitle}
        activeOutlineColor="#253334"
        style={{ marginVertical: 5, width: "95%" }}
      />
      <TextInput
        mode="outlined"
        label="Description"
        placeholder="Add a description"
        right={<TextInput.Affix text={description.length} />}
        onChangeText={setDescription}
        multiline={true}
        activeOutlineColor="#253334"
        style={{ marginVertical: 5, width: "95%" }}
      />
      <Image
        source={{
          uri:
            img.uri ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png",
        }}
        style={{
          width: 200,
          height: 200,
          marginVertical: 20,
          borderRadius: 100,
        }}
      />
      <Button
        onPress={pickImage}
        icon="upload"
        mode="contained"
        dark={true}
        color="#7C9A92"
        style={{ width: "65%", marginVertical: 10, paddingVertical: 4 }}
      >
        Upload Image
      </Button>
      <Button
        mode="contained"
        dark={true}
        onPress={addTopic}
        color="#7C9A92"
        style={{ width: "35%", paddingVertical: 6 }}
      >
        Post
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
