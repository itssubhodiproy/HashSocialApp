import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CreateIngredients = () => {
  return (
    <View style={styles.container}>
      <Text>1. CreateIngredients</Text>
      <Text>2. CreateIngredients</Text>
    </View>
  );
};

export default CreateIngredients;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    padding: 20,
  },
});
