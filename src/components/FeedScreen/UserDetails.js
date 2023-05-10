import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { CARD_HEIGHT, CARD_WIDTH } from "../../Constants";
import { useNavigation } from "@react-navigation/native";

const UserDetails = ({ item, openBottomDrawer }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={openBottomDrawer}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            textDecorationLine: "underline",
          }}
        >
          {item ? item.title : "RecipeTitle"}
        </Text>
        <View
          style={{
            paddingVertical: 10,
            borderRadius: 10,
          }}
        >
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/137/137624.png",
            }}
            style={{ width: 20, height: 20, marginHorizontal: 5 }}
          ></Image>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 10,
        }}
        onPress={() =>
          navigation.navigate("OtherUserProfileScreen", {
            item: item,
          })
        }
      >
        <Image
          source={{ uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg" }}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        ></Image>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: "white", fontWeight: "600", fontSize: 15 }}>
            {item.userName}
          </Text>
          <Text style={{ color: "yellow", fontWeight: "600", fontSize: 10 }}>
            54 Creations, 19 Forks
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: CARD_HEIGHT * 0.12,
    alignSelf: "center",
    width: CARD_WIDTH * 0.9,
    height: CARD_HEIGHT * 0.13,
    paddingLeft: 20,
    // backgroundColor: "yellow",
  },
});
