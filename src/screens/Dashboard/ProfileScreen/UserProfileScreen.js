import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Metrics from "../../../components/FeedScreen/Metrics";
import {firebase} from "../../../config/firebase"

const UserProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState(firebase.auth().currentUser.displayName)

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.log(error);
      });
    navigation.navigate("AuthScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{userName}</Text>
      <Text style={styles.userRole}>Superior</Text>
      <Image
        style={styles.profilePicture}
        source={{
          uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
        }}
      ></Image>
      <Text style={styles.subscribeMessage}>Subcribed untill 3 march 2025</Text>
      <View style={styles.badgeRow}>
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
      <Text style={styles.userRole}>See All</Text>
      <View style={styles.logOutButtonPosition}>
        <TouchableOpacity onPress={logoutHandler}>
          <Text style={styles.logOutButton}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sideIconBar}>
        <TouchableOpacity onPress={()=>navigation.navigate("TopTabScreen")}>
          <Image
            style={styles.sideIcon}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
            }}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.sideIcon}
            source={{
              uri: "https://cdn0.iconfinder.com/data/icons/cosmo-symbols/40/help_1-512.png",
            }}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.sideIcon}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/3524/3524659.png",
            }}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    margin: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 100,
    marginVertical: 20,
    // borderCurve :'circular'
  },
  badgeRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  singleBadge: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    margin: 10,
  },
  logOutButton: {
    color: "grey",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
  logOutButtonPosition: {
    position: "absolute",
    left: 5,
    top: 5,
    // margin:5,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userRole: {
    fontSize: 15,
    fontWeight: "bold",
    color: "blue",
  },
  subscribeMessage: {
    fontSize: 15,
    fontWeight: "bold",
    color: "green",
  },
  sideIconBar: {
    position: "absolute",
    right: 0,
    top: 0,
    height: 150,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  sideIcon: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    // margin: 10,
    marginVertical: 15,
  },
});
