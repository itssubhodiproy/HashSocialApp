import { StyleSheet, View, Image, Dimensions, Alert } from "react-native";
import React, { useState, memo } from "react";
import BottomDrawer from "react-native-bottom-drawer-view";
import BottomDrawerTab from "./BottomDrawer/BottomDrawer";
import { LinearGradient } from "expo-linear-gradient";
import Badges from "./FeedScreen/Badges";
import Metrics from "./FeedScreen/Metrics";
import UserDetails from "./FeedScreen/UserDetails";
import BottomBar from "./FeedScreen/BottomBar";
import { Camera } from "expo-camera";

const CARD_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Dimensions.get("window").height;

function Post({ item }) {
  const [canSee, setCanSee] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [startCamera, setStartCamera] = useState(false);

  const seeHandler = () => {
    setCanSee(!canSee);
  };
  const openDrawerHandler = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <View>
      <LinearGradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.topGradient}
      />
      <Image
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        style={styles.image}
        source={{ uri: item }}
        onPress={openDrawerHandler}
      ></Image>
      {!openDrawer && (
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.bottomGradient}
        />
      )}

      {canSee && (
        <>
          {/* badges */}
          <Badges />
          {/* recepie metrics */}
          <Metrics />
          {/* user profile */}
          {!openDrawer && <UserDetails />}
        </>
      )}
      {/* bottomBar */}
      {!openDrawer && (
        <BottomBar
          seeHandler={seeHandler}
          canSee={canSee}
        />
      )}
      {openDrawer && (
        <BottomDrawer
          containerHeight={CARD_HEIGHT / 2 + 100}
          onCollapsed={openDrawerHandler}
        >
          <BottomDrawerTab />
        </BottomDrawer>
      )}
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
  topGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 200,
    zIndex: 1,
  },
  bottomGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 500,
    zIndex: 1,
  },
});

export default memo(Post);
