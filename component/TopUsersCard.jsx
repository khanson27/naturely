import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const TopUsersCard = ({ users }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.userBox}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('OtherUsersPage', {
              username: users.username,
            });
          }}
          activeOpacity={0.5}
        >
          <Image source={{ uri: users.avatar_url }} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.usernameText}>{users.username}</Text>
      </View>
    </View>
  );
};

export default TopUsersCard;

const styles = StyleSheet.create({
  image: {
    flex: 0.4,
    backgroundColor: '#FCFFEF',
    borderRadius: 50 / 2,
    maxWidth: 50,
    minWidth: 50,
    maxHeight: 50,
    minHeight: 50,
  },

  userBox: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    height: 45,
  },

  usernameText: {
    marginLeft: 5,
    fontSize: 20,
  },
});
