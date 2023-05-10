import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SingleCategory = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor: item ? "white" : "red",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        borderWidth: item ? 1 : 0,
        borderColor: "red",
      }}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: "500",
          color: item ? "red" : "white",
        }}
      >
        Category
      </Text>
    </View>
  );
};

const AddCategory = () => {
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        <SingleCategory item="hello"/>
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
