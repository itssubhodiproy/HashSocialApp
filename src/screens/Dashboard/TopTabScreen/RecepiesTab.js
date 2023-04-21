import { StyleSheet, Text, View } from "react-native";
import React from "react";

const RecepiesTab = () => {
  return (
    <View style={styles.container}>
      <Text>RecepiesTab</Text>
    </View>
  );
};

export default RecepiesTab;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
