import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FollowingTab = () => {
  return (
    <View style={styles.container}>
      <Text>FollowingTab</Text>
    </View>
  );
};

export default FollowingTab;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
