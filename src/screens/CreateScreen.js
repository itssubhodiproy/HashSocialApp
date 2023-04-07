import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CreateScreen = ({ route }) => {
  const photo = route.params.photo;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Back</Text>
        <Text style={styles.header_mainText}>Streak Tartake</Text>
        <Text>Save</Text>
      </View>
      <View>
        <Text style={styles.description_heading}>Recepie Description</Text>
      </View>
      <View style={styles.description}>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type . It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged.
        </Text>
      </View>
      <View></View>
      <View></View>
    </View>
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
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header_mainText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description_heading: {
    width: "100%",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  description: {
    marginTop: 5,
    width: "100%",
  },
});
