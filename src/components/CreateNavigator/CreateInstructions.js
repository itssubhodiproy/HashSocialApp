import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Instructions_Height = Dimensions.get("window").height * 0.15;

const CreateInstructions = ({
  Instructions,
  deleteInstruction,
  updateInstruction,
  changeCover,
}) => {
  const navigation = useNavigation();
  // console.log("Instructions", Instructions);
  const DeleteRow = (index) => {
    Alert.alert(
      "Delete Instruction",
      "Are you sure you want to delete this instruction?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteInstruction(index),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const makeItCover = (index) => {
    Alert.alert(
      "Make it Cover",
      "Are you sure you want to make this instruction as cover?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Make it Cover",
          onPress: () => changeCover(index),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Instructions?.map((instruction, index) => (
          <View key={index}>
            {/* cover image identification */}
            <View style={styles.instructions}>
              {instruction.isCover ? (
                <View style={styles.cover}>
                  <Image
                    source={require("../../../assets/cover-star.png")}
                    style={{ width: 20, height: 20 }}
                  ></Image>
                </View>
              ) : null}

              {/* /// */}
              <Text style={styles.instruction_id}>{index + 1}</Text>
              <TouchableOpacity
                onPress={() => DeleteRow(index)}
                onLongPress={() => makeItCover(index)}
              >
                <View style={styles.instructions_image_view}>
                  <Image
                    source={{ uri: instruction.fileURL }}
                    style={styles.instruction_image}
                  ></Image>
                </View>
              </TouchableOpacity>
              <TextInput
                style={styles.instruction_text_view}
                value={instruction.text}
                onChangeText={updateInstruction.bind(this, index)}
                placeholder="Add instruction details"
                multiline={true}
                numberOfLines={4}
              ></TextInput>
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
          <View style={styles.instructions}>
            <Text style={styles.add_instruction_id}>
              {Instructions?.length + 1}
            </Text>
            <View style={styles.instructions_image_view}>
              <Image
                source={require("../../../assets/plus-add.png")}
                style={styles.add_instructions_image}
              ></Image>
            </View>
            <Text style={styles.add_instruction_text}>Add Instruction</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateInstructions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  instructions: {
    width: "100%",
    height: Instructions_Height,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
  },
  add_instruction: {
    width: "100%",
    height: Instructions_Height,
    backgroundColor: "white",
  },
  instructions_image_view: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#fc433c",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  instruction_image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 10,
  },
  instruction_id: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 20,
  },
  instruction_text_view: {
    width: "100%",
    fontSize: 15,
    flex: 1,
    flexWrap: "wrap",
  },
  instruction_text: {
    fontSize: 10,
  },
  add_instruction_id: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 20,
    color: "#fc433c",
  },
  add_instructions_image: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  add_instruction_text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  cover: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
