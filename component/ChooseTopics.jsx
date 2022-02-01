import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { getTopics } from "../Server/TopicsData";
import { LoadingPage } from "../pages/LoadingPage";

export const ChooseTopic = ({ setSelectedTopics, selectedTopics }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((topicsData) => {
      setTopics(topicsData);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <ScrollView contentContainerStyle={styles.topics}>
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => {
          setSearchQuery(query);
          setTopics((currTopic) => {
            return currTopic.filter((topicName) =>
              topicName.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
          });
        }}
        value={searchQuery}
        onIconPress={() => {
          setTopics((currTopic) => {
            return currTopic.filter((topicName) =>
              topicName.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
          });
        }}
      />
      {topics.map((topic) => {
        return (
          <Pressable
            key={topic.title}
            onPress={() => {
              setSelectedTopics((currSelectedTopics) => {
                const foundTopic = currSelectedTopics.filter(
                  (currTopics) => topic.title !== currTopics
                );
                return currSelectedTopics.length === foundTopic.length
                  ? [...currSelectedTopics, topic.title]
                  : foundTopic;
              });
            }}
          >
            <View style={styles.center}>
              <View
                style={[
                  styles.borderImg,
                  {
                    borderColor: selectedTopics.includes(topic.title)
                      ? "#7C9A92"
                      : "#eee",
                  },
                ]}
              >
                <Image
                  style={styles.avatar}
                  source={{
                    uri: topic.image,
                  }}
                />
              </View>
              <Text style={styles.hash}>{topic.title}</Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});
