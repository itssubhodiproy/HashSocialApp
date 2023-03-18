import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ingredients from "./Ingredients";
import Directions from "./Directions";
import Comments from "./Comments";

const NavigatorModal = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Ingredients"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 10, fontWeight: "bold" },
        tabBarAndroidRipple: { borderless: false },
        tabBarIndicatorStyle: {
          backgroundColor: "black",
          height: 3,
          borderRadius: 10,
        },
        tabBarIndicatorContainerStyle: {
          backgroundColor: "white",
          borderWidth: 0,
        },
        tabBarStyle: {
          backgroundColor: "white",
        },
        // swipeEnabled: false,
      }}
    >
      <Tab.Screen
        name="Ingredients"
        component={Ingredients}
        options={{
          tabBarLabel: "Ingredients",
        }}
      />
      <Tab.Screen
        name="Directions"
        component={Directions}
        options={{
          tabBarLabel: "Directions",
        }}
      />
      <Tab.Screen
        name="Comments"
        component={Comments}
        options={{
          tabBarLabel: "Comments",
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigatorModal;

const styles = StyleSheet.create({});
