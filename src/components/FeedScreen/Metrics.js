import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Metrics = ({item}) => {
  return (
    <View style={styles.recepieMetrics}>
      <View style={styles.singleRecepieMetrics}>
        <Text style={styles.mainText}>{item?.cookingTime}</Text>
        <Text style={styles.nonMainText}>mins</Text>
      </View>
      <View style={styles.singleRecepieMetrics}>
        <Text style={styles.mainText}>{item?.calories}</Text>
        <Text style={styles.nonMainText}>Kcal</Text>
      </View>
    </View>
  );
};

export default Metrics;

const styles = StyleSheet.create({
  recepieMetrics: {
    position: "absolute",
    top: 60,
    right: 15,
    width: 60,
    height: 130,
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
