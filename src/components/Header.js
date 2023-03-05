import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Header(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> {props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {},
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0782F9",
  },
});
