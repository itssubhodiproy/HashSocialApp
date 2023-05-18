import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import SingleComment from "./SingleComment";

const ParentComment = ({
  parentComment,
  AllComments,
  SetParentCommentHandler,
}) => {
  const [showReply, setShowReply] = React.useState(false);

  const showReplyHandler = () => {
    setShowReply(!showReply);
  };

  return (
    <View
      style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, padding: 10 }}
    >
      <SingleComment comment={parentComment} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <TouchableOpacity
          onPress={() => SetParentCommentHandler(parentComment)}
          style={{ paddingHorizontal: 5 }}
        >
          <Text>Reply</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showReplyHandler}
          style={{ paddingHorizontal: 5 }}
        >
          <Text>{showReply ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      {showReply ? (
        <View style={{ marginLeft: 20, marginTop: 10 }}>
          {AllComments.length > 0 ? (
            AllComments.map((comment, index) => {
              if (
                comment.parentId === parentComment.id &&
                comment.id !== comment.parentId
              ) {
                return <SingleComment key={index} comment={comment} />;
              }
            })
          ) : (
            <Text>No comments yet.. </Text>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default ParentComment;

const styles = StyleSheet.create({});
