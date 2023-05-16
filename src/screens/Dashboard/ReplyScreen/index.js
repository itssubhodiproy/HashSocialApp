import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { CARD_HEIGHT, CARD_WIDTH } from "../../../Constants";
import { ActivityIndicator } from "react-native-paper";
import { SingleComment } from "../../../components/BottomDrawer/Comments";
import { firebase } from "../../../config/firebase";
import { useIsFocused } from "@react-navigation/native";

const ReplyScreen = (route) => {
  const comment = JSON.parse(route.route.params.comment);
  const isFocused = useIsFocused();
  const [inputText, setInputText] = React.useState("");
  const [trigger, setTrigger] = React.useState(false);
  // post a reply to the comment
  const postReply = async () => {
    const data = await firebase.firestore().collection("replies").add({
      commentId: comment.id,
      replyText: inputText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userName: firebase.auth().currentUser.displayName,
      authorId: firebase.auth().currentUser.uid,
      userImage: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    });
    setInputText("");
    setTrigger(!trigger);
  };

  // retrive all the replies based on the comment id and sort them by time
  const getReplies = async () => {
    const data = await firebase
      .firestore()
      .collection("replies")
      .where("commentId", "==", comment.id)
      .orderBy("createdAt", "desc")
      .get();
    const replies = data.docs.map((doc) => doc.data());
    return replies;
  };

  const [Replies, setReplies] = React.useState([]);

  useEffect(() => {
    if (isFocused) {
      const getData = async () => {
        const replyData = await getReplies();
        console.log("replyData", replyData);
        setReplies(replyData);
      };
      getData();
    } else {
      setReplies([]);
    }
  }, [isFocused, trigger]);

  return (
    <SafeAreaView
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
          paddingRight: 10,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: CARD_WIDTH,
        }}
      >
        <View style={{ borderWidth: 1, width: CARD_WIDTH }}>
          <SingleComment comment={comment}></SingleComment>
        </View>

        {Replies?.length > 0 ? (
          Replies.map((reply, index) => (
            <SingleComment comment={reply} key={index} />
          ))
        ) : (
          <ActivityIndicator color="orange" size="large"></ActivityIndicator>
        )}
      </ScrollView>
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
            onPress={postReply}
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

export default ReplyScreen;

const styles = StyleSheet.create({});
