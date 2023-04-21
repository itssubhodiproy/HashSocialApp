import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Camera } from "expo-camera";
import { useIsFocused } from "@react-navigation/native";

const CameraPermission = () => {
  return (
    <View>
      <Text>CameraPermission</Text>
    </View>
  );
};

export default CameraPermission;

const styles = StyleSheet.create({});
