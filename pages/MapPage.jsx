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
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { LoadingPage } from "./LoadingPage";
import { getPosts } from "../Server/PostsData";
import CssPostCard from "../component/CssPostCard";
import { Button, Modal, Portal, Provider } from "react-native-paper";
import { ChooseTopic } from "../component/ChooseTopics";
import { Octicons } from "@expo/vector-icons";

export const MapPage = ({ navigation }) => {
  const { postLocation, setPostLocation, setPostLocationName } =
    useContext(PositionContext);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [map, setMap] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1000000000000000000000);
  const [selectedTopics, setSelectedTopics] = useState(["all"]);
  //const [loadingPost, setLoadingPosts] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
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
    setZoom(0.0922);
    setPostLocation(currLocation);
    setUserLocation(currLocation);
    return {
      LongitudeMin: location.coords.longitude - 1.5,
      LongitudeMax: location.coords.longitude + 1.5,
      LatitudeMin: location.coords.latitude - 1.5,
      LatitudeMax: location.coords.latitude + 1.5,
    };
  };

  const pythagoras = (x1, x2, y1, y2) => {
    return Math.abs(Math.sqrt((x1 - y1) ** 2 + (x2 - y2) ** 2));
  };

  useEffect(async () => {
    setIsLoading(true);
    const { LongitudeMax, LongitudeMin, LatitudeMin, LatitudeMax } =
      await getLocation();
    getPosts({
      Page: page,
      Topics: selectedTopics,
      // LongitudeMax,
      // LongitudeMin,
    }).then((data) => {
      //console.log(data);
      setAllPosts(data);
      setPosts(
        data.filter((post) => {
          // console.log(
          //   post.Longitude,
          //   LatitudeMin - 0.2,
          //   post.Longitude,
          //   LongitudeMax + 0.2,
          //   post.Latitude,
          //   LatitudeMax + 0.2,
          //   post.Latitude,
          //   LongitudeMin - 0.2
          // );
          if (
            post.Longitude > LongitudeMin - 0.2 &&
            post.Longitude < LongitudeMax + 0.2 &&
            post.Latitude < LatitudeMax + 0.2 &&
            post.Latitude > LatitudeMin - 0.2
          ) {
            return true;
          } else return false;
        })
      );
      setIsLoading(false);
    });
  }, []);

  const filterByTopic = () => {
    if (selectedTopics.length) {
      getPosts({ Page: 1000000000000000000000, Topics: selectedTopics }).then(
        (data) => {
          setAllPosts(data);
          setPosts(data);
        }
      );
    }
  };

  if (isLoading || !userLocation) {
    return <LoadingPage />;
  }

  return (
    <Provider>
      <View style={styles.container}>
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

        <TouchableOpacity style={styles.button} onPress={showModal}>
          <Octicons name="settings" size={24} color="white" />
        </TouchableOpacity>

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
              width: "67%",
              zIndex: 1000,
              top: 10,
              left: 10,
            },
            listView: { backgroundColor: "white", width: "100%" },
          }}
        />

        <MapView
          style={styles.map}
          provider="google"
          initialRegion={postLocation}
          onRegionChangeComplete={async (e) => {
            const limitsNew = await map.getMapBoundaries();
            // const distance = pythagoras(
            //   limits.northEast.latitude,
            //   limits.northEast.longitude,
            //   limits.southWest.latitude,
            //   limits.southWest.longitude
            // );
            // const distanceNew = pythagoras(
            //   limitsNew.northEast.latitude,
            //   limitsNew.northEast.longitude,
            //   limitsNew.southWest.latitude,
            //   limitsNew.southWest.longitude
            // );
            if (
              // Math.abs(distance - distanceNew) > 0.2 ||
              Math.abs(
                limits.southWest.longitude - limitsNew.southWest.longitude
              ) > 0.2 ||
              limits.southWest.latitude - limitsNew.southWest.latitude > 0.2
            ) {
              //  console.log(
              //     Math.abs(distance - distanceNew),
              //     distanceNew,
              //     distance
              //   );
              setLimits(limitsNew);
              setPostLocation(e);
              //console.log(e.longitudeDelta);
              setZoom(e.longitudeDelta);
              let LongitudeMax = limitsNew.northEast.longitude;
              let LongitudeMin = limitsNew.southWest.longitude;
              let LatitudeMax = limitsNew.northEast.latitude;
              let LatitudeMin = limitsNew.southWest.latitude;

              // console.log(
              //   limitsNew.northEast.longitude,
              //   limitsNew.southWest.longitude,
              //   limitsNew.northEast.latitude,
              //   limitsNew.southWest.latitude
              // );

              if (LongitudeMax < LongitudeMin) {
                [LongitudeMax, LongitudeMin] = [LongitudeMin, LongitudeMax];
              }
              if (LatitudeMax < LatitudeMin) {
                [LatitudeMax, LatitudeMin] = [LatitudeMin, LatitudeMax];
              }
              setPosts(
                allPosts.filter((post) => {
                  if (
                    post.Longitude > LongitudeMin - 0.05 &&
                    post.Longitude < LongitudeMax + 0.05 &&
                    post.Latitude < LatitudeMax + 0.05 &&
                    post.Latitude > LatitudeMin - 0.05
                  ) {
                    return true;
                  } else return false;
                })
              );
              //load new posts
              // getPosts({
              //   Page: page,
              //   Topics: selectedTopics,
              //   LongitudeMax: limitsNew.northEast.longitude,
              //   LongitudeMin: limitsNew.southWest.longitude,
              // }).then((data) => {
              //   setPosts(data);
              // });
            }
          }}
          ref={(ref) => {
            setMap(ref);
          }}
          showsUserLocation={true}
          mapType="hybrid"
        >
          {posts.map((post) => {
            //console.log("load");
            return (
              <Marker
                coordinate={{
                  latitude: post.Latitude,
                  longitude: post.Longitude,
                }}
                key={post.id}
              >
                <View
                  style={{
                    transform: [
                      {
                        scale: 1 - (zoom > 2 ? 0.12 : zoom / 4),
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
              <CssPostCard
                posts={item}
                pageUsed={"map"}
                navigation={navigation}
                onClick={map}
              />
            )}
            keyExtractor={(item) => item.id}
            style={{ paddingTop: 0 }}
            ItemSeparatorComponent={() => (
              <View style={{ marginVertical: 0 }}></View>
            )}
            // ListFooterComponent={() => (
            //   <View style={styles.mb5}>
            //     {!loadingPost ? (
            //       <Button
            //         mode="contained"
            //         dark={true}
            //         onPress={() => {
            //           setPage(posts[posts.length - 1].createdDate);
            //           loadPosts(posts[posts.length - 1].createdDate);
            //         }}
            //         color="#7C9A92"
            //         style={styles.Loading}
            //       >
            //         Load more...
            //       </Button>
            //     ) : (
            //       <Text style={styles.textThick}>Loading ...</Text>
            //     )}
            //   </View>
            // )}
          />
        </View>
      </View>
    </Provider>
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
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  button: {
    position: "absolute",
    top: 10,
    right: 55,
    zIndex: 999,
    backgroundColor: "#253334",
    paddingHorizontal: 0,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    width: "15%",
    borderRadius: 10,
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
  Loading: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  textThick: {
    fontWeight: "bold",
    color: "#FFF",
    paddingVertical: 6,
    alignSelf: "center",
    marginBottom: 40,
    fontSize: 20,
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
});
