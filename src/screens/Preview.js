import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Preview = ({ route }) => {
  const navigation = useNavigation();
  const { photo } = route.params;
  return (
    <View>
      <Image
        // source={{ uri: photo.uri }}
        source={{ uri: photo }}
        style={{ height: "100%" }}
      />

      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
          <Image
            source={require("../../assets/repeat.png")}
            style={styles.button}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateScreen", { photo: photo })}
        >
          <Image
            source={require("../../assets/hashlogo.png")}
            style={styles.button}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
          <Image
            source={require("../../assets/discovery.png")}
            style={styles.button}
          ></Image>
        </TouchableOpacity>
      </View>
      <Text style={styles.moral_text}>Get Hashed</Text>
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
  back_button_position: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  button: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  container: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  moral_text: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});
