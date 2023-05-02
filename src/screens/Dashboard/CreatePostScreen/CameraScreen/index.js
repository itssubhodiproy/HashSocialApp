import { useEffect } from "react";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

const CameraScreen = ({ navigation }) => {
  let isFocused = useIsFocused();

  const checkMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      // User has camera permission, redirect to CameraScreen
      return true;
    } else if (status === "denied") {
      // User has previously denied camera permission, redirect to PermissionScreen
      return false;
    } else {
      // Camera permission has neither been granted nor denied
      return false;
    }
  };

  const checkCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      // User has camera permission, redirect to CameraScreen
      return true;
    } else if (status === "denied") {
      // User has previously denied camera permission, redirect to PermissionScreen
      return false;
    } else {
      // Camera permission has neither been granted nor denied
      return false;
    }
  };

  const checkAudioPermission = async () => {
    const { status } = await Camera.requestMicrophonePermissionsAsync();
    if (status === "granted") {
      // User has camera permission, redirect to CameraScreen
      return true;
    } else if (status === "denied") {
      // User has previously denied camera permission, redirect to PermissionScreen
      return false;
    } else {
      // Camera permission has neither been granted nor denied
      return false;
    }
  };

  const checkAllPermission = async () => {
    const cameraPermission = await checkCameraPermission();
    const mediaLibraryPermission = await checkMediaLibraryPermission();
    const audioPermission = await checkAudioPermission();
    if (cameraPermission && audioPermission && mediaLibraryPermission) {
      navigation.navigate("OpenCamera");
    } else {
      navigation.navigate("CameraPermission", { type: "camera" });
    }
  };

  useEffect(() => {
    if (isFocused) {
      checkAllPermission();
    }
  }, []);

  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default CameraScreen;
