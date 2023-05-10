import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../../../config/firebase";
import { useIsFocused } from "@react-navigation/native";
import { CARD_HEIGHT, CARD_WIDTH } from "../../../Constants";
import { ActivityIndicator } from "react-native-paper";

const retriveData = async ({ item }) => {};

const OtherUserProfileScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const [userName, setUserName] = useState("");
  const [upvotedRecieved, setUpvotedRecieved] = useState(0);
  const [upvotedGiven, setUpvotedGiven] = useState(0);

  const { item } = route.params;

  // retrive postOwnerId from route.params and then fetch user name from users collection and total number of  upvoted recieved from upvotes collection
  useEffect(() => {
    if (isFocused) {
      setUserName(item.userName);
      // retrive total number of upvotes recieved from upvote collection
      firebase
        .firestore()
        .collection("upvotes")
        .where("To", "==", item.uid)
        .get()
        .then((snapshot) => {
          setUpvotedRecieved(snapshot.size);
        });
      // retrive total number of upvotes given from upvote collection
      firebase
        .firestore()
        .collection("upvotes")
        .where("From", "==", item.uid)
        .get()
        .then((snapshot) => {
          setUpvotedGiven(snapshot.size);
        });
    }
  }, [isFocused, userName, upvotedRecieved, upvotedGiven]);

  return (
    <View style={styles.container}>
      {userName == "" ? (
        <View
          style={{
            display: "flex",
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <>
          <Text style={styles.username}>{userName}</Text>
          <Text style={styles.userRole}>Superior</Text>
          <Image
            style={styles.profilePicture}
            source={{
              uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
            }}
          ></Image>
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
          <View
            style={{
              padding: 10,
              display: "flex",
              width: CARD_WIDTH,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "bold", paddingTop: 5 }}>
              Total Upvotes received: {upvotedRecieved}
            </Text>
            <Text style={{ fontWeight: "bold", paddingTop: 5 }}>
              Total Upvotes given: {upvotedGiven}
            </Text>
          </View>

          <View style={styles.logOutButtonPosition}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/189/189260.png",
                }}
                style={{ width: 50, height: 50, padding: 10 }}
              ></Image>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default OtherUserProfileScreen;

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
