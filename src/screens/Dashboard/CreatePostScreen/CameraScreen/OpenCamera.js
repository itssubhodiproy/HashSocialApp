import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { CARD_HEIGHT, CARD_WIDTH } from "../../../../Constants";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const OpenCamera = () => {
  let isFocused = useIsFocused();
  const [flash, setFlash] = useState(false);
  const [cameraFrontFace, setCameraFrontFace] = useState(false);

  const [photoFromCamera, setPhotoFromCamera] = useState(null);
  const [photoFromGallery, setPhotoFromGallery] = useState(null);

  const [videoFromCamera, setVideoFromCamera] = useState(null);
  const [videoFromGallery, setVideoFromGallery] = useState(null);

  // video recording started
  // First, we declare a new state to keep track of the video recording duration
  const [recordingDuration, setRecordingDuration] = useState(0);
  // We add a new timer state that starts and stops based on the user's action
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const [startVideo, setStartVideo] = useState(false);

  const navigation = useNavigation();
  let cameraRef;

  const ClickImage = async () => {
    console.log("Image Clicked");
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhotoFromCamera(photo);
    }
  };

  const pickImageFromGallery = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [16, 9],
      quality: 1,
    });
    // console.log(result.assets[0]);
    if (!result.canceled) {
      setPhotoFromGallery(result.assets[0]);
    }
  };

  const startVideoRecording = async () => {
    if (cameraRef) {
      setStartVideo(true);
      // Now we start the timer when video recording starts
      setTimerRunning(true);
      const video = await cameraRef.recordAsync({
        VideoQuality: ["1080p"],
        maxDuration: 60,
        videoBitrate: 3.5 * 1000 * 1000,
      });
      setVideoFromCamera(video);
    }
  };
  const stopVideoRecording = async () => {
    if (cameraRef) {
      setStartVideo(false);
      cameraRef.stopRecording();
      // And stop the timer when video recording stops
      setTimerRunning(false);
    }
  };
  // This function will be called repeatedly by the timer to update the recording duration
  const updateRecordingDuration = () => {
    setRecordingDuration((duration) => duration + 1);
  };
  const handlePressIn = () => {
    // If the user presses the button and timer is not running, start video recording
    if (!timerRunning) {
      startVideoRecording();
    }
    // Start the timer (if it is not already running)
    setTimerRunning(true);
    // Start updating the recording duration every second
    const timerId = setInterval(updateRecordingDuration, 1000);
    setTimerId(timerId);
  };
  const handlePressOut = () => {
    // Stop video recording if it is currently running
    if (startVideo) {
      stopVideoRecording();
    }
    // Stop the timer and reset the recording duration
    clearInterval(timerId);
    setRecordingDuration(0);
    setTimerRunning(false);
  };

  const BackToTopTabScreen = () => {
    navigation.navigate("TopTabScreen");
  };

  // this useEffect will run when the screen is focused
  useEffect(() => {
    console.log("isFocused CameraScreen", isFocused);
    if (isFocused) {
      setPhotoFromCamera(null);
      setPhotoFromGallery(null);
      setVideoFromCamera(null);
      setVideoFromGallery(null);
    }
    if (
      photoFromCamera ||
      photoFromGallery ||
      videoFromCamera ||
      videoFromGallery
    ) {
      let object =
        photoFromCamera ||
        photoFromGallery ||
        videoFromCamera ||
        videoFromGallery;
      navigation.navigate("PreviewScreen", {
        cameraFile: object,
      });
    }
  }, [
    isFocused,
    photoFromCamera,
    photoFromGallery,
    videoFromCamera,
    videoFromGallery,
  ]);

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
          <View style={styles.bottombar}>
            <TouchableOpacity onPress={pickImageFromGallery}>
              <Image
                source={require("../../../../../assets/gallery.png")}
                style={styles.bottom_button}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity onPress={ClickImage}>
              <Image
                source={require("../../../../../assets/camera-click.png")}
                style={styles.bottom_button}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              // onPressIn={handlePressIn}
              // onPressOut={handlePressOut}
              onPress={!timerRunning ? handlePressIn : handlePressOut}
            >
              <Image
                source={
                  !timerRunning
                    ? {
                        uri: "https://cdn-icons-png.flaticon.com/512/1073/1073705.png",
                      }
                    : {
                        uri: "https://cdn-icons-png.flaticon.com/512/715/715343.png",
                      }
                }
                style={styles.bottom_button}
              ></Image>
            </TouchableOpacity>

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
          <View style={styles.flash_button_position}>
            <TouchableOpacity onPress={() => setFlash((flash) => !flash)}>
              <Image
                source={require("../../../../../assets/camera-flash.png")}
                style={styles.bottom_button}
              ></Image>
            </TouchableOpacity>
          </View>
          {startVideo && (
            <View
              style={{
                position: "absolute",
                bottom: 100,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                {recordingDuration}
              </Text>
            </View>
          )}
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
  flash_button_position: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
