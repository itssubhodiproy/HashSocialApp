import { StyleSheet, View, Image, Dimensions, Alert } from "react-native";
import React, { useState, memo, useEffect } from "react";
import BottomDrawer from "react-native-bottom-drawer-view";
import BottomDrawerTab from "./BottomDrawer/BottomDrawer";
import { LinearGradient } from "expo-linear-gradient";
import Badges from "./FeedScreen/Badges";
import Metrics from "./FeedScreen/Metrics";
import UserDetails from "./FeedScreen/UserDetails";
import BottomBar from "./FeedScreen/BottomBar";
import { firebase } from "../config/firebase";

const CARD_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Dimensions.get("window").height;

function Post({ item }) {
  const [canSee, setCanSee] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userName, setUserName] = useState("");

  const seeHandler = () => {
    setCanSee(!canSee);
  };
  const openDrawerHandler = () => {
    setOpenDrawer(!openDrawer);
  };

  // retrive user name from firestore by user id
  const getUser = async (userId) => {
    const db = firebase.firestore();
    // retrive user data from firestore where user id is equal to userId
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", userId)
      .limit(1)
      .get();
    // return user name
    const user = querySnapshot.docs[0];
    return user.data().firstName;
  };

  // useEffect(() => {
  //   // retrive user name from firestore by user id
  //   getUser(item.uid).then((name) => {
  //     // console.log(name);
  //     setUserName(name);
  //   });
  // }, []);

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
        source={{ uri: item.photo }}
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
          {!openDrawer && <UserDetails userName={userName} />}
        </>
      )}
      {/* bottomBar */}
      {!openDrawer && (
        <BottomBar
          seeHandler={seeHandler}
          canSee={canSee}
          openDrawerHandler={openDrawerHandler}
        />
      )}
      {openDrawer && (
        <BottomDrawer
          containerHeight={CARD_HEIGHT / 2 + 200}
          onCollapsed={openDrawerHandler}
        >
          <BottomDrawerTab title={item.title} description={item.description} />
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
