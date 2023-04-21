import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Badges = () => {
  return (
    <View style={styles.badges}>
      <Image
        style={styles.singleBadge}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/6270/6270515.png",
        }}
      />
      <Image
        style={styles.singleBadge}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3314/3314467.png",
        }}
      />
      <Image
        style={styles.singleBadge}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/2583/2583264.png",
        }}
      />
    </View>
  );
};

export default Badges;

const styles = StyleSheet.create({
  badges: {
    position: "absolute",
    top: 60,
    left: 0,
    width: 180,
    height: 60,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // zIndex: 2,
  },
  singleBadge: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    margin: 2,
  },
});
