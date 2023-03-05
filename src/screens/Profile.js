import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Profile = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.userDetails}>
          <Text>It's user details</Text>
        </View>
        <View style={styles.userPosts}>
          <Text>It's user posts</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    width: "100%",
  },
  userDetails: {
    width: "100%",
    // height: 500,
    // backgroundColor: "red",
  },
  userPosts: {
    width: "100%",
    // height: 500,
    // backgroundColor: "blue",
  },
});
