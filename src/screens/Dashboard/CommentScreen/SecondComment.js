import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { getAllCommentsByPostId, postComment } from "../../../Api";
import ParentComment from "../../../components/Comment/ParentComment";
import { AllCommentsDummy, CARD_HEIGHT, CARD_WIDTH } from "../../../Constants";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { firebase } from "../../../config/firebase";

const SecondComment = (route) => {
  const { item } = route.route.params;

  const isFocused = useIsFocused();
  const [AllComments, setAllComments] = React.useState([]);
  const [parentComment, setParentComment] = React.useState(null);
  const [inputText, setInputText] = React.useState("");

  const SetParentCommentHandler = (comment) => {
    setParentComment(comment);
  };
  const resetParentCommentHandler = () => {
    setParentComment(null);
  };

  const getAllComments = async (postId) => {
    const data = await getAllCommentsByPostId(postId);
    setAllComments(data);
  };
  const uploadComment = async () => {
    if (inputText.trim() === "") return alert("Please enter some text");
    const user = firebase.auth().currentUser;
    const comment = {
      id: AllComments.length + 1,
      parentId: parentComment ? parentComment.id : AllComments.length + 1,
      commentText: inputText,
      authorId: user.uid,
      authorUserName: user.displayName,
      postId: item.id,
      postOwnerId: item.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    setInputText("");
    parentComment ? setParentComment(null) : null;
    setAllComments([...AllComments, comment]);
    await postComment(comment);
  };

  React.useEffect(() => {
    // get all comments for a particular post
    if (isFocused) {
      getAllComments(item.id);
    }
  }, [isFocused]);

  return (
    <View
      style={{
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        display: "flex",
      }}
    >
      <View
        style={{
          height: CARD_HEIGHT * 0.06,
          backgroundColor: "white",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Comments</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {/* only render those items from AllComments array whose parentId is same as Id field */}
        {AllComments.length > 0 ? (
          AllComments.map((comment, index) => {
            if (comment.id === comment.parentId) {
              return (
                <ParentComment
                  key={index}
                  parentComment={comment}
                  AllComments={AllComments}
                  SetParentCommentHandler={SetParentCommentHandler}
                />
              );
            }
          })
        ) : (
          <Text>No comments yet.. </Text>
        )}
        <View style={{ height: CARD_HEIGHT * 0.15 }}></View>
      </ScrollView>
      <KeyboardAvoidingView
        style={{
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          width: CARD_WIDTH,
          padding: 10,
          backgroundColor: "#fff",
        }}
        behavior="padding"
      >
        {parentComment ? (
          <View
            style={{
              borderTopWidth: 1,
              borderColor: "#ccc",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text>
              Replying to:
              {/* only render upto 50 characters and add dot dot */}
              {parentComment.commentText.length > 25
                ? parentComment.commentText.substring(0, 25) + "..."
                : parentComment.commentText}
            </Text>
            <TouchableOpacity onPress={resetParentCommentHandler}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            value={inputText}
            onChangeText={(text) => setInputText(text)}
            style={{ width: "80%", marginRight: 10 }}
          />
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 12,
              borderWidth: 1,
            }}
            onPress={uploadComment}
          >
            <Image
              source={require("../../../../assets/sent-msg.png")}
              style={{ width: 25, height: 25 }}
            ></Image>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SecondComment;

const styles = StyleSheet.create({});
