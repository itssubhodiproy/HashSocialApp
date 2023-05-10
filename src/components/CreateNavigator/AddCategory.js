import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const SingleCategory = ({ item }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: item ? "white" : "#fc433c",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        borderWidth: item ? 1 : 0,
        borderColor: "#fc433c",
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: "500",
          color: item ? "#fc433c" : "white",
        }}
      >
        Category
      </Text>
    </TouchableOpacity>
  );
};

const AddCategory = () => {
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <SingleCategory item="hello" />
        <SingleCategory />
        <SingleCategory />
        <SingleCategory />
        <SingleCategory />
      </View>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
});
