import React, { useState } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import Post from "../components/Post";
import { images } from "../../assets/images";
import { StatusBar } from "expo-status-bar";

const CARD_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Dimensions.get("window").height;

const Feed = () => {
  // const { __startCamera } = route.params;
  const [canSee, setCanSee] = useState(true);

  const seeHandler = () => {
    setCanSee(!canSee);
  };

  return (
    <>
      <FlatList
        snapToInterval={CARD_HEIGHT}
        snapToAlignment="center"
        decelerationRate={"fast"}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={true}
        initialNumToRender={7}
        renderItem={({ item }) => (
          <Post
            item={item}
            seeHandler={seeHandler}
            canSee={canSee}
          />
        )}
      />
      {/* <StatusBar style="light"/> */}
    </>
  );
};
const styles = StyleSheet.create({
  container: {},
});

export default Feed;
