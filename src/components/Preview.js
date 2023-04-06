import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Preview = ({ route }) => {
  const navigation = useNavigation();
  const { photo } = route.params;
  return (
    <View>
      <Image source={{ uri: photo.uri }} style={{ height: "100%" }} />
      <View style={styles.back_button_position}>
        <TouchableOpacity onPress={() => navigation.navigate("CameraScreen")}>
          <Image
            source={require("../../assets/back.png")}
            style={styles.back_button}
          ></Image>
        </TouchableOpacity>
      </View>
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
  back_button: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
