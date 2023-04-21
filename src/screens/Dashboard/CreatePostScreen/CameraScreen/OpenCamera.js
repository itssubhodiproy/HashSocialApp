import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { CARD_HEIGHT, CARD_WIDTH } from "../../../../Constants";
import { useNavigation } from "@react-navigation/native";

const OpenCamera = () => {
  const [flash, setFlash] = useState(false);
  const [cameraFrontFace, setCameraFrontFace] = useState(false);
  const [startVideoRecording, setStartVideoRecording] = useState(false);
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();
  let cameraRef;

  let isFocused = useIsFocused();

  const ClickImage = async () => {
    console.log("Image Clicked");
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo);
      navigation.navigate("PreviewScreen", { photo });
    }
  };

  const RecordVideo = () => {
    console.log("Video Recording");
    setStartVideoRecording(true);
  };

  const SubmitVideo = () => {
    console.log("Video Submitted");
    setStartVideoRecording(false);
  };

  const BackToTopTabScreen = () => {
    navigation.navigate("TopTabScreen");
  };

  console.log("isFocused", isFocused);

  return (
    <View style={styles.container}>
      {isFocused && (
        <>
          <Camera
            style={{ height: CARD_HEIGHT, width: CARD_WIDTH }}
            ref={(ref) => (cameraRef = ref)}
            ratio="16:9"
            flashMode={
              flash
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }
            type={
              cameraFrontFace
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            }
          />
          {/* <Camera style={{ height: CARD_HEIGHT, width: CARD_WIDTH }} /> */}
          <View style={styles.bottombar}>
            <TouchableOpacity onPress={() => setFlash((flash) => !flash)}>
              <Image
                source={require("../../../../../assets/camera-flash.png")}
                style={styles.bottom_button}
              ></Image>
            </TouchableOpacity>
            {!startVideoRecording ? (
              <TouchableOpacity onPress={ClickImage} onLongPress={RecordVideo}>
                <Image
                  source={require("../../../../../assets/camera-click.png")}
                  style={styles.bottom_button}
                ></Image>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={SubmitVideo}>
                <Image
                  source={require("../../../../../assets/pause.png")}
                  style={styles.bottom_button}
                ></Image>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() =>
                setCameraFrontFace((cameraFrontFace) => !cameraFrontFace)
              }
            >
              <Image
                source={require("../../../../../assets/camera-switch.png")}
                style={styles.bottom_button}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text style={styles.buttom_text}>
            Tap for image and hold for video
          </Text>
          <View style={styles.backButtonPosition}>
            <TouchableOpacity onPress={BackToTopTabScreen}>
              <Image
                source={require("../../../../../assets/back.png")}
                style={styles.bottom_button}
              ></Image>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default OpenCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
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
  backButtonPosition: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});
