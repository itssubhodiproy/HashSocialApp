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

const InputField = () => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
        width: CARD_WIDTH,
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
      ></TextInput>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          padding: 10,
          borderRadius: 12,
          borderWidth: 1,
          marginRight: 10,
        }}
      >
        <Image
          source={require("../../../../assets/sent-msg.png")}
          style={{ width: 25, height: 25 }}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};
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
    if (isFocused) {
      // retrieve all comments from the database and set it to allComments state
      const setThatState = async () => {
        const data = await getAllCommentsByPostId(item.id);
        // console.log(data);
        setAllComments(data);
      };
      setThatState();
    } else {
      // reset allComments state
      setAllComments([]);
    }
  }, [isFocused, trigger]);

  const redirectToReplyScreen = (comment) => {
    // console.log(comment);
    // navigate to reply screen
    navigation.navigate("ReplyScreen", { comment: JSON.stringify(comment) });
  };

  return (
    <SafeAreaView style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
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
              redirectToReplyScreen={redirectToReplyScreen}
            />
          ))
        ) : (
          <ActivityIndicator color="orange" size="large"></ActivityIndicator>
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
            onPress={postComment}
          >
            <Image
              source={require("../../../../assets/sent-msg.png")}
              style={{ width: 25, height: 25 }}
            ></Image>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CommentScreen;

const styles = StyleSheet.create({});
