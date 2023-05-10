import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { CARD_HEIGHT, CARD_WIDTH } from "../../Constants";

const UserDetails = ({ item, openBottomDrawer }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          {item ? item.title : "RecipeTitle"}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            marginHorizontal: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={openBottomDrawer}
        >
          <Text style={{fontWeight:"bold"}}>View Recipe</Text>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/137/137624.png",
            }}
            style={{ width: 20, height: 20, marginHorizontal: 5 }}
          ></Image>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 10,
        }}
      >
        <Image
          source={{ uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" }}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        ></Image>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: "white", fontWeight: "600", fontSize: 15 }}>
            {item.userName}
          </Text>
          <Text style={{ color: "yellow", fontWeight: "600", fontSize: 10 }}>
            54 Creations, 19 Forks
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  UserProfile: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    width: 300,
    height: 130,
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
    color: "#fcd7d4",
    fontStyle: "italic",
    fontWeight: "bold",
    marginBottom: 5,
  },
  userProfileDesc: {
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 220,
  },
  mainText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  nonMainText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
  container: {
    position: "absolute",
    bottom: CARD_HEIGHT * 0.12,
    alignSelf: "center",
    width: CARD_WIDTH * 0.9,
    height: CARD_HEIGHT * 0.13,
    paddingLeft: 20,
    // backgroundColor: "yellow",
  },
});
