import { StyleSheet, Button, View } from "react-native";
import React from "react";

export const PostingPage = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Add Topic"
        onPress={() => {
          navigation.push("AddTopicPage");
        }}
      />
      <Button
        title="Add Post"
        onPress={() => {
          navigation.push("PostPage");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
