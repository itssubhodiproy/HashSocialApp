import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreateIngredients from "./CreateIngredients";
import CreateInstructions from "./CreateInstructions";

const CreateNavigator = ({
  Instructions,
  deleteInstruction,
  updateInstruction,
  changeCover,
  addIngredientsToState,
  Ingredients,
  updateIngredientText,
  incrementQuantity,
  decrementQuantity,
  deleteIngredients,
}) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="CreateInstructions"
      screenOptions={{
        swipeEnabled: false,
        tabBarLabelStyle: { fontSize: 10, fontWeight: "bold" },
        tabBarAndroidRipple: { borderless: false },
        tabBarIndicatorStyle: {
          backgroundColor: "#fc433c",
          height: 2,
          borderRadius: 10,
        },
        tabBarIndicatorContainerStyle: {
          backgroundColor: "transparent",
          borderWidth: 0,
        },
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="CreateInstructions"
        children={() => (
          <CreateInstructions
            Instructions={Instructions}
            // addInstructionsToState={addInstructionsToState}
            deleteInstruction={deleteInstruction}
            updateInstruction={updateInstruction}
            changeCover={changeCover}
          />
        )}
        options={{
          tabBarLabel: "Instructions",
        }}
      />
      <Tab.Screen
        name="CreateIngredients"
        // component={CreateIngredients}
        children={() => (
          <CreateIngredients
            addIngredientsToState={addIngredientsToState}
            Ingredients={Ingredients}
            updateIngredientText={updateIngredientText}
            deleteIngredients={deleteIngredients}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        )}
        options={{
          tabBarLabel: "Ingredients",
        }}
      />
      <Tab.Screen
        name="Category"
        component={CreateIngredients}
        options={{
          tabBarLabel: "Category",
        }}
      />
    </Tab.Navigator>
  );
};

export default CreateNavigator;

const styles = StyleSheet.create({});
