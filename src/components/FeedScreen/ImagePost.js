import {
  Alert,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { CARD_HEIGHT, CARD_WIDTH } from "../../Constants";
import Metrics from "./Metrics";
import Badges from "./Badges";
import UserDetails from "./UserDetails";
import BottomBar from "./BottomBar";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { firebase } from "../../config/firebase";

const DoubleClickTouchableOpacity = ({
  onSingleClick,
  onDoubleClick,
  children,
  ...props
}) => {
  const [lastPress, setLastPress] = useState(0);
  const doublePress = useRef(false);

  const handlePress = () => {
    const time = new Date().getTime();

    if (time - lastPress <= 300) {
      onDoubleClick();
      doublePress.current = true;
    } else {
      setLastPress(time);
      setTimeout(() => {
        if (!doublePress.current) {
          onSingleClick();
        }
        doublePress.current = false;
      }, 300);
    }
  };

  return (
    <TouchableHighlight onPress={handlePress} {...props}>
      {children}
    </TouchableHighlight>
  );
};

const Post = ({ item, shouldPlay, index, focusedIndex, openBottomDrawer }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const [image, setImage] = useState({
    uri: !item.coverURL
      ? "https://m.timesofindia.com/photo/80045903/80045903.jpg"
      : item.coverURL,
  });

  const [isLoading, setIsLoading] = useState(true);

  const handleDoubleClick = async (
    postId,
    postOwnerId,
    currentLoggedInUserId
  ) => {
    // Start the animation
    Animated.timing(animation, {
      toValue: 1,
      duration: 500, // 1 second animation
      useNativeDriver: true,
    }).start(() => {
      // Reset the animation when it is finished
      animation.setValue(0);
    });
    // Check if the user has already upvoted the post
    const db = firebase.firestore();
    const upvoteRef = db
      .collection("upvotes")
      .where("PostId", "==", postId)
      .where("From", "==", currentLoggedInUserId);
    const upvoteSnapshot = await upvoteRef.get();
    if (!upvoteSnapshot.empty) {
      console.log("Already upvoted!");
      return;
    }
    // Create a new upvote document in the 'upvotes' collection
    const createdAt = new Date();
    const newUpvoteRef = db.collection("upvotes").doc();
    await newUpvoteRef.set({
      PostId: postId,
      To: postOwnerId,
      From: currentLoggedInUserId,
      CreatedAt: createdAt,
    });
  };

  const heartAnimatedStyle = {
    transform: [{ scale: animation }],
  };
  const [pause, setPause] = useState(false);

  const pauseVideo = () => {
    setPause((pause) => !pause);
  };

  return (
    <View>
      <DoubleClickTouchableOpacity
        onSingleClick={
          !isLoading
            ? pauseVideo
            : () => console.log("You can't pause the video while it is loading")
        }
        onDoubleClick={() =>
          handleDoubleClick(item.id, item.uid, firebase.auth().currentUser.uid)
        }
      >
        <View>
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
                shouldPlay={focusedIndex === index && !pause}
                isMuted={false}
                onLoadStart={() => {
                  setIsLoading(true);
                }}
                onLoad={() => {
                  setIsLoading(false);
                }}
              />

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
                {isLoading && (
                  <Image
                    source={{ uri: "https://i.gifer.com/ZZ5H.gif" }}
                    style={{ width: 80, height: 80, resizeMode: "contain" }}
                  ></Image>
                )}
                {pause && (
                  <Image
                    source={{
                      uri: "https://www.freepnglogos.com/uploads/play-button-png/index-media-cover-art-play-button-overlay-5.png",
                    }}
                    style={{ width: 80, height: 80, resizeMode: "contain" }}
                  ></Image>
                )}
              </View>
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
          <Animated.View
            style={[
              {
                position: "absolute",
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              heartAnimatedStyle,
            ]}
          >
            <Icon name="star" size={128} color="#fc433c" />
          </Animated.View>
        </View>
      </DoubleClickTouchableOpacity>
      <Metrics item={item} />
      <Badges />
      <UserDetails item={item} openBottomDrawer={openBottomDrawer} />
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
