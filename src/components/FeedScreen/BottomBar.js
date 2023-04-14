import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";

const BottomBar = ({ seeHandler, canSee, openDrawerHandler }) => {
  const navigation = useNavigation();

  const __startCamera = async () => {
    navigation.navigate("CameraScreen");
  };

  return (
    <View style={styles.bottomBar}>
      <View>
        {canSee ? (
          <TouchableWithoutFeedback onPress={seeHandler}>
            <Image
              style={styles.bottomBarIcon}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/722/722174.png",
              }}
            ></Image>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={seeHandler}>
            <Image
              style={styles.bottomBarIcon}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2767/2767146.png",
              }}
            ></Image>
          </TouchableWithoutFeedback>
        )}
      </View>
      <View>
        <Image
          source={{
            uri: "https://icons.veryicon.com/png/o/miscellaneous/prototyping-tool/search-bar-01.png",
          }}
          style={styles.bottomBarIcon}
        ></Image>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={__startCamera}>
          <Image
            source={{
              uri: "https://user-images.githubusercontent.com/125730480/223720633-6c1e6ac0-6ff4-4c8b-8136-23aa7d97f5a5.png",
            }}
            style={styles.forkIcon}
          ></Image>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={openDrawerHandler}>
          <Image
            source={require("../../../assets/info.png")}
            style={styles.bottomBarIcon}
          ></Image>
        </TouchableWithoutFeedback>
      </View>
      <View>
        <Image
          source={{
            uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
          }}
          style={styles.ProfilePicture}
        ></Image>
      </View>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  bottomBarIcon: {
    width: 35,
    height: 35,
  },
  bottomBar: {
    position: "absolute",
    alignSelf: "center",
    bottom: 30,
    width: 300,
    height: 50,
    backgroundColor: "#cacccb",
    opacity: 0.8,
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    zIndex: 2,
  },
  ProfilePicture: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 50,
  },
  forkIcon: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 50,
  },
});
