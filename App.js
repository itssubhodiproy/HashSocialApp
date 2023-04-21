import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "./src/config/firebase";

// screens
import LoginScreen from "./src/screens/AuthScreen/LoginScreen";
import RegisterScreen from "./src/screens/AuthScreen/RegisterScreen";
import Dashboard from "./src/screens/Dashboard";
import { useEffect, useState } from "react";
// import Header from "./src/components/Header";
import CameraScreen from "./src/screens/CameraScreen";
import Preview from "./src/screens/Preview";
import CreateScreen from "./src/screens/CreateScreen";
import horizontalAnimation from "./src/components/horizontalAnimation";
import verticalAnimation from "./src/components/verticalAnimation";
import AuthScreens from "./src/screens/AuthScreen";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    // console.log(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <Stack.Navigator
      initialRouteName={user ? "Dashboard" : "AuthScreen"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={horizontalAnimation}
      />
      <Stack.Screen name="AuthScreen" component={AuthScreens} />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
