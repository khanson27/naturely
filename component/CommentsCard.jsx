import { View, Text, StyleSheet } from "react-native";
import React from "react";

const CommentsCards = ({ comments }) => {
  console.log(comments);
  return (
    <View style={styles.container}>
      <Text>{comments.author}</Text>
      <Text>{comments.createdDate}</Text>
      <Text>{comments.comment}</Text>
    </View>
  );
};
export default CommentsCards;
const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    backgroundColor: "blue",
  },
});
