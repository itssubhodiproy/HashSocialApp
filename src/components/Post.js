import { StyleSheet, View, Image, Dimensions } from "react-native";
import React from "react";

const CARD_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Dimensions.get("window").height;

export default function Post({ item }) {
  return (
    <View>
      <Image
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        style={styles.image}
        source={{ uri: item }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    maxHeight: 900,
    maxWidth: 600,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
