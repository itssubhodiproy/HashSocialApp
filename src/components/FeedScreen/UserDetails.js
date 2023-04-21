import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const UserDetails = ({ userName }) => {
  return (
    <View style={styles.UserProfile}>
      <Image
        style={styles.userProfilePicture}
        source={{
          uri: "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
        }}
      />
      <View style={styles.userProfileDesc}>
        <Text style={styles.mainText}>@{userName ? userName : "Subh_cs"}</Text>
        <Text style={styles.userAchivements}> 54 Creations, 10 Forks</Text>
        <Text style={styles.nonMainText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus,
          quod. Lorem ipsum dolor sit amet consectetur
        </Text>
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
});
