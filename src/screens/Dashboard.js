import { StyleSheet } from "react-native";
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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

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
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarLabelStyle: { fontSize: 10, fontWeight: "bold" },
        tabBarAndroidRipple: { borderless: false },
        tabBarIndicatorStyle: {
          backgroundColor: "white",
          height: 2,
          width: 40,
          marginHorizontal: 24,
          borderRadius: 10,
        },
        tabBarIndicatorContainerStyle: {
          backgroundColor: "transparent",
          borderWidth: 0,
        },
        tabBarStyle: {
          backgroundColor: "transparent",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
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
});
