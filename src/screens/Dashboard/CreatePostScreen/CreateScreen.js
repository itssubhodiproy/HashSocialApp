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
import { compressImage, compressVideo, getFileType } from "../../../Api";
import { useIsFocused } from "@react-navigation/native";

const CreateScreen = ({ route }) => {
  // state of the post meterials
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [Instructions, setInstructions] = useState([]);
  const [Ingredients, setIngredients] = useState([]);
  const [category, setCategory] = useState([]);

  const [calories, setCalories] = useState("");
  const [servings, setServings] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  // add or remove category from the state
  const addOrRemoveCategory = (item) => {
    const newCategory = [...category];
    const index = newCategory.indexOf(item);
    if (index > -1) {
      newCategory.splice(index, 1);
    } else {
      newCategory.push(item);
    }
    setCategory(newCategory);
  };

  // check if the category is selected or not
  const isCategorySelected = (item) => {
    const index = category.indexOf(item);
    if (index > -1) {
      return true;
    } else {
      return false;
    }
  };

  const changeCalories = (text) => {
    setCalories(text);
  };

  const changeCookingTime = (text) => {
    setCookingTime(text);
  };

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
      unit: "",
      quantity: 1,
    };
    const newIngredients = [...Ingredients, ingredient];
    setIngredients(newIngredients);
  };

  // update ingredient text based on the index of the ingredient
  const updateIngredientText = (index, text) => {
    const newIngredients = [...Ingredients];
    newIngredients[index].text = text;
    setIngredients(newIngredients);
  };

  // update ingredient unit based on the index
  const updateIngredientUnit = (index, unit) => {
    const newIngredients = [...Ingredients];
    newIngredients[index].unit = unit;
    setIngredients(newIngredients);
  };
  // update ingredient quantity based on the index
  const updateIngredientQuantity = (index, quantity) => {
    const newIngredients = [...Ingredients];
    newIngredients[index].quantity = quantity;
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

  const changeInstructionsState = (instructions) => {
    setInstructions(instructions);
  };

  const SubmitPost = async () => {
    if (
      recipeTitle === "" ||
      recipeDescription === "" ||
      calories === "" ||
      cookingTime === ""
    ) {
      Alert.alert(
        "Please fill all the fields",
        "For posting recipe, title, description, calories, cookingTime is required"
      );
      return;
    }
    setIsUploading(true);
    console.log("uploading post started..");
    // store the image into firebase storage and the get the downladable url
    const { coverURL, coverType } = await uploadInstructions();
    // upload the post to the firestore
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const userRef = querySnapshot.docs[0].data();
    const docRef = await db.collection("posts").add({
      uid: user.uid,
      userName: userRef.firstName,
      title: recipeTitle,
      description: recipeDescription,
      instructions: Instructions,
      ingredients: Ingredients,
      category: category,
      coverURL: coverURL,
      coverType: coverType,
      calories: calories,
      cookingTime: cookingTime,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    setIsUploading(false);
    console.log("uploading post finished..");
    navigation.navigate("TopTabScreen");
  };

  //upload every image from the instructions array to the firebase storage and then get the download url and store it in the instructions array
  const uploadInstructions = async () => {
    let coverURL = "";
    let coverType = "";
    console.log("Instructions upload started..");
    const user = firebase.auth().currentUser;
    const storage = firebase.storage();
    const newInstructions = [...Instructions];
    for (let i = 0; i < newInstructions.length; i++) {
      const resourceType = getFileType(newInstructions[i].fileURL);
      let compressedResource;
      console.log(1);
      if (resourceType === "image") {
        // compress the image before uploading
        compressedResource = await compressImage(newInstructions[i].fileURL);
      } else if (resourceType === "video") {
        // compress the video before uploading
        let videoObject = {
          uri: newInstructions[i].fileURL,
          name: "video.mp4",
          type: "video/mp4",
        };
        compressedResource = videoObject;
      }
      console.log(2);
      // upload the compressed resource to Firebase storage in the correct folder based on the file type
      const response = await fetch(compressedResource.uri);
      const blob = await response.blob();
      let storageRef;
      console.log(3);
      if (resourceType === "image") {
        storageRef = storage
          .ref()
          .child(`${user.uid}/${recipeTitle}/images/${i + 1}`);
      } else if (resourceType === "video") {
        storageRef = storage
          .ref()
          .child(`${user.uid}/${recipeTitle}/videos/${i + 1}`);
      }
      console.log(4);
      await storageRef.put(blob);
      const downloadURL = await storageRef.getDownloadURL();
      newInstructions[i].fileURL = downloadURL;
      console.log(5);
      if (newInstructions[i].isCover) {
        console.log("cover image set");
        coverURL = newInstructions[i].fileURL;
        coverType = resourceType;
      }
      console.log(6);
    }
    setInstructions(newInstructions);
    console.log("Instructions uploaded");
    return { coverURL, coverType };
  };

  // delete one item from the instructions by id
  const deleteInstruction = (id) => {
    const newInstructions = [...Instructions];
    for (let i = 0; i < newInstructions.length; i++) {
      if (newInstructions[i].id === id) {
        newInstructions.splice(i, 1);
      }
    }
    setInstructions(newInstructions);
  };

  // update the instructions array text by id and text
  const updateInstruction = (id, text) => {
    const newInstructions = [...Instructions];
    for (let i = 0; i < newInstructions.length; i++) {
      if (newInstructions[i].id === id) {
        newInstructions[i].text = text;
      }
    }
    setInstructions(newInstructions);
  };

  // based on the id of the instruction, set the cover image
  const changeCover = (id) => {
    const newInstructions = [...Instructions];
    for (let i = 0; i < newInstructions.length; i++) {
      if (newInstructions[i].id === id) {
        newInstructions[i].isCover = true;
      } else {
        newInstructions[i].isCover = false;
      }
    }
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
    if (isFocused && route.params?.cameraFile) {
      const instructionObject = {
        id: Instructions.length + 1,
        fileURL: route.params.cameraFile.uri,
        text: "",
        isCover: false,
      };
      if (instructionObject.id === 1) {
        instructionObject.isCover = true;
      }
      addInstructionsToState(instructionObject);
    }
  }, [isFocused]);

  useEffect(() => {}, [Instructions, Ingredients]);

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
              value={recipeTitle}
              onChangeText={setRecipeTitle}
              placeholder="Recipe's Title"
              textAlign="center"
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
              value={recipeDescription}
              onChangeText={setRecipeDescription}
              multiline={true}
              numberOfLines={5}
              placeholder="Enter the description here"
              textAlign="center"
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
              updateIngredientUnit={updateIngredientUnit}
              updateIngredientQuantity={updateIngredientQuantity}
              changeCalories={changeCalories}
              changeCookingTime={changeCookingTime}
              calories={calories}
              cookingTime={cookingTime}
              addOrRemoveCategory={addOrRemoveCategory}
              isCategorySelected={isCategorySelected}
              changeInstructionsState={changeInstructionsState}
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
