import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { timeSince } from "../utils/pastTime";

const CommentsCards = ({ comments }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>{comments.author} - </Text>
        <Text>{timeSince(comments.createdDate)}</Text>
      </View>
      <View style={styles.commentContainer}>
        <Text>{comments.comment}</Text>
      </View>
    </View>
  );
};
export default CommentsCards;
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: 60,
    width: "80%",
    backgroundColor: "#FCFFEF",
    color: "white",
    justifyContent: "center",
    display: "flex",
    borderRadius: 40,
    marginBottom: 20,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  commentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
