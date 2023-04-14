import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { firebase } from "./src/config/firebase";

// screens
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import Dashboard from "./src/screens/Dashboard";
import { useEffect, useState } from "react";
// import Header from "./src/components/Header";
import CameraScreen from "./src/screens/CameraScreen";
import Preview from "./src/screens/Preview";
import CreateScreen from "./src/screens/CreateScreen";
import horizontalAnimation from "./src/components/horizontalAnimation";
import verticalAnimation from "./src/components/verticalAnimation";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}

      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}

      />
      <Stack.Screen
        name="Preview"
        component={Preview}
        options={horizontalAnimation}
      />
      <Stack.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={verticalAnimation}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
