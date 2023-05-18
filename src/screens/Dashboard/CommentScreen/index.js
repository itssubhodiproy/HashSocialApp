import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { SingleComment } from "../../../components/BottomDrawer/Comments";
import { CARD_HEIGHT, CARD_WIDTH } from "../../../Constants";
import { ActivityIndicator, TextInput } from "react-native-paper";
import { firebase } from "../../../config/firebase";
import { useNavigation } from "@react-navigation/native";

// retrive all comments for a particular post by post ID from firebase firestore and sort it by createdAt
const getAllCommentsByPostId = async (postId) => {
  const comments = await firebase
    .firestore()
    .collection("comments")
    .where("postId", "==", postId)
    .orderBy("createdAt", "desc")
    .get();
  const data = comments.docs.map((comment) => comment.data());
  // store the comment id in the comment object
  data.forEach((comment, index) => {
    comment.id = comments.docs[index].id;
  });
  return data;
};

const CommentScreen = (route) => {
  const navigation = useNavigation();
  const { item } = route.route.params;
  const isFocused = useIsFocused();
  const [AllComments, setAllComments] = React.useState([]);
  const [inputText, setInputText] = React.useState("");
  const [trigger, setTrigger] = React.useState(false);

  const [SelectedCommentForReply, setSelectedCommentForReply] =
    React.useState(null);

  const selectCommentforReplyHandler = (comment) => {
    setSelectedCommentForReply(comment);
  };

  const removeSelectedCommentForReplyHandler = () => {
    setSelectedCommentForReply(null);
  };

  const postReply = async () => {
    if (inputText === "") {
      Alert.alert("Please enter a reply");
      return;
    }
    const data = await firebase.firestore().collection("replies").add({
      commentId: SelectedCommentForReply.id,
      replyText: inputText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userName: firebase.auth().currentUser.displayName,
      authorId: firebase.auth().currentUser.uid,
      userImage: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    });
    setInputText("");
    removeSelectedCommentForReplyHandler();
    setTrigger(!trigger);
  };

  const postComment = async () => {
    if (inputText === "") {
      Alert.alert("Please enter a comment");
      return;
    }
    //get the user Details from the firebase auth
    const user = firebase.auth().currentUser;
    const comment = {
      postId: item.id,
      commentText: inputText,
      userName: user.displayName,
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      profilePic: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    };

    await firebase.firestore().collection("comments").add(comment);
    setInputText("");
    setTrigger(!trigger);
  };

  useEffect(() => {
    const setThatState = async () => {
      const data = await getAllCommentsByPostId(item.id);
      setAllComments(data);
    };
    setThatState();
  }, [isFocused, trigger]);

  return (
    <SafeAreaView
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: "white",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
          paddingRight: 10,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginBottom: CARD_HEIGHT * 0.1,
        }}
      >
        {AllComments ? (
          AllComments.map((comment, index) => (
            <SingleComment
              comment={comment}
              key={index}
              trigger={trigger}
              selectCommentforReplyHandler={selectCommentforReplyHandler}
            />
          ))
        ) : (
          <Text>No Comments yet.. </Text>
        )}
      </ScrollView>
      {/* Input field  */}
      <KeyboardAvoidingView>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            width: CARD_WIDTH,
          }}
        >
          {SelectedCommentForReply ? (
            <View
              style={{
                height: 50,
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
                width: CARD_WIDTH,
              }}
            >
              <View style={{ width: "80%", flex: 1 }}>
                <Text>
                  Replying to:{" "}
                  {SelectedCommentForReply.commentText.length > 50
                    ? SelectedCommentForReply.commentText.slice(0, 50) + "..."
                    : SelectedCommentForReply.commentText}
                </Text>
              </View>

              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={removeSelectedCommentForReplyHandler}
              >
                <Image
                  source={require("../../../../assets/black-cross.png")}
                  style={{ width: 20, height: 20 }}
                ></Image>
              </TouchableOpacity>
            </View>
          ) : null}

          <View
            style={{
              height: 70,
              backgroundColor: "white",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 12,
                borderWidth: 1,
                marginLeft: 10,
              }}
            >
              <Image
                source={require("../../../../assets/gallery-black.png")}
                style={{ width: 25, height: 25 }}
              ></Image>
            </TouchableOpacity>
            <TextInput
              placeholder="hello world"
              style={{ width: CARD_WIDTH * 0.6 }}
              value={inputText}
              onChangeText={(text) => setInputText(text)}
            ></TextInput>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                padding: 10,
                borderRadius: 12,
                borderWidth: 1,
                marginRight: 10,
              }}
              onPress={!SelectedCommentForReply ? postComment : postReply}
            >
              <Image
                source={require("../../../../assets/sent-msg.png")}
                style={{ width: 25, height: 25 }}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({});
