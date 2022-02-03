import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Picker,
  ScrollView,
} from "react-native";
import { getTopics } from "../Server/TopicsData";
import { useState, useEffect } from "react";
import { getUsers } from "../Server/Auth-user";
import TopUsersCard from "../component/TopUsersCard";
import { searchFromBrowse } from "../Server/firebase";
import { BrowseTopics } from "../component/BrowseTopics";

const { width, height } = Dimensions.get("window");

export const BrowsePage = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState();
  const [topicsArray, setTopicsArray] = useState([]);
  const [selection, setSelection] = useState("topics");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopics, setSelectedTopics] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((usersArr) => {
        setUsers(usersArr);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getTopics().then((topicList) => {
      setTopicsArray(topicList);
    });
  }, []);

  const handleSearch = () => {
    searchFromBrowse(selection, query).then((searchResult) => {
      console.log(searchResult);
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/backgroundlogin.png")}
        resizeMode="cover"
        style={styles.Background}
        blurRadius={5}
      >
        <ScrollView>
          <View style={styles.allSearch}>
            <View style={styles.input}>
              <TextInput
                style={styles.searchBar}
                onChangeText={setQuery}
                text={query}
                placeholder="   Search..."
                opacity={0.5}
                width={0.8}
              />
              <TouchableOpacity style={styles.button} onPress={handleSearch}>
                <Text style={styles.logInText}>search</Text>
              </TouchableOpacity>
            </View>
            <Picker
              style={styles.picker}
              selectedValue={selection}
              onValueChange={(itemValue, itemIndex) => setSelection(itemValue)}
            >
              <Picker.Item label="Topics" value="topics" />
              <Picker.Item label="Users" value="users" />
            </Picker>
          </View>
          <View>
            {isLoading ? (
              <Text>Browse is Loading...</Text>
            ) : (
              <View>
                <Text style={styles.usersBoxText}>Popular Users</Text>
                <FlatList
                  style={styles.usersBox}
                  data={users}
                  renderItem={({ item }) => <TopUsersCard users={item} />}
                  keyExtractor={(item) => item.auth_id}
                />
              </View>
            )}
          </View>
          <View>
            <Text style={styles.usersBoxText}>Browse Topics</Text>
            <View style={styles.topicsWrap}>
              <BrowseTopics
                setSelectedTopics={setSelectedTopics}
                selectedTopics={selectedTopics}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },

  input: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },

  allSearch: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
  },

  picker: {
    height: 25,
    width: 80,
    justifyContent: "center",
  },
  searchBar: {
    flex: 0.55,
    alignItems: "center",
    height: 40,
    minWidth: 180,
    maxWidth: 180,
    height: 35,
    borderWidth: 1,
    borderRadius: 25,
    marginLeft: 15,
    marginTop: 15,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#7C9A92",
    padding: 2,
    borderColor: "#2f4d40",
    borderWidth: 1,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    width: width * 0.75,
    maxWidth: 85,
  },
  logInText: {
    color: "#FFF",
    fontSize: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  usersBox: {
    paddingTop: 10,
    // height: 220,
    backgroundColor: "#FCFFEF",
    borderRadius: 20,

    width: "80%",
    alignSelf: "center",
  },

  usersBoxText: {
    marginTop: 23,
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginLeft: 35,
    marginBottom: 5,
  },

  Background: {
    width: "100%",
  },
  topicsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    marginBottom: 10,
    backgroundColor: "#FCFFEF",
  },
});

// <Button
// title="single screen"
// onPress={() => {
//   navigation.push('SingleUser');
// }}
// />
