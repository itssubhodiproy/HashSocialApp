import React, { useState } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import Post from "./Post";
import { images } from "../../assets/images";

const CARD_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Dimensions.get("window").height;

const Feed = () => {
  const [canSee, setCanSee] = useState(true);

  const seeHandler = () => {
    setCanSee(!canSee);
  };

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
          <Post item={item} seeHandler={seeHandler} canSee={canSee} />
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
