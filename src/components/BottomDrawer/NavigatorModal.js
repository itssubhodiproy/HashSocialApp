import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ingredients from "./Ingredients";
import Directions from "./Instructions";
import Comments from "./Comments";
import Instructions from "./Instructions";

const NavigatorModal = ({ item }) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Instructions"
      screenOptions={{
        swipeEnabled: false,
        tabBarLabelStyle: { fontSize: 10, fontWeight: "bold" },
        tabBarAndroidRipple: { borderless: false },
        tabBarIndicatorStyle: {
          backgroundColor: "#fc433c",
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
      }}
    >
      <Tab.Screen
        name="Instructions"
        // component={Instructions}
        children={() => <Instructions item={item} />}
        options={{
          tabBarLabel: "Instructions",
        }}
      />
      <Tab.Screen
        name="Ingredients"
        component={Ingredients}
        options={{
          tabBarLabel: "Ingredients",
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
