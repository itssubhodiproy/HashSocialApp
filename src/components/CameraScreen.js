import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const CameraScreen = () => {
  const { width } = useWindowDimensions();
  const height = Math.round((width * 16) / 9);
  const [startCamera, setStartCamera] = useState(false);
  const navigation = useNavigation();

  // start camera function
  let camera;
  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log(status);
    if (status == "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  return (
    <View style={styles.container}>
      <Camera
        style={{ height: "100%", width: "125%" }}
        ref={(r) => {
          camera = r;
        }}
        ratio="16:9"
      />
      <View style={styles.bottombar}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/camera-flash.png")}
            style={styles.bottom_button}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/camera-click.png")}
            style={styles.bottom_button}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/camera-switch.png")}
            style={styles.bottom_button}
          ></Image>
        </TouchableOpacity>
      </View>
      <Text style={styles.buttom_text}>Tap for image and hold for video</Text>
      <StatusBar backgroundColor="transparent" style="light"></StatusBar>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  bottombar: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bottom_button: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
  buttom_text: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    width: "100%",
    textAlign: "center",
    color: "white",
  },
});
