import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Video } from "expo-av";

const PreviewScreen = ({ route, navigation }) => {
  const { cameraFile } = route.params;

  const fileExtension = cameraFile.uri.split(".").pop();
  const imageExtensions = ["jpg", "jpeg", "png", "gif"];
  const isImage = imageExtensions.includes(fileExtension);

  const goBackToCamera = () => {
    // removePhotoHandler();
    navigation.navigate("OpenCamera");
  };

  return (
    <View>
      {isImage ? (
        <Image
          source={{
            uri: cameraFile.uri,
          }}
          style={{ height: "100%" }}
        />
      ) : (
        <Video
          source={{ uri: cameraFile.uri }}
          style={{ height: "100%" }}
          shouldPlay
          isLooping
          resizeMode="cover"
        />
      )}

      <View style={styles.container}>
        <TouchableOpacity onPress={goBackToCamera}>
          <Image
            source={require("../../../../assets/repeat.png")}
            style={styles.button}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateScreen", { cameraFile: cameraFile })}
        >
          <Image
            source={require("../../../../assets/hashlogo.png")}
            style={styles.button}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../../../assets/discovery.png")}
            style={styles.button}
          ></Image>
        </TouchableOpacity>
      </View>
      <Text style={styles.moral_text}>Get Hashed</Text>
    </View>
  );
};

export default PreviewScreen;

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
