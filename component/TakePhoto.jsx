import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import Slider from "@react-native-community/slider";
import { ImageContext } from "../context/imageContext";
import { Ionicons, Entypo } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export const TakePhoto = ({ navigation }) => {
  const { setImg } = useContext(ImageContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState("off");
  const [loading, setLoading] = useState(false);
  const [slideValue, setSlideValue] = useState(0);
  const [camera, setCamera] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.pop();
          }}
        >
          <Entypo name="cross" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Ionicons name="md-camera-reverse-outline" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setFlashMode(flashMode === "off" ? "on" : "off");
          }}
        >
          {flashMode === "on" ? (
            <Ionicons name="flash" size={40} color="white" />
          ) : (
            <Ionicons name="flash-off" size={40} color="white" />
          )}
        </TouchableOpacity>
      </View>
      <Camera
        ref={(ref) => {
          setCamera(ref);
        }}
        style={styles.camera}
        type={type}
        flashMode={flashMode}
        zoom={slideValue}
        ratio="1:1"
      >
        <Text
          style={{
            fontSize: 42,
            color: "white",
          }}
        >
          {loading ? "Loading..." : ""}
        </Text>
      </Camera>

      <View style={styles.bottomView}>
        <Text style={styles.text}>Zoom: {Math.floor(slideValue * 100)}%</Text>
        <Slider
          style={{
            width: 250,
            height: 50,
          }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFAFF"
          maximumTrackTintColor="#002300"
          value={slideValue}
          onValueChange={(value) => setSlideValue(value)}
        />
        <View style={styles.photoOuterBorder}>
          <TouchableOpacity
            style={styles.takePhoto}
            onPress={async () => {
              if (camera) {
                setLoading(true);
                const photo = await camera.takePictureAsync({
                  skipProcessing: true,
                  quality: 0.2,
                });
                setLoading(false);
                setImg({
                  ...photo,
                  width: width > 700 ? 700 : width - 20,
                  height: width > 700 ? 700 : width - 20,
                });
                navigation.pop();
              }
            }}
          >
            <Text style={styles.text}> </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
//console.log(Dimensions.get("window").height / Dimensions.get("window").width);
const styles = StyleSheet.create({
  camera: {
    width: width,
    height: width,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomView: {
    height: (height - width) * 0.8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  buttonContainer: {
    height: (height - width) * 0.2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
  },
  button: {
    alignItems: "center",
  },
  takePhoto: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "black",
  },
  photoOuterBorder: {
    borderRadius: 60,
    borderWidth: 5,
    padding: 5,
    backgroundColor: "white",
  },

  text: {
    fontSize: 18,
    color: "white",
  },
});
