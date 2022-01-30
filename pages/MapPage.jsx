import MapView, { Marker, Callout } from "react-native-maps";
import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import * as Location from "expo-location";
import { ImageContext } from "../context/imageContext";

const LOCATIONS = [
  [0.02, -0.01],
  [-0.1, 0.09],
  [0.05, 0.03],
  [0.008, 0.09],
  [-0.003, -0.2],
];
export const MapPage = () => {
  const { img } = useContext(ImageContext);
  const [userLocation, setUserLocation] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location);
  };

  useEffect(() => {
    getLocation();
  }, []);

  const [markers, setMarkers] = useState([
    {
      title: "my house!",
      coordinate: { lat: 53.26862, long: -2.45847 },
      description: "pretty self explanitory init?",
    },
    {
      title: "northcoders!",
      coordinate: { lat: 53.467258, long: -2.23467 },
      description: "the land of happy coders!",
    },
  ]);
  const [region, setRegion] = React.useState({
    latitude: 53.467258,
    longitude: -2.2,
    latitudeDelta: 0.0922 * 10,
    longitudeDelta: 0.0421 * 10,
  });
  const [slideValue, setSlideValue] = useState(0);
  const [showLocation, setShowLocation] = useState([0, 0, 0]);
  const [map, setMap] = useState(null);

  function log(eventName, e) {
    console.log(eventName, e.nativeEvent);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider="google"
        onRegionChangeComplete={async (e) => {
          setShowLocation([e.latitude, e.longitude, e.longitudeDelta]);
          const limits = await map.getMapBoundaries();
          //console.log(limits);
        }}
        initialRegion={{
          latitude: 53.467258,
          longitude: -2.2,
          latitudeDelta: 0.0922 * 10,
          longitudeDelta: 0.0423 * 10,
        }}
        ref={(ref) => {
          setMap(ref);
        }}
        showsUserLocation={true}
        mapType="hybrid"
      >
        {LOCATIONS.map((location, index) => {
          return (
            <Marker
              coordinate={{
                latitude: region.latitude + location[0],
                longitude: region.longitude + location[1],
              }}
              key={index}
            >
              <View
                style={{
                  transform: [{ scale: 1 - showLocation[2] / 100 }],
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
                      uri: img.uri,
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

        {markers.map((location, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: location.coordinate.lat,
                longitude: location.coordinate.long,
              }}
              title={location.title}
              description={location.description}
            />
          );
        })}

        {userLocation ? (
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            onDragEnd={(e) => log("onDragEnd", e)}
            onPress={(e) => log("onPress", e)}
            draggable
            title="move me"
          ></Marker>
        ) : null}
      </MapView>
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 20,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    flex: 0.2,
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    height: 45,
  },
  text: {
    fontSize: 18,
    color: "white",
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
  button: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 999,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bottom: {
    zIndex: 999,
    position: "absolute",
    top: Dimensions.get("window").height - 130,
    left: 0,
    width: "100%",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    paddingVertical: 40,
    paddingHorizontal: 0,
    backgroundColor: "black",
  },
  text: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  location: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    zIndex: 999,
    position: "absolute",
    top: Dimensions.get("window").height - Dimensions.get("window").height / 2,
    left: 80,
  },
});
