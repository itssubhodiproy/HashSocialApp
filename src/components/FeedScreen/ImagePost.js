import {
  Alert,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import { Video } from "expo-av";
import { useIsFocused } from "@react-navigation/native";

const Post = ({ item, toggleDrawer, shouldPlay, index, focusedIndex }) => {
  const [image, setImage] = useState({
    uri: !item.coverURL
      ? "https://m.timesofindia.com/photo/80045903/80045903.jpg"
      : item.coverURL,
  });

  const [isLoading, setIsLoading] = useState(true);


  return (
    <View>
      <TouchableWithoutFeedback
        onPress={toggleDrawer}
        // onPressIn={pauseVideo}
        // onPressOut={playVideo}
      >
        {item.coverType === "image" ? (
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
          />
        ) : (
          <>
            <Video
              source={{ uri: item.coverURL }}
              style={styles.video}
              resizeMode="cover"
              isLooping
              shouldPlay={focusedIndex === index}
              isMuted={false}
              onLoadStart={() => {
                setIsLoading(true);
              }}
              onLoad={() => {
                setIsLoading(false);
              }}
            />
            {isLoading && (
              <View
                style={{
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  source={{ uri: "https://i.gifer.com/ZZ5H.gif" }}
                  style={{ width: 80, height: 80, resizeMode: "contain" }}
                ></Image>
              </View>
            )}
          </>
        )}
        <LinearGradient
          colors={[
            "rgba(0,0,0,1)",
            "transparent",
            "transparent",
            "rgba(0,0,0,1)",
          ]}
          style={[styles.gradient, StyleSheet.absoluteFillObject]}
        />
      </TouchableWithoutFeedback>

      <Metrics />
      <Badges />
      <UserDetails userName={item ? item.userName : "user"} />
      <BottomBar />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  video: {
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
