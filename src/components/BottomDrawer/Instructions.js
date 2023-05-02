import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useState } from "react";

const Instructions = ({ item }) => {
  const [instructions, setInstructions] = useState(item.instructions);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {instructions?.map((instruction, index) => {
        return (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              borderBottomWidth: 2,
              borderColor: "#e0e0e0",
            }}
          >
            <Text style={styles.subtext}>{index + 1}.</Text>
            <Image
              style={{ width: 60, height: 60, margin: 10, borderWidth: 2 }}
              source={{ uri: instruction.fileURL }}
            />
            <Text
              style={{
                fontSize: 12,
                marginVertical: 10,
                flex: 1,
                flexWrap: "wrap",
              }}
            >
              {instruction.text}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
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
