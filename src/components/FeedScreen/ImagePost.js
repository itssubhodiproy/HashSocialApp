import {
  Alert,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  Text,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CARD_HEIGHT, CARD_WIDTH } from "../../Constants";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Metrics from "./Metrics";
import Badges from "./Badges";
import UserDetails from "./UserDetails";
import BottomBar from "./BottomBar";

const ImagePost = ({ item, openBottomDrawer, toggleDrawer }) => {
  const [image, setImage] = useState({
    uri: !item.coverImage ? "https://m.timesofindia.com/photo/80045903/80045903.jpg": item.coverImage,
  });
  const canSee = true;
  return (
    <View>
      <TouchableWithoutFeedback onPress={toggleDrawer}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <LinearGradient
            colors={[
              "rgba(0,0,0,1)",
              "transparent",
              "transparent",
              "rgba(0,0,0,1)",
            ]}
            style={styles.gradient}
          />
        </ImageBackground>
      </TouchableWithoutFeedback>

      <Metrics />
      <Badges />
      <UserDetails userName={item ? item.userName : "subh"} />

      <BottomBar />
    </View>
  );
};

export default ImagePost;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
