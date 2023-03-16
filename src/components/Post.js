import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";

const CARD_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Dimensions.get("window").height;

export default function Post({ item, canSee, seeHandler }) {
  // const [canSee, setCanSee] = useState(true);
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
              source={require("../../assets/badge1.png")}
            />
            <Image
              style={styles.singleBadge}
              source={require("../../assets/badge3.png")}
            />
            <Image
              style={styles.singleBadge}
              source={require("../../assets/badge3.png")}
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
                adipisicing elit. Voluptatibus, quod. Lorem ipsum dolor sit amet
              </Text>
            </View>
          </View>
        </>
      )}
      <View>
        {canSee ? (
          <TouchableWithoutFeedback onPress={seeHandler}>
            <Image
              style={styles.eyeIcon}
              source={require("../../assets/eye-open.png")}
            ></Image>
          </TouchableWithoutFeedback>
        ) : (
          <TouchableWithoutFeedback onPress={seeHandler}>
            <Image
              style={styles.eyeIcon}
              source={require("../../assets/eye-off.png")}
            ></Image>
          </TouchableWithoutFeedback>
        )}
      </View>
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
    bottom: 80,
    left: 30,
    width: 300,
    height: 150,
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
  eyeIcon: {
    position: "absolute",
    bottom: 30,
    // right: 0,
    left: 160,
    width: 35,
    height: 35,
  },
});
