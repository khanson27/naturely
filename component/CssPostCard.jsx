import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { Chip } from "react-native-paper";
import { timeSince } from "../utils/pastTime";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

const CssPostCard = ({ posts, navigation, pageUsed = false, onClick }) => {
  const [addComment, setAddComment] = useState(true);
  const { userData } = useContext(UserContext);
  const place = posts.locationName;
  return (
    <TouchableWithoutFeedback
      onLongPress={() => {
        //console.log("post pressed");
        navigation.push("SinglePost", {
          postId: posts.id,
        });
      }}
      onPress={() => {
        onClick.animateCamera({
          center: {
            latitude: posts.Latitude,
            longitude: posts.Longitude,
          },
        });
      }}
      activeOpacity={0.5}
    >
      <View style={pageUsed ? styles.containerMap : styles.container}>
        <View style={pageUsed ? styles.imageMap : styles.imageContainer}>
          <Image source={{ uri: posts.image }} style={styles.image} />
        </View>
        <View style={styles.spacer} />
        <View style={styles.textContainer}>
          <View style={styles.locationTextContainer}>
            <View style={styles.editIcons}>
              <MaterialCommunityIcons
                name="map-marker-radius"
                size={20}
                color="#7C9A92"
              />
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.locationText}
              >
                {place[0] ||
                  place[1] ||
                  place[2] ||
                  place[3] ||
                  place[4] ||
                  place[5]}
              </Text>
            </View>
            <View style={styles.editIcons}>
              {userData.username === posts.author ? (
                <>
                  <Entypo
                    name="edit"
                    size={23}
                    color="#253334"
                    style={{ marginHorizontal: 2 }}
                  />
                  <MaterialIcons
                    name="delete-outline"
                    size={24}
                    color="#253334"
                  />
                </>
              ) : null}
            </View>
          </View>
          <Text style={pageUsed ? styles.nameMap : styles.usernameText}>
            {posts.author}
          </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={pageUsed ? 1 : 2}
            style={pageUsed ? styles.descMap : styles.descriptionText}
          >
            {posts.description}
          </Text>
          <Text
            style={pageUsed ? styles.tagsTextMap : styles.tagsText}
            ellipsizeMode="tail"
            numberOfLines={pageUsed ? 1 : 4}
          >
            {`#${posts.topics.join(" #")}`}
          </Text>
          <Text style={styles.timeText}>{`posted ${timeSince(
            posts.createdDate
          )} days ago...`}</Text>
          <View style={styles.chipContainer}>
            <View style={styles.chipItem}>
              <Chip
                style={pageUsed ? styles.mapChip : styles.chip}
                icon={() => (
                  <MaterialCommunityIcons
                    name="thumb-up-outline"
                    size={pageUsed ? 11 : 22}
                    color="#fff"
                  />
                )}
                textStyle={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: pageUsed ? 10 : 20,
                }}
              >
                {posts.likes.length}
              </Chip>
              <Chip
                style={pageUsed ? styles.mapChip : styles.chip}
                icon={() => (
                  <MaterialCommunityIcons
                    name="comment-outline"
                    size={pageUsed ? 11 : 22}
                    color="#fff"
                  />
                )}
                textStyle={{
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: pageUsed ? 10 : 20,
                }}
              >
                {posts.comments.length}
              </Chip>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CssPostCard;

const styles = StyleSheet.create({
  container: {
    height: 250,
    backgroundColor: "#FCFFEF",
    marginVertical: 5,
    marginHorizontal: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
  },
  containerMap: {
    height: 140,
    backgroundColor: "#FCFFEF",
    marginVertical: 0,
    marginHorizontal: 6,
    paddingBottom: 3,
    paddingTop: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  image: {
    flex: 1,
    backgroundColor: "#FCFFEF",
    borderRadius: 5,
  },
  imageMap: {
    flex: 1,
    backgroundColor: "#FCFFEF",
    borderRadius: 5,
    height: 125,
    width: 100,
  },
  usernameText: {
    marginLeft: 5,
    marginTop: 3,
    color: "#253334",
    fontSize: 25,
  },
  nameMap: {
    fontSize: 15,
    marginVertical: 3,
  },
  descMap: {
    fontSize: 10,
    marginVertical: 1,
    color: "#253334",
  },
  imageContainer: {
    flex: 0.4,
  },
  textContainer: {
    flex: 0.6,
  },
  spacer: {
    width: 10,
  },
  locationTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationText: {
    color: "#7C9A92",
    fontSize: 13,
    marginRight: 5,
  },
  locationIcon: {
    height: 24,
    width: 24,
  },

  descriptionText: {
    marginLeft: 5,
    marginVertical: 5,
    color: "#253334",
    fontSize: 15,
  },
  tagsText: {
    marginLeft: 5,
    color: "#7C9A92",
    fontSize: 13,
  },
  tagsTextMap: {
    color: "#7C9A92",
    fontSize: 10,
  },
  timeText: {
    color: "#253334",
    fontSize: 11,
  },
  chipContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  chipItem: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  chip: {
    marginLeft: 10,
    padding: 0.5,
    backgroundColor: "#253334",
  },
  mapChip: {
    marginLeft: 3,
    padding: 0,
    backgroundColor: "#253334",
  },
  editIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
});
