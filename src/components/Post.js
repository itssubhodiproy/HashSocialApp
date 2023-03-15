import { StyleSheet, View, Image, Dimensions, Text } from "react-native";
import React from "react";

const CARD_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Dimensions.get("window").height;

export default function Post({ item }) {
  return (
    <View style={styles.imageContainer}>
      <Image
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        style={styles.image}
        source={{ uri: item }}
      ></Image>
      {/* <View style={styles.UserProfile}>
        <Text>Profile</Text>
      </View> */}
      <View style={styles.badges}>
        <Image
          style={styles.singleBadge}
          source={require("../../assets/badge1.png")}
        />
        <Image
          style={styles.singleBadge}
          source={require("../../assets/badge3.png")}
        />
        <Image
          style={styles.singleBadge}
          source={require("../../assets/badge3.png")}
        />
      </View>
      <View style={styles.recepieMetrics}>
        <View style={styles.singleRecepieMetrics}>
          <Text style={styles.mainText}>15</Text>
          <Text style={styles.nonMainText}>mins</Text>
        </View>
        <View style={styles.singleRecepieMetrics}>
          <Text style={styles.mainText}>568</Text>
          <Text style={styles.nonMainText}>Kcal</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    maxHeight: 900,
    maxWidth: 600,
  },
  UserProfile: {
    position: "absolute",
    bottom: 100,
    width: 200,
    height: 200,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
  },
  badges: {
    position: "absolute",
    top: 60,
    left: 0,
    width: 180,
    height: 60,
    // backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  singleBadge: {
    width: 50,
    height: 50,
    resizeMode: "cover",
  },
  recepieMetrics: {
    position: "absolute",
    top: 60,
    right: 15,
    width: 60,
    height: 130,
    // backgroundColor: "rgba(0,0,0,0.2)",
    // borderRadius: 5,
    // flexDirection: "column",
    justifyContent: "space-evenly",
  },
  singleRecepieMetrics: {
    width: 60,
    height: 60,
    margin: 5,
    padding: 5,
    resizeMode: "cover",
    backgroundColor: "#cacccb",
    opacity: 0.8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  nonMainText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
  },
});
