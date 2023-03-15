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
          backgroundColor: "white",
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
  }
});
