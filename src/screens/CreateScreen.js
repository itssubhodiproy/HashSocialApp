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
import CreateNavigator from "../components/CreateNavigator/CreateNavigator";

const CreateScreen = ({ route }) => {
  const navigation = useNavigation();
  const photo = route.params.photo;

  // state of the post meterials
  const [recepieTitle, setRecepieTitle] = useState("");
  const [recepieDescription, setRecepieDescription] = useState("");

  const SubmitPost = async () => {
    if (recepieTitle === "" || recepieDescription === "") {
      Alert.alert("Please fill all the fields");
      return;
    }
    console.post("post submitted");
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/black-back.png")}
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
              source={require("../../assets/black-cross.png")}
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
      </View>
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
    height: "100%",
    marginTop: 20,
  },
});
