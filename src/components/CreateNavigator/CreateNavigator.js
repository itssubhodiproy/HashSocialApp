import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreateIngredients from "./CreateIngredients";
import CreateInstructions from "./CreateInstructions";
import AddCategory from "./AddCategory";

const CreateNavigator = ({
  Instructions,
  deleteInstruction,
  updateInstruction,
  changeCover,
  addIngredientsToState,
  Ingredients,
  updateIngredientText,
  updateIngredientUnit,
  updateIngredientQuantity,
  deleteIngredients,
  changeCookingTime,
  changeCalories,
  calories,
  cookingTime,
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
            updateIngredientUnit={updateIngredientUnit}
            updateIngredientQuantity={updateIngredientQuantity}
            deleteIngredients={deleteIngredients}
            changeCalories={changeCalories}
            changeCookingTime={changeCookingTime}
            calories={calories}
            cookingTime={cookingTime}
          />
        )}
        options={{
          tabBarLabel: "Ingredients",
        }}
      />
      <Tab.Screen
        name="Category"
        component={AddCategory}
        options={{
          tabBarLabel: "Category",
        }}
      />
    </Tab.Navigator>
  );
};

export default CreateNavigator;

const styles = StyleSheet.create({});
