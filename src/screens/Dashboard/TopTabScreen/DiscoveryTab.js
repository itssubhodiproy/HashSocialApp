import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DiscoveryTab = () => {
  return (
    <View style={styles.container}>
      <Text>DiscoveryTab</Text>
    </View>
  );
};

export default DiscoveryTab;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
