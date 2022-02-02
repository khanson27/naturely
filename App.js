import { StyleSheet, SafeAreaView, Platform, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useEffect, useState, useContext } from 'react';
import { UserProvider } from './context/userContext';
import { BrowsePage } from './pages/BrowsePage';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { MapPage } from './pages/MapPage';
import { PostPage } from './pages/PostPage';
import { PostingPage } from './pages/PostingPage';
import { AddTopicPage } from './pages/AddTopicPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { OtherUsersPage } from './pages/OtherUsersPage';
import { LocateUser } from './component/LocateUser';
import { Header } from './component/Header';
import { UsersProfile } from './component/UsersProfile';
import { TakePhoto } from './component/TakePhoto';
import { SinglePost } from './component/SinglePost';
import { auth, onAuthStateChanged } from './Server/Auth-user';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { TopicProvider } from './context/topicContext';
import { PositionProvider } from './context/positionContext';
import { ImageProvider } from './context/imageContext';
import { UserContext } from './context/userContext';
import { LoadingPage } from './pages/LoadingPage';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="LandingPage">
    <AuthStack.Screen
      name="LandingPage"
      options={{ headerShown: false }}
      component={LandingPage}
    />
    <AuthStack.Screen
      name="LoginPage"
      options={{ headerShown: false }}
      component={LoginPage}
    />
    <AuthStack.Screen
      name="RegisterPage"
      options={{ headerShown: false }}
      component={RegisterPage}
    />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="HomePage">
    <HomeStack.Screen
      name="HomePage"
      options={{
        headerMode: 'screen',
        header: ({ navigation }) => {
          return <Header title={'Home'} navigation={navigation} />;
        },
        headerStyle: {
          height: 80, // Specify the height of your custom header
        },
      }}
      component={HomePage}
    />
    <HomeStack.Screen
      name="SinglePost"
      options={{
        title: 'Post',
        headerStyle: {
          backgroundColor: '#253334',
        },
        headerTintColor: '#fff',
      }}
      component={SinglePost}
    />
    <HomeStack.Screen
      name="UserProfile"
      options={{
        title: 'Profile',
        headerStyle: {
          backgroundColor: '#253334',
        },
        headerTintColor: '#fff',
      }}
      component={UsersProfile}
    />
  </HomeStack.Navigator>
);

const MapStack = createStackNavigator();
const MapStackScreen = () => (
  <MapStack.Navigator initialRouteName="MapPage">
    <MapStack.Screen
      name="MapPage"
      options={{ headerShown: false }}
      component={MapPage}
    />
    <MapStack.Screen
      name="SinglePost"
      options={{ headerShown: false }}
      component={SinglePost}
    />
    <MapStack.Screen
      name="UserProfile"
      options={{ headerShown: false }}
      component={UsersProfile}
    />
  </MapStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator initialRouteName="ProfilePage">
    <ProfileStack.Screen
      name="ProfilePage"
      options={{
        headerMode: 'screen',
        header: ({ navigation }) => {
          return <Header title={'Profile'} navigation={navigation} />;
        },
        headerStyle: {
          height: 80, // Specify the height of your custom header
        },
      }}
      component={ProfilePage}
    />
    <ProfileStack.Screen
      name="SinglePost"
      options={{ headerShown: false }}
      component={SinglePost}
    />
    <ProfileStack.Screen
      name="UserProfile"
      options={{ headerShown: false }}
      component={UsersProfile}
    />
  </ProfileStack.Navigator>
);

const BrowseStack = createStackNavigator();
const BrowseStackScreen = () => (
  <BrowseStack.Navigator initialRouteName="BrowsePage">
    <BrowseStack.Screen
      name="BrowsePage"
      options={{
        headerMode: 'screen',
        header: ({ navigation }) => {
          return <Header title={'Search'} navigation={navigation} />;
        },
        headerStyle: {
          height: 80, // Specify the height of your custom header
        },
      }}
      component={BrowsePage}
    />
    <BrowseStack.Screen
      name="OtherUsersPage"
      options={{ headerShown: false }}
      component={OtherUsersPage}
    />
  </BrowseStack.Navigator>
);

const PostStack = createStackNavigator();
const PostStackScreen = () => (
  <PostStack.Navigator initialRouteName="PostingPage">
    <PostStack.Screen
      name="PostingPage"
      options={{
        title: 'Posting',
        headerStyle: {
          backgroundColor: '#253334',
        },
        headerTintColor: '#fff',
      }}
      component={PostingPage}
    />
    <PostStack.Screen
      name="PostPage"
      options={{
        title: 'Add Post',
        headerStyle: {
          backgroundColor: '#253334',
        },
        headerTintColor: '#fff',
      }}
      component={PostPage}
    />
    <PostStack.Screen
      name="AddTopicPage"
      options={{
        title: 'Add Topic',
        headerStyle: {
          backgroundColor: '#253334',
        },
        headerTintColor: '#fff',
      }}
      component={AddTopicPage}
    />
    <PostStack.Screen
      name="LocateUser"
      options={{ headerShown: false }}
      component={LocateUser}
    />
    <PostStack.Screen
      name="TakePhoto"
      options={{ headerShown: false }}
      component={TakePhoto}
    />
  </PostStack.Navigator>
);

const Tabs = createMaterialBottomTabNavigator();

const TabsScreen = () => (
  <Tabs.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    // inactiveColor="#fff"
    shifting={false}
    barStyle={{
      backgroundColor: '#253334',
      paddingTop: 10,
      paddingBottom: 2,
      // borderWidth: 1,
      // borderColor: "#2f4d40",
      // borderBottomWidth: 1,
      // borderTopLeftRadius: 40,
      // borderTopRightRadius: 40,
      // overflow: "hidden",
    }}
    labeled={false}
  >
    <Tabs.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View
              style={[
                styles.icon,
                { transform: [{ scale: focused ? 1.2 : 1 }] },
              ]}
            >
              <Ionicons name="home-sharp" size={24} color="white" />
              {focused ? (
                <Text style={{ color: 'white' }}>•</Text>
              ) : (
                <Text></Text>
              )}
            </View>
          );
        },
      }}
    />

    <Tabs.Screen
      name="Map"
      component={MapStackScreen}
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View
              style={[
                styles.icon,
                { transform: [{ scale: focused ? 1.2 : 1 }] },
              ]}
            >
              <FontAwesome5 name="map-marked-alt" size={24} color="white" />
              {focused ? (
                <Text style={{ color: 'white' }}>•</Text>
              ) : (
                <Text></Text>
              )}
            </View>
          );
        },
      }}
    />
    <Tabs.Screen
      name="Browse"
      component={BrowseStackScreen}
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <View
              style={[
                styles.icon,
                { transform: [{ scale: focused ? 1.2 : 1 }] },
              ]}
            >
              <FontAwesome5 name="search" size={24} color="white" />
              {focused ? (
                <Text style={{ color: 'white' }}>•</Text>
              ) : (
                <Text></Text>
              )}
            </View>
          );
        },
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarIcon: ({ focused, color }) => {
          return (
            <View
              style={[
                styles.icon,
                { transform: [{ scale: focused ? 1.2 : 1 }] },
              ]}
            >
              <FontAwesome5 name="user-alt" size={24} color="white" />

              {focused ? (
                <Text style={{ color: 'white' }}>•</Text>
              ) : (
                <Text></Text>
              )}
            </View>
          );
        },
      }}
    />
  </Tabs.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({ userNow }) => {
  const { userData } = useContext(UserContext);
  return (
    <RootStack.Navigator>
      {!userNow || !userData ? (
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <RootStack.Screen
            name="App"
            component={TabsScreen}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Post"
            component={PostStackScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </RootStack.Navigator>
  );
};

export default function App() {
  const [userNow, setUserNow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserNow(user);
      } else {
        setUserNow(false);
      }
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }
  return (
    <UserProvider>
      <TopicProvider>
        <PositionProvider>
          <ImageProvider>
            <SafeAreaView style={styles.container}>
              <NavigationContainer>
                <RootStackScreen userNow={userNow} />
              </NavigationContainer>
            </SafeAreaView>
          </ImageProvider>
        </PositionProvider>
      </TopicProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#253334',
  },

  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
