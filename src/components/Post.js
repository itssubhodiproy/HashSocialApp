import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import BottomDrawer from "react-native-bottom-drawer-view";
import BottomDrawerTab from "./BottomDrawerTab";

const CARD_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Dimensions.get("window").height;

export default function Post({ item }) {
  const [canSee, setCanSee] = useState(true);
  const [open, setOpen] = useState(false);
  const seeHandler = () => {
    setCanSee(!canSee);
  };

  return (
    <View style={styles.imageContainer}>
      <Image
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        style={styles.image}
        source={{ uri: item }}
      ></Image>
      {canSee && (
        <>
          {/* badges */}
          <View style={styles.badges}>
            <Image
              style={styles.singleBadge}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/6270/6270515.png",
              }}
            />
            <Image
              style={styles.singleBadge}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3314/3314467.png",
              }}
            />
            <Image
              style={styles.singleBadge}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2583/2583264.png",
              }}
            />
          </View>
          {/* recepie metrics */}
          <View style={styles.recepieMetrics}>
            <View style={styles.singleRecepieMetrics}>
              <Text style={styles.mainText}>15</Text>
              <Text style={styles.nonMainText}>mins</Text>
            </View>
            <View style={styles.singleRecepieMetrics}>
              <Text style={styles.mainText}>568</Text>
              <Text style={styles.nonMainText}>Kcal</Text>
            </View>
          </View>
          {/* user profile */}
          <View style={styles.UserProfile}>
            <Image
              style={styles.userProfilePicture}
              source={{
                uri: "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
              }}
            />
            <View style={styles.userProfileDesc}>
              <Text style={styles.mainTextProfile}>@subhodip</Text>
              <Text style={styles.userAchivements}>
                {" "}
                54 Creations, 10 Forks
              </Text>
              <Text style={styles.nonMainTextProfile}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus, quod. Lorem ipsum dolor sit amet consectetur
              </Text>
            </View>
          </View>
        </>
      )}
      {/* bottomBar */}
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
          <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
            <Image
              source={{
                uri: "https://user-images.githubusercontent.com/125730480/223720633-6c1e6ac0-6ff4-4c8b-8136-23aa7d97f5a5.png",
              }}
              style={styles.forkIcon}
            ></Image>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1827/1827504.png",
            }}
            style={styles.bottomBarIcon}
          ></Image>
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
      {open && (
        <BottomDrawer
          containerHeight={CARD_HEIGHT / 2}
          onCollapsed={() => setOpen(false)}
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
  UserProfile: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    width: 300,
    height: 130,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  userProfilePicture: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 50,
    margin: 10,
  },
  userAchivements: {
    fontSize: 14,
    color: "red",
    fontStyle: "italic",
    fontWeight: "bold",
    // margin: 10,
  },
  userProfileDesc: {
    // backgroundColor: "rgba(0,0,0,0.5)",
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 220,
  },
  mainTextProfile: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  nonMainTextProfile: {
    fontSize: 12,
    // fontWeight: "bold",
    color: "white",
  },
  badges: {
    position: "absolute",
    top: 60,
    left: 0,
    width: 180,
    height: 60,
    // backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  singleBadge: {
    width: 50,
    height: 50,
    resizeMode: "cover",
  },
  recepieMetrics: {
    position: "absolute",
    top: 60,
    right: 15,
    width: 60,
    height: 130,
    // backgroundColor: "rgba(0,0,0,0.2)",
    // borderRadius: 5,
    // flexDirection: "column",
    justifyContent: "space-evenly",
  },
  singleRecepieMetrics: {
    width: 60,
    height: 60,
    margin: 5,
    padding: 5,
    resizeMode: "cover",
    backgroundColor: "#cacccb",
    opacity: 0.8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  nonMainText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
  },
  bottomBarIcon: {
    width: 35,
    height: 35,
  },
  bottomBar: {
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    width: 300,
    height: 50,
    backgroundColor: "#cacccb",
    opacity: 0.8,
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  ProfilePicture: {
    width: 35,
    height: 35,
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
