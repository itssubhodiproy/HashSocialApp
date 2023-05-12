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
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";

const Instructions_Height = Dimensions.get("window").height * 0.15;

const CreateInstructions = ({
  Instructions,
  deleteInstruction,
  updateInstruction,
  changeCover,
  changeInstructionsState,
}) => {
  const navigation = useNavigation();
  // console.log("Instructions", Instructions);
  const DeleteRow = (id) => {
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
          onPress: () => deleteInstruction(id),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const makeItCover = (id) => {
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
          onPress: () => changeCover(id),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item, drag, isActive }) => {
    return (
      <ScaleDecorator>
        <View style={styles.instructions}>
          {item.isCover ? (
            <View style={styles.cover}>
              <Image
                source={require("../../../assets/cover-star.png")}
                style={{ width: 20, height: 20 }}
              ></Image>
            </View>
          ) : null}
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={drag}
            disabled={isActive}
            style={{
              paddingRight: 10,
            }}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5576/5576863.png",
              }}
              style={{ width: 30, height: 30 }}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => DeleteRow(item.id)}
            onLongPress={() => makeItCover(item.id)}
          >
            <View style={styles.instructions_image_view}>
              <Image
                source={{ uri: item.fileURL }}
                style={styles.instruction_image}
              ></Image>
            </View>
          </TouchableOpacity>
          <TextInput
            style={styles.instruction_text_view}
            value={item.text}
            onChangeText={updateInstruction.bind(this, item.id)}
            placeholder="Add instruction details"
            multiline={true}
            numberOfLines={4}
          ></TextInput>
        </View>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <DraggableFlatList
        data={Instructions}
        onDragEnd={({ data }) => changeInstructionsState(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
        <View style={styles.instructions}>
          <View style={styles.instructions_image_view}>
            <Image
              source={require("../../../assets/plus-add.png")}
              style={styles.add_instructions_image}
            ></Image>
          </View>
          <Text style={styles.add_instruction_text}>Add Instruction</Text>
        </View>
      </TouchableOpacity>
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
    // padding: 10,
    paddingLeft: 5,
    paddingVertical: 10,
    paddingRight: 10,
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
