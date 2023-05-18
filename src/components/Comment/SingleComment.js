import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const SingleComment = ({ comment }) => {
  const dummyText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.";
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <Image
          source={{
            uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
          }}
          style={{ width: 40, height: 40, borderRadius: 100 }}
        />
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontWeight: "bold" }}>{comment.authorUserName}</Text>
          <Text style={{ fontSize: 12 }}>54 Creations</Text>
        </View>
      </View>
      <Text style={{ paddingVertical: 10 }}>{comment.commentText} </Text>
    </View>
  );
};

export default SingleComment;

const styles = StyleSheet.create({});
