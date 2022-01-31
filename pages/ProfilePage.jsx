import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import { Avatar } from "react-native-paper";
import { UserContext } from "../context/userContext";
import { getUser } from "../Server/firebase";

export const ProfilePage = () => {
  const { userData } = useContext(UserContext);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUser(userData).then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={styles.mainContainer}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.userContainer}>
          <Avatar.Image
            size={120}
            source={{
              uri: user.avatar_url,
            }}
          />
          <Image style={styles.profilePic} source={{ uri: user.avatar_url }} />
          <View style={styles.buttonContainer}>
            <Button title="UPDATE PIC" onPress={() => {}} />
            <View style={{ width: 10 }} />
            <Button title="LOG OUT" onPress={() => {}} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  userContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FCFFEF",
    margin: 20,
    padding: 20,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  profilePic: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderColor: "black",
    borderWidth: 2,
  },
});
