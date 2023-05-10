import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import SingleComment from "./SingleComment";

const Comments = (props) => {
  return (
    <View style={styles.container}>
      <SingleComment />
      <SingleComment />
      <Text
        style={{
          position: "absolute",
          alignSelf: "center",
          bottom: 0,
          fontWeight: "bold",
          color: "green",
          fontSize: 16,
        }}
      >
        Show all comments
      </Text>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    paddingTop: 10,
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
