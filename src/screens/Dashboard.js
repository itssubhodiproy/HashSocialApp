import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"; // or 'firebase/firestore'
import Feed from "../components/Feed";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Profile from "./Profile";
import Form from "./Form";

const Tab = createMaterialTopTabNavigator();

const Dashboard = () => {
  const [user, setUser] = useState();

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="black"
      inactiveColor="grey"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 10, fontWeight: "bold" },
        tabBarAndroidRipple: { borderless: false },
        tabBarIndicatorStyle: { backgroundColor: "black" },
        tabBarStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="For You"
        component={Feed}
        options={{
          tabBarLabel: "For You",
        }}
      />
      <Tab.Screen
        name="Following"
        component={Feed}
        options={{
          tabBarLabel: "Following",
        }}
      />
      <Tab.Screen
        name="Recepies"
        component={Feed}
        options={{
          tabBarLabel: "Recepies",
        }}
      />
      <Tab.Screen
        name="Discovery"
        component={Feed}
        options={{
          tabBarLabel: "Discovery",
        }}
      />
    </Tab.Navigator>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#e6e8e6",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
  upload_bar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#d2d4d2",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  upload_icon: {
    width: 20,
    height: 20,
  },
});
