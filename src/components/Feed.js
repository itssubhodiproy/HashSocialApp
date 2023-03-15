import React, { useState } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import Post from "./Post";
import { images } from "../../assets/images";

const CARD_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Dimensions.get("window").height;

const Feed = () => {
  return (
    <View style={styles.container}>
      <FlatList
        snapToInterval={CARD_HEIGHT}
        snapToAlignment="center"
        decelerationRate={"fast"}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={true}
        renderItem={({ item }) => (
          <Post item={item} CARD_WIDTH={CARD_WIDTH} CARD_HEIGHT={CARD_HEIGHT} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: "realative",
    // zIndex: 1,
  },
  // image: {
  //   width: CARD_WIDTH,
  //   height: CARD_HEIGHT,
  //   maxHeight: 900,
  //   maxWidth: 600,
  //   resizeMode: "cover",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});

export default Feed;
