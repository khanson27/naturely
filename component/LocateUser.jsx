import MapView, { Marker, Callout } from "react-native-maps";
import React, { useEffect, useState, useContext } from "react";
import { PositionContext } from "../context/positionContext";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export const LocateUser = ({ navigation }) => {
  const { postLocation, setPostLocation, setPostLocationName } =
    useContext(PositionContext);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
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
    const locName = await Location.reverseGeocodeAsync(userLocation);
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
    getLocation();
  }, []);
  if (userLocation) {
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
          region={postLocation}
          onRegionChangeComplete={(e) => {
            const distance = pythagoras(
              postLocation.latitude,
              postLocation.longitude,
              e.latitude,
              e.longitude
            );
            if (distance > e.longitudeDelta / 3) {
              setPostLocation(e);
            }
          }}
          ref={(ref) => {
            setMap(ref);
          }}
          showsUserLocation={true}
          mapType="hybrid"
        >
          <Marker
            coordinate={postLocation}
            onDragEnd={(e) => {
              console.log(e.nativeEvent);
              setPostLocation((currLocation) => {
                return {
                  ...currLocation,
                  ...e.nativeEvent.coordinate,
                };
              });
            }}
            draggable
            title="Where?"
          ></Marker>
        </MapView>

        <TouchableOpacity
          style={[styles.bottom]}
          onPress={() => {
            getLocationsName();
            navigation.pop();
          }}
        >
          <Text style={styles.text}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <Text>Loading</Text>;
  }
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
    backgroundColor: "#253334",
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
});
