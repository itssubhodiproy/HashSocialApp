import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import { CARD_HEIGHT, CARD_WIDTH } from "../../Constants";

const BottomBar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity>
        <Image
          style={styles.bottomBarIcon}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2767/2767146.png",
          }}
        ></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
        <Image
          source={{
            uri: "https://icons.veryicon.com/png/o/miscellaneous/prototyping-tool/search-bar-01.png",
          }}
          style={styles.bottomBarIcon}
        ></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("CreatePostScreen")}>
        <Image
          source={{
            uri: "https://user-images.githubusercontent.com/125730480/223720633-6c1e6ac0-6ff4-4c8b-8136-23aa7d97f5a5.png",
          }}
          style={styles.forkIcon}
        ></Image>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("NotificationScreen")}>
        <Image
          source={require("../../../assets/notification.png")}
          style={styles.bottomBarIcon}
        ></Image>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
        <Image
          source={{
            uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
          }}
          style={styles.ProfilePicture}
        ></Image>
      </TouchableOpacity>
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
    bottom: CARD_HEIGHT * 0.03,
    width: CARD_WIDTH * 0.9,
    height: CARD_HEIGHT * 0.07,
    backgroundColor: "#c6c6c6",
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
