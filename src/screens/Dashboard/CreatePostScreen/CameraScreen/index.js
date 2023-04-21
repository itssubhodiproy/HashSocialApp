import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import OpenCamera from "./OpenCamera";
import CameraPermission from "./CameraPermission";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const Stack = createStackNavigator();

const CameraScreen = ({ navigation }) => {
  const [hasAllPermission, setHasAllPermission] = useState(false);
  let isFocused = useIsFocused();
  const [status, requestPermission] = Camera.useCameraPermissions();
  const isTrue = Camera.getCameraPermissionsAsync();

  const checkCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      // User has camera permission, redirect to CameraScreen
      console.log("Camera permission granted");
      navigation.navigate("OpenCamera");
      // setHasAllPermission(true);
    } else if (status === "denied") {
      // User has previously denied camera permission, redirect to PermissionScreen
      console.log("Camera permission denied");
      navigation.navigate("CameraPermission", { type: "camera" });
    } else {
      // Camera permission has neither been granted nor denied
      console.log("Camera permission request required");
    }
  };

  useEffect(() => {
    if (isFocused) {
      checkCameraPermission();
    }
  }, []);

  return (
    <>
      {/* <Stack.Navigator
        // initialRouteName="CameraScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
        <Stack.Screen name="CreateScreen" component={CreateScreen} />
        <Stack.Screen name="OpenCamera" component={OpenCamera} />
        <Stack.Screen name="CameraPermission" component={CameraPermission} />
      </Stack.Navigator> */}
      <View>
        <ActivityIndicator size="large" />
      </View>
    </>
  );
};

export default CameraScreen;
