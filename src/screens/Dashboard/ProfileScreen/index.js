import { createStackNavigator } from "@react-navigation/stack";
import UserProfileScreen from "./UserProfileScreen";
import SettingsScreen from "./SettingsScreen";

const Stack = createStackNavigator();
const ProfileScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserProfile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileScreen;
