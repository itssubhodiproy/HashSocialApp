import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

const Dashboard = () => {
  const [user, setUser] = useState();

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // current logged in user
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
      alert(error.message);
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        {user
          ? "Welcome " + user.firstName + " " + user.lastName
          : "Welcome to HashSocial"}
        {/* if user has not verified his email, show this */}
      </Text>

      {!firebase.auth().currentUser.emailVerified && (
        <Text style={styles.verifyWarning}>
          Please verify your email to continue
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogOut} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  verifyWarning: {
    color: "red",
    marginTop: 10,
  },
});
