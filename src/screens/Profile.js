import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { firebase } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore"; // or 'firebase/firestore'

const Profile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    // set the current logged in user name from firestore
    const currentLoggedInuser = firebase.auth().currentUser;
    // get user data from firestore
    try {
      const retriveUserData = async () => {
        // retrieve user data from firestore based on uid
        const q = query(
          collection(firebase.firestore(), "users"),
          where("uid", "==", currentLoggedInuser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setUser(doc.data());
        });
      };
      retriveUserData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <SafeAreaView>
      {user ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.userDetails}>
            <View style={styles.firstRow}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
                }}
                style={{ width: 70, height: 70, borderRadius: 50 }}
              />
              <View style={styles.userName}>
                <Text
                  style={{ paddingBottom: 10, fontSize: 18, fontWeight: "700" }}
                >
                  {/* show current loggedin user from firebase firestore */}@
                  {user ? user.firstName : ""}
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={{ fontSize: 16 }}>Follow</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                padding: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  // paddingRight: 10,
                  textDecorationLine: "underline",
                }}
              >
                196 Following
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  // paddingLeft: 10,
                  textDecorationLine: "underline",
                }}
              >
                234 Followers
              </Text>
            </View>
            <View style={styles.flexRow2}>
              <Text>
                👉 Lorem Ipsum is simply dummy text sdfs 
              </Text>
              <Text>
                🚀 Lorem Ipsum is simply dummy text sfdas
              </Text>
            </View>
          </View>
          {/* <View style={styles.singleBorder}></View> */}
          <View style={styles.userPosts}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              Posts
            </Text>
            <Text>Saved</Text>
            <Text>Tagged</Text>
          </View>
          <View style={styles.singleBorder}></View>
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  userDetails: {
    // marginTop: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    width: "100%",
    borderWidth: 1,
    borderColor: "#e6e8e6",
    paddingBottom: 10,
  },
  firstRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  userName: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    paddingLeft: 20,
  },
  flexRow2: {
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: "#e6e8e6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    // borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#e6e8e6",
  },
  firstButton: {
    paddingVertical: 5,
  },
  singleBorder: {
    width: "100%",
    height: 1,
    backgroundColor: "#e6e8e6",
    marginVertical: 10,
  },
  userPosts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: 10,
  },
});
