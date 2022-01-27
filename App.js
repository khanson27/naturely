import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Test } from "./component/Test";
import { useContext, useEffect, useState } from "react";
import { UserProvider, UserContext } from "./context/userContext";
import { BrowsePage } from "./pages/BrowsePage";
import { HomePage } from "./pages/HomePage";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { MapPage } from "./pages/MapPage";
import { PostPage } from "./pages/PostPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { LocateUser } from "./component/LocateUser";
import { NavBar } from "./component/NavBar";
import { Header } from "./component/Header";
import { UsersProfile } from "./component/UsersProfile";
import { UploadType } from "./component/UploadType";
import { TakePhoto } from "./component/TakePhoto";
import { SinglePost } from "./component/SinglePost";
import { auth, onAuthStateChanged } from "./firebase";
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
    <AuthStack.Screen
      name="TestPage"
      options={{ headerShown: false }}
      component={Test}
    />
  </AuthStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator initialRouteName="HomePage">
    <HomeStack.Screen
      name="HomePage"
      options={{ headerShown: false }}
      component={HomePage}
    />
    <HomeStack.Screen
      name="SinglePost"
      options={{ headerShown: false }}
      component={SinglePost}
    />
    <HomeStack.Screen
      name="UserProfile"
      options={{ headerShown: false }}
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
      options={{ headerShown: false }}
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
      options={{ headerShown: false }}
      component={BrowsePage}
    />
    <BrowseStack.Screen
      name="UsersProfile"
      options={{ headerShown: false }}
      component={UsersProfile}
    />
  </BrowseStack.Navigator>
);

const PostStack = createStackNavigator();
const PostStackScreen = () => (
  <PostStack.Navigator initialRouteName="PostPage">
    <PostStack.Screen
      name="PostPage"
      options={{ headerShown: false }}
      component={PostPage}
    />
    <PostStack.Screen
      name="UploadType"
      options={{ headerShown: false }}
      component={UploadType}
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

const Tabs = createBottomTabNavigator();

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Map" component={MapStackScreen} />
    <Tabs.Screen name="Browse" component={BrowseStackScreen} />
    <Tabs.Screen name="Post" component={PostStackScreen} />
    <Tabs.Screen name="Profile" component={ProfileStackScreen} />
  </Tabs.Navigator>
);

const RootStack = createStackNavigator();

export default function App() {
  const [userNow, setUserNow] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setUserNow(user);
      } else {
        setUserNow(false);
      }
    });
  }, []);

  return (
    <UserProvider>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <RootStack.Navigator>
            {!userNow ? (
              <RootStack.Screen
                name="Auth"
                component={AuthStackScreen}
                options={{
                  headerShown: false,
                }}
              />
            ) : (
              <RootStack.Screen
                name="App"
                component={TabsScreen}
                options={{
                  headerShown: false,
                }}
              />
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
