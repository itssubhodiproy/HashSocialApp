import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { firebase } from "../../config/firebase";

export default function RegisterScreen({ navigation }) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");

  // handle registration
  const handleRegistration = async (email, password, firstName, lastName) => {
    // alert for empty fields
    if (email === "" || password === "" || firstName === "" || lastName === "")
      return alert("Please fill in all fields");
    // remove whitespace
    email = email.trim();
    password = password.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    // create user
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const user = firebase.auth().currentUser;
          return user.updateProfile({
            displayName: firstName,
          });
        });
      await firebase
        .auth()
        .currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url: "https://hashsocial-cf99e.firebaseapp.com",
        })
        .then(() => {
          alert("Please check your email for a verification link");
        });
      // add user to the firestore database
      await firebase.firestore().collection("users").add({
        email: email,
        firstName: firstName,
        lastName: lastName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: firebase.auth().currentUser.uid,
      });
      // console.log(user)
      console.log("Registered with:", email);
      navigation.navigate("LoginScreen");
    } catch (error) {
      alert(error.message);
      console.log(error.toString(error));
    }
  };

  return (
    <View style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <View style={styles.nameFlexBox}>
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            style={styles.inputName}
          />
          <TextInput
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            style={styles.inputName}
          />
        </View>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
          autoCorrect={false}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            handleRegistration(email, password, firstName, lastName)
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.loginRedirect}>
          Already Registered?{" "}
          <Text
            style={styles.loginText}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            Login Now
          </Text>
        </Text>
      </View>
    </View>
  );
}

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
  loginRedirect: {
    color: "black",
    fontWeight: "700",
    marginTop: 30,
    fontSize: 10,
  },
  loginText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 12,
  },
  nameFlexBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputName: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "49%",
  },
});
