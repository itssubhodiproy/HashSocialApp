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
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Profile from "./Profile";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Form from "./Form";

const Tab = createMaterialBottomTabNavigator();

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

  useEffect(() => {
    // current logged in user
    const currentLoggedInuser = firebase.auth().currentUser;
    // get user data from firestore
    try {
      const retriveUserData = async () => {
        // retrieve user data from firestore based on uid
        const q = query(
          collection(firebase.firestore(), "users"),
          where("uid", "==", currentLoggedInuser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setUser(doc.data());
        });
      };
      retriveUserData();
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      activeColor="black"
      inactiveColor="grey"
      barStyle={{ backgroundColor: "#d2d4d2" }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Form"
        component={Form}
        options={{
          tabBarLabel: "Post",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus-circle-outline" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-settings"
              color={color}
              size={25}
            />
          ),
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
