import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { CreatePageSingleRecordHeight } from "../../Constants";

// const Ingredients = [
//   {
//     id: 1,
//     text: "1 cup of water",
//     quantity: "1",
//     unit: "tbsp",
//   },
//   {
//     id: 2,
//     text: "1 cup of water",
//     quantity: "1",
//     unit: "tbsp",
//   },
//   {
//     id: 3,
//     text: "1 cup of water",
//     quantity: "1",
//     unit: "tbsp",
//   },
// ];

const CreateIngredients = ({
  addIngredientsToState,
  Ingredients,
  deleteIngredients,
  updateIngredientText,
  updateIngredientUnit,
  updateIngredientQuantity,
}) => {
  const navigation = useNavigation();

  const deleteIngredientsHandler = () => {
    Alert.alert(
      "Delete Ingredient",
      "Are you sure you want to delete this ingredient?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          text: "Delete",
          onPress: () => deleteIngredients(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingVertical: 20,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderColor: "#e0e0e0",
        }}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 12 }}>Serving Size</Text>
          <TextInput placeholder="4" maxLength={10}></TextInput>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 12 }}>Calories</Text>
          <TextInput placeholder="495" maxLength={15}></TextInput>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 12 }}>Prep Time</Text>
          <TextInput placeholder="35 mins" maxLength={10}></TextInput>
        </View>
      </View>
      <ScrollView>
        {Ingredients?.map((ingredient, index) => (
          <TouchableOpacity
            style={styles.ingredients}
            key={index}
            onLongPress={deleteIngredientsHandler}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                borderRightWidth: 1,
                width: "60%",
              }}
            >
              <TextInput
                value={ingredient.text}
                onChangeText={updateIngredientText.bind(this, index)}
                multiline={true}
                placeholder="Add ingredient"
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "50%",
                paddingHorizontal: 40,
              }}
            >
              <TextInput
                placeholder="2"
                maxLength={5}
                value={ingredient.quantity}
                onChangeText={updateIngredientQuantity.bind(this, index)}
                textAlign="center"
                style={{borderWidth:1, borderColor:"#e0e0e0"}}
              />
              <TextInput
                placeholder="tbsp"
                maxLength={10}
                value={ingredient.unit}
                onChangeText={updateIngredientUnit.bind(this, index)}
                textAlign="center"
                style={{borderWidth:1, borderColor:"#e0e0e0"}}
              />
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={addIngredientsToState}>
          <View style={styles.AddIngredients}>
            {/* <Text style={styles.add_instruction_id}>
              {Ingredients?.length + 1}
            </Text> */}
            <View style={styles.instructions_image_view}>
              <Image
                source={require("../../../assets/plus-add.png")}
                style={styles.add_instructions_image}
              ></Image>
            </View>
            <Text style={styles.add_instruction_text}>Add Ingredients</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateIngredients;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  ingredients: {
    width: "100%",
    height: CreatePageSingleRecordHeight,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 20,
  },
  AddIngredients: {
    width: "100%",
    height: CreatePageSingleRecordHeight,
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
    height: CreatePageSingleRecordHeight,
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
  ingredient_id: {
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 20,
  },
  instruction_text_view: {
    width: "100%",
    fontSize: 10,
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
