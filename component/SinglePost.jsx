import { View, Text, Button } from "react-native";

export const SinglePost = ({ navigation }) => {
  return (
    <View>
      <Button
        title="users"
        onPress={() => {
          navigation.push("UserProfile");
        }}
      />
    </View>
  );
};
