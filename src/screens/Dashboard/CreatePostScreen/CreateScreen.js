import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import CreateNavigator from "../../../components/CreateNavigator/CreateNavigator";
import { firebase } from "../../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { compressImage } from "../../../Api";
import { useIsFocused } from "@react-navigation/native";

const CreateScreen = ({ route }) => {
  // state of the post meterials
  const [recepieTitle, setRecepieTitle] = useState("");
  const [recepieDescription, setRecepieDescription] = useState("");
  const [Instructions, setInstructions] = useState([]);
  const [Ingredients, setIngredients] = useState([]);
  const [category, setCategory] = useState([]);

  // const [coverImage, setCoverImage] = useState("");

  // state of the loading
  const [isUploading, setIsUploading] = useState(false);
  // navigation
  const navigation = useNavigation();
  // IS FOCUSED HOOK
  const isFocused = useIsFocused();

  // add an empty ingredient object and push it to the state
  const addIngredientsToState = () => {
    const ingredient = {
      text: "",
      quantity: 1,
    };
    const newIngredients = [...Ingredients, ingredient];
    setIngredients(newIngredients);
  };

  // update ingredient text based on the index
  const updateIngredientText = (index, text) => {
    const newIngredients = [...Ingredients];
    newIngredients[index].text = text;
    setIngredients(newIngredients);
  };

  // increment the quantity of the ingredient by index
  const incrementQuantity = (index) => {
    const newIngredients = [...Ingredients];
    newIngredients[index].quantity = newIngredients[index].quantity + 1;
    setIngredients(newIngredients);
  };

  // decrement the quantity of the ingredient by index
  const decrementQuantity = (index) => {
    const newIngredients = [...Ingredients];
    if (newIngredients[index].quantity > 1) {
      newIngredients[index].quantity = newIngredients[index].quantity - 1;
      setIngredients(newIngredients);
    }
  };

  const deleteIngredients = (index) => {
    const newIngredients = [...Ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  // photo from the camera
  const addInstructionsToState = (instructions) => {
    setInstructions((prevState) => [...prevState, instructions]);
  };

  const SubmitPost = async () => {
    if (recepieTitle === "" || recepieDescription === "") {
      Alert.alert(
        "Please fill all the fields",
        "For posting recepie, title and description is required"
      );
      return;
    }
    setIsUploading(true);
    console.log("uploading post started..");
    // store the image into firebase storage and the get the downladable url
    const coverImage = await uploadInstructions();
    // upload the post to the firestore
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const userRef = querySnapshot.docs[0].data();
    const docRef = await db.collection("posts").add({
      uid: user.uid,
      userName: userRef.firstName,
      title: recepieTitle,
      description: recepieDescription,
      instructions: Instructions,
      ingredients: Ingredients,
      category: category,
      coverImage: coverImage,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    setIsUploading(false);
    console.log("uploading post finished..");
    navigation.navigate("TopTabScreen");
  };

  //upload every image from the instructions array to the firebase storage and then get the download url and store it in the instructions array
  const uploadInstructions = async () => {
    let coverImage = "";
    // const db = firebase.firestore();
    console.log("Instructions upload started..");
    const user = firebase.auth().currentUser;
    const storage = firebase.storage();
    const newInstructions = [...Instructions];
    for (let i = 0; i < newInstructions.length; i++) {
      // compress the image before uploading
      const compressedImage = await compressImage(
        newInstructions[i].imageURL.uri
      );
      // Upload the image to Firebase storage
      const response = await fetch(compressedImage.uri);
      // image has been compressed and is ready to be uploaded
      const blob = await response.blob();
      const ref = storage
        .ref()
        .child(`images/${user.uid}/${recepieTitle}/${i + 1}`);
      await ref.put(blob);
      // Get the download URL of the image
      const downloadURL = await ref.getDownloadURL();
      newInstructions[i].imageURL = downloadURL;
      // if cover image property true, changing the state of coverImage
      if (newInstructions[i].isCoverImage) {
        console.log("cover image set");
        coverImage = newInstructions[i].imageURL;
      }
    }
    setInstructions(newInstructions);
    console.log("Instructions uploaded");
    return coverImage;
  };

  // delete one item from the instructions by index
  const deleteInstruction = (index) => {
    const newInstructions = [...Instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  // update the instructions array text by index
  const updateInstruction = (index, text) => {
    const newInstructions = [...Instructions];
    newInstructions[index].text = text;
    setInstructions(newInstructions);
  };

  // based on the index of the instruction, set the cover image
  const changeCover = (index) => {
    const newInstructions = [...Instructions];
    // change already set cover image to false
    for (let i = 0; i < newInstructions.length; i++) {
      if (newInstructions[i].isCoverImage) {
        newInstructions[i].isCoverImage = false;
      }
    }
    // set the new cover image
    newInstructions[index].isCoverImage = true;
    setInstructions(newInstructions);
  };

  // discard alert
  const GoBackToTopTabScreen = () => {
    Alert.alert(
      "Discard Post",
      "Are you sure you want to discard this post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Discard", onPress: () => navigation.navigate("TopTabScreen") },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (isFocused && route.params?.photo) {
      const instructionObject = {
        id: Instructions.length + 1,
        imageURL: route.params.photo,
        text: "",
        isCoverImage: false,
      };
      if (instructionObject.id === 1) {
        instructionObject.isCoverImage = true;
      }
      addInstructionsToState(instructionObject);
    }
  }, [isFocused]);

  useEffect(() => {
    console.log(Instructions);
    console.log(Ingredients);
  }, [Instructions, Ingredients]);

  return (
    <SafeAreaView>
      {!isUploading ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={GoBackToTopTabScreen}>
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
            />
            <TouchableOpacity onPress={GoBackToTopTabScreen}>
              <Image
                source={require("../../../../assets/black-cross.png")}
                style={styles.topIcons}
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.description}>
            <TextInput
              value={recepieDescription}
              onChangeText={setRecepieDescription}
              multiline={true}
              numberOfLines={5}
              placeholder="Enter the description here"
            />
          </View>
          <View style={styles.navigator}>
            <CreateNavigator
              Instructions={Instructions}
              deleteInstruction={deleteInstruction}
              updateInstruction={updateInstruction}
              changeCover={changeCover}
              addIngredientsToState={addIngredientsToState}
              Ingredients={Ingredients}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              updateIngredientText={updateIngredientText}
              deleteIngredients={deleteIngredients}
            />
          </View>
          <View style={styles.submitButton}>
            <TouchableOpacity onPress={SubmitPost}>
              <Image
                source={require("../../../../assets/hashlogo.png")}
                style={{ width: 50, height: 50 }}
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
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
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
    padding: 20,
  },
  header_mainText: {
    fontSize: 18,
    fontWeight: "bold",
    borderWidth: 0,
    alignSelf: "center",
    flex: 1,
    textAlign: "center",
    flexWrap: "wrap",
  },
  description_heading: {
    width: "100%",
    marginVertical: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  description: {
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  navigator: {
    width: "100%",
    height: "60%",
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#e0e0e0",
  },
  submitButton: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    // height: "10%",
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
