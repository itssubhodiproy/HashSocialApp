import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Directions = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Directions</Text>
      <Text style={styles.subtext}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptate, quod, quia, voluptates quas voluptatibus quibusdam
      </Text>
    </View>
  );
};

export default Directions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    // display: "flex",
    // alignItems: "center",
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  subtext: {
    fontSize: 12,
    color: "grey",
    marginTop: 10,
  },
});
