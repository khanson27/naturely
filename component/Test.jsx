import { useState, useContext } from "react";
import { createPost } from "../firebase";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { UserContext } from "../context/userContext";

const Test = () => {
  const [postBody, setPostBody] = useState("");
  const { userData } = useContext(UserContext);

  //change 'username' to userData ^, email is given on sign in, but this can/should be changed to username?

  const handlePost = () => {
    createPost(postBody, "", userData, "tags", "location");
    setPostBody("");
  };

  return (
    <View style={styles.input}>
      <TextInput
        onChangeText={setPostBody}
        value={postBody}
        placeholder="description"
      />

      <TouchableOpacity onPress={handlePost}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Test;
