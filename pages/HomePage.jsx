import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import { Button, Modal, Portal, Provider } from "react-native-paper";
import { getPosts } from "../Server/PostsData";
import { useState, useEffect } from "react";
import CssPostCard from "../component/CssPostCard";
import { LoadingPage } from "./LoadingPage";
import { ChooseTopic } from "../component/ChooseTopics";

export const HomePage = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1000000000000000000000);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPost, setLoadingPosts] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    setIsLoading(true);
    getPosts(page).then((data) => {
      setPosts(data);
      setIsLoading(false);
    });
  }, []);

  const loadPosts = (newPage) => {
    setLoadingPosts(true);
    getPosts(newPage).then((data) => {
      setPosts((curr) => {
        return [...curr, ...data];
      });
      setLoadingPosts(false);
    });
  };

  const filterByTopic = () => {
    setIsLoading(true);
    getPosts(1000000000000000000000, selectedTopics).then((data) => {
      setPosts(data);
      setIsLoading(false);
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  //refresh button which calls get posts again
  // enable firebase live update
  return (
    <Provider>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/backgroundlogin.png")}
          resizeMode="cover"
          style={styles.Background}
          blurRadius={5}
        >
          <Portal>
            <Modal
              visible={visible}
              onDismiss={() => {
                hideModal();
                filterByTopic();
              }}
              contentContainerStyle={styles.topicsWrap}
            >
              <ChooseTopic
                setSelectedTopics={setSelectedTopics}
                selectedTopics={selectedTopics}
              />
            </Modal>
          </Portal>
          <>
            <FlatList
              data={posts}
              extraData={true}
              renderItem={({ item }) => (
                <CssPostCard posts={item} navigation={navigation} />
              )}
              keyExtractor={(item) => item.id}
              style={{ paddingTop: 30 }}
              ItemSeparatorComponent={() => (
                <View style={{ marginVertical: 5 }}></View>
              )}
              ListHeaderComponent={() => (
                <Button
                  mode="contained"
                  dark={true}
                  onPress={showModal}
                  color="#7C9A92"
                  style={styles.Loading}
                >
                  Topics Filter
                </Button>
              )}
              ListFooterComponent={() => (
                <View style={styles.mb5}>
                  {!loadingPost ? (
                    <Button
                      mode="contained"
                      dark={true}
                      onPress={() => {
                        setPage(posts[posts.length - 1].createdDate);
                        loadPosts(posts[posts.length - 1].createdDate);
                      }}
                      color="#7C9A92"
                      style={styles.Loading}
                    >
                      Load more...
                    </Button>
                  ) : (
                    <Text style={styles.textThick}>Loading ...</Text>
                  )}
                </View>
              )}
            />
          </>
        </ImageBackground>
      </View>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  Background: {
    height: "100%",
    width: "100%",
  },
  Loading: {
    width: "35%",
    paddingVertical: 6,
    alignSelf: "center",
    marginBottom: 40,
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
  textThick: {
    fontWeight: "bold",
    color: "#FFF",
    paddingVertical: 6,
    alignSelf: "center",
    marginBottom: 40,
    fontSize: 20,
  },
});
