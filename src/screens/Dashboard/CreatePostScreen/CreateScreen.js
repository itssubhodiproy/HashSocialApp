import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CreateNavigator from "../../../components/CreateNavigator/CreateNavigator";
import { firebase } from "../../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { compressImage } from "../../../Api";

const CreateScreen = ({ route }) => {
  // state of the post meterials
  const [recepieTitle, setRecepieTitle] = useState("");
  const [recepieDescription, setRecepieDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigation = useNavigation();
  const photo = route.params.photo;

  const SubmitPost = async () => {
    if (recepieTitle === "" || recepieDescription === "") {
      Alert.alert(
        "Please fill all the fields",
        "For posting recepie, title and description is required"
      );
      return;
    }
    setIsUploading(true);
    console.log("submitting post");
    // store the image into firebase storage and the get the downladable url
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const storage = firebase.storage();
    // compress the image before uploading
    const compressedImage = await compressImage(photo.uri);
    // Upload the image to Firebase storage
    const response = await fetch(compressedImage.uri);
    // image has been compressed and is ready to be uploaded
    const blob = await response.blob();
    const ref = storage.ref().child(`images/${user.uid}/${Date.now()}`);
    await ref.put(blob);
    // Get the user's username from Firestore
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const userRef = querySnapshot.docs[0].data();
    console.log(userRef);
    // Get the download URL of the image
    const downloadURL = await ref.getDownloadURL();
    const docRef = await db.collection("posts").add({
      uid: user.uid,
      userName: userRef.firstName,
      title: recepieTitle,
      description: recepieDescription,
      photoURL: downloadURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    setIsUploading(false);
    navigation.navigate("TopTabScreen");
  };

  return (
    <SafeAreaView>
      {!isUploading ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../../../../assets/black-back.png")}
                style={styles.topIcons}
              ></Image>
            </TouchableOpacity>
            <TextInput
              style={styles.header_mainText}
              value={recepieTitle}
              onChangeText={setRecepieTitle}
              placeholder="Recepie's Title"
              maxLength={15}
            />
            <TouchableOpacity>
              <Image
                source={require("../../../../assets/black-cross.png")}
                style={styles.topIcons}
              ></Image>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.description_heading}>Recepie Description</Text>
          </View>
          <View style={styles.description}>
            <TextInput
              value={recepieDescription}
              onChangeText={setRecepieDescription}
              multiline={true}
              numberOfLines={5}
              placeholder="Enter the description here"
              maxLength={180}
            />
          </View>
          <View style={styles.navigator}>
            <CreateNavigator />
          </View>
          <View style={styles.submitButton}>
            <TouchableOpacity onPress={SubmitPost}>
              <Image
                source={require("../../../../assets/hashlogo.png")}
                style={{ width: 60, height: 60 }}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.loaderContainer}>
          <Image
            source={{
              uri: "https://media3.giphy.com/media/YOw8mpVUyG8RIyR4uM/giphy.gif",
            }}
            style={styles.loaderStyle}
          ></Image>
          <Text style={styles.loaderText}>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    width: "100%",
    height: "100%",
  },
  topIcons: {
    width: 30,
    height: 30,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header_mainText: {
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 0,
    alignSelf: "center",
  },
  description_heading: {
    width: "100%",
    marginVertical: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  description: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e3e3",
  },
  navigator: {
    width: "100%",
    height: "60%",
    marginTop: 20,
  },
  submitButton: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    height: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderStyle: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  loaderContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loaderText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
