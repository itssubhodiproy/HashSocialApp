import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CreateInstructions = () => {
  return (
    <View style={styles.container}>
      <Text>1. CreateInstructions</Text>
      <Text>2. CreateInstructions</Text>
      <Text>3. CreateInstructions</Text>
    </View>
  );
};

export default CreateInstructions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    padding: 20,
  },
});
