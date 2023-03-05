import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import Post from "./Post";

export default function Feed() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
  },
});
