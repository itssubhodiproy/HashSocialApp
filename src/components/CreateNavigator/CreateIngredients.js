import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { CreatePageSingleRecordHeight } from "../../Constants";

// const Ingredients = [
//   {
//     id: 1,
//     text: "1 cup of water",
//     quantity: "1",
//   },
//   {
//     id: 2,
//     text: "1 cup of water",
//     quantity: "1",
//   },
//   {
//     id: 3,
//     text: "1 cup of water",
//     quantity: "1",
//   },
// ];

const CreateIngredients = ({
  addIngredientsToState,
  Ingredients,
  deleteIngredients,
  updateIngredientText,
  incrementQuantity,
  decrementQuantity,
}) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {Ingredients?.map((ingredient, index) => (
          <View style={styles.ingredients} key={index}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.ingredient_id}>{index + 1}</Text>
              <TextInput
                // style={styles.add_instruction_text}
                value={ingredient.text}
                onChangeText={updateIngredientText.bind(this, index)}
                multiline={true}
                placeholder="Add ingredient details"
              />
              {/* {ingredient.text} */}
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  // borderWidth: 1,
                  paddingHorizontal: 10,
                  margin: 20,
                  height: "80%",
                  borderRadius: 10,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity onPress={() => incrementQuantity(index)}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/153/153605.png",
                    }}
                    style={{ width: 15, height: 15 }}
                  ></Image>
                </TouchableOpacity>
                <Text>{ingredient.quantity}</Text>
                <TouchableOpacity onPress={() => decrementQuantity(index)}>
                  <Image
                    source={{
                      uri: "https://cdn-icons-png.flaticon.com/512/56/56889.png",
                    }}
                    style={{ width: 15, height: 15 }}
                  ></Image>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => deleteIngredients(index)}>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/3405/3405244.png",
                  }}
                  style={{ height: 20, width: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity onPress={addIngredientsToState}>
          <View style={styles.AddIngredients}>
            <Text style={styles.add_instruction_id}>
              {Ingredients?.length + 1}
            </Text>
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
