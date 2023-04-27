import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";

const Ingredients = ({ item }) => {
  const [Ingredients, setIngredients] = useState(item.ingredients);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "#fc433c",
            textDecorationLine: "underline",
            fontWeight: "bold",
          }}
        >
          Items
        </Text>
        <Text
          style={{
            color: "#fc433c",
            textDecorationLine: "underline",
            fontWeight: "bold",
          }}
        >
          Quantity
        </Text>
      </View>
      {Ingredients?.map((ingredient, index) => {
        return (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottomWidth: 2,
              borderColor: "#e0e0e0",
              margin: 15,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                // marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 15, color: "grey" }}>{index + 1}: </Text>
              <Text
                style={{
                  fontSize: 15,
                  flex: 1,
                  flexWrap: "wrap",
                }}
              >
                {ingredient.text}
              </Text>
            </View>
            <Text>{ingredient.quantity}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Ingredients;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    // display: "flex",
    // alignItems: "center",
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  subtext: {
    fontSize: 12,
    color: "grey",
    marginTop: 10,
  },
});
