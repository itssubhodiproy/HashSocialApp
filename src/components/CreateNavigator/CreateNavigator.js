import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreateIngredients from "./CreateIngredients";
import CreateInstructions from "./CreateInstructions";

const CreateNavigator = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="CreateInstructions"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 10, fontWeight: "bold" },
        tabBarAndroidRipple: { borderless: false },
        tabBarIndicatorStyle: {
          backgroundColor: "#fc433c",
          height: 2,
          borderRadius: 10,
        },
        tabBarIndicatorContainerStyle: {
          backgroundColor: "white",
        },
        tabBarStyle: {
          backgroundColor: "white",
          width:"100%",
          borderRadius: 10,
        },
      }}
    >
      <Tab.Screen
        name="CreateInstructions"
        component={CreateInstructions}
        options={{
          tabBarLabel: "Instructions",
        }}
      />
      <Tab.Screen
        name="CreateIngredients"
        component={CreateIngredients}
        options={{
          tabBarLabel: "Ingredients",
        }}
      />
    </Tab.Navigator>
  );
};

export default CreateNavigator;

const styles = StyleSheet.create({});
