import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "./CameraScreen";
import PreviewScreen from "./PreviewScreen";
import CreateScreen from "./CreateScreen";
import OpenCamera from "./CameraScreen/OpenCamera";
import CameraPermission from "./CameraScreen/CameraPermission";

const Stack = createStackNavigator();
const CreatePostScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="CameraScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
      <Stack.Screen name="CreateScreen" component={CreateScreen} />
      <Stack.Screen name="OpenCamera" component={OpenCamera} />
      <Stack.Screen name="CameraPermission" component={CameraPermission} />
    </Stack.Navigator>
  );
};

export default CreatePostScreen;
