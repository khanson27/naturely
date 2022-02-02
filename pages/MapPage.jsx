import MapView, { Marker, Callout } from "react-native-maps";
import React, { useEffect, useState, useContext } from "react";
import { PositionContext } from "../context/positionContext";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { LoadingPage } from "./LoadingPage";
import { getPosts } from "../Server/PostsData";
import CssPostCard from "../component/CssPostCard";
import { Button, Modal, Portal, Provider } from "react-native-paper";

export const MapPage = ({ navigation }) => {
  const { postLocation, setPostLocation, setPostLocationName } =
    useContext(PositionContext);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1000000000000000000000);
  const [loadingPost, setLoadingPosts] = useState(false);
  const [limits, setLimits] = useState({
    northEast: {
      latitude: 53.49682620500161,
      longitude: -2.1924976631999016,
    },
    southWest: {
      latitude: 53.40462612471012,
      longitude: -2.292027398943901,
    },
  });

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    const currLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setPostLocation(currLocation);
    setUserLocation(currLocation);
  };

  const getLocationsName = async () => {
    const locName = await Location.reverseGeocodeAsync(locationSearch);
    if (locName.length) {
      const {
        city,
        district,
        subregion,
        region,
        country,
        isoCountryCode,
        name,
        postalCode,
      } = locName[0];
      setPostLocationName([
        city,
        district,
        subregion,
        region,
        country,
        isoCountryCode,
        name,
        postalCode,
      ]);
      // setPostLocationName(city || district || subregion || region || country);
    } else {
      Alert.alert("Locations within oceans are not supported");
    }
  };

  const pythagoras = (x1, x2, y1, y2) => {
    return Math.abs(Math.sqrt((x1 - y1) ** 2 + (x2 - y2) ** 2));
  };

  useEffect(() => {
    setIsLoading(true);
    getLocation();
    getPosts({ Page: page }).then((data) => {
      setPosts(data);
      setIsLoading(false);
    });
  }, []);

  const loadPosts = (newPage) => {
    setLoadingPosts(true);
    getPosts({ Page: newPage }).then((data) => {
      setPosts((curr) => {
        return [...curr, ...data];
      });
      setLoadingPosts(false);
    });
  };

  if (isLoading || !userLocation) {
    return <LoadingPage />;
  }

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search location"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          const searchedLocation = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          };
          setPostLocation(searchedLocation);
        }}
        query={{
          key: "AIzaSyAZ_TcJdgwv2a33-EW_x7yQgud2ECu9hWU",
          language: "en",
        }}
        styles={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1000,
            top: 55,
            paddingHorizontal: 10,
          },
          listView: { backgroundColor: "white" },
        }}
      />
      <MapView
        style={styles.map}
        provider="google"
        initialRegion={postLocation}
        onRegionChangeComplete={async (e) => {
          const limitsNew = await map.getMapBoundaries();
          const distance = pythagoras(
            limits.northEast.latitude,
            limits.northEast.longitude,
            limits.southWest.latitude,
            limits.southWest.longitude
          );
          const distanceNew = pythagoras(
            limitsNew.northEast.latitude,
            limitsNew.northEast.longitude,
            limitsNew.southWest.latitude,
            limitsNew.southWest.longitude
          );
          if (Math.abs(distance - distanceNew) > 0.2) {
            console.log(
              Math.abs(distance - distanceNew),
              distanceNew,
              distance
            );
            setLimits(limitsNew);
            setPostLocation(e);
            //load new posts
          }
        }}
        ref={(ref) => {
          setMap(ref);
        }}
        showsUserLocation={true}
        mapType="hybrid"
      >
        {posts.map((post) => {
          console.log(post.Latitude1);
          console.log(postLocation.longitudeDelta);
          return (
            <Marker
              coordinate={{
                latitude: post.Latitude1,
                longitude: post.Longitude1,
              }}
              key={post.id}
            >
              <View
                style={{
                  transform: [
                    {
                      scale:
                        1 -
                        (postLocation.longitudeDelta > 2.5
                          ? 0.2
                          : postLocation.longitudeDelta / 4),
                    },
                  ],
                }}
              >
                <View
                  style={{
                    borderWidth: 10,
                    borderColor: "white",
                    width: 70,
                    height: 70,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: post.image,
                    }}
                    resizeMode={"cover"}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                    }}
                  />
                </View>
                <View style={styles.triangle} />
              </View>
            </Marker>
          );
        })}
      </MapView>

      <View style={[styles.bottom]}>
        <FlatList
          data={posts}
          horizontal={true}
          extraData={true}
          renderItem={({ item }) => (
            <CssPostCard posts={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          style={{ paddingTop: 30 }}
          ItemSeparatorComponent={() => (
            <View style={{ marginVertical: 5 }}></View>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  bottom: {
    zIndex: 999,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 0,
    height: "50%",
  },
  button: {
    position: "absolute",
    top: 60,
    left: 10,
    zIndex: 999,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 29.5,
    borderRightWidth: 29.5,
    borderBottomWidth: 25,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    alignSelf: "center",
    marginTop: -15,
    zIndex: -1,
    transform: [{ rotate: "180deg" }],
  },
});
