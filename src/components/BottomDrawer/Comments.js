import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { firebase } from "../../config/firebase";
import { ActivityIndicator } from "react-native-paper";

export const SingleComment = ({ comment, redirectToReplyScreen }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: "100%",
        borderRightWidth: 1,
        borderColor: "white",
      }}
    >
      <Image
        source={{
          uri: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
        }}
        style={{ width: 40, height: 40, borderRadius: 100 }}
      />
      <View
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginLeft: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {comment ? comment.userName : "Text"}
        </Text>
        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            marginRight: 10,
          }}
        >
          <Text style={{ fontSize: 14 }}>
            {comment
              ? comment.commentText
                ? comment.commentText
                : comment.replyText
              : "This is comment"}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "400", color: "gray", fontSize: 13 }}>
            {comment ? comment.TimeRangeEarlier : "1h ago"}
          </Text>
          {redirectToReplyScreen ? (
            <TouchableOpacity onPress={() => redirectToReplyScreen(comment)}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "gray",
                  paddingHorizontal: 15,
                }}
              >
                Reply
              </Text>
            </TouchableOpacity>
          ) : null}

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 5,
            }}
          >
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Red_star.svg/220px-Red_star.svg.png",
              }}
              style={{ width: 15, height: 15, marginRight: 3 }}
            ></Image>
            <Text style={{ color: "red", fontWeight: "600" }}>
              {comment && comment.upvoteCount ? comment.upvoteCount : 1}
            </Text>
          </View>
        </View>
        {redirectToReplyScreen ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 10,
            }}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/25/25623.png",
              }}
              style={{ width: 10, height: 10, marginRight: 3 }}
            ></Image>
            <Text style={{ fontWeight: "bold", color: "green" }}>
              Show Reply
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const Comments = ({ item }) => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [AllComments, setAllComments] = React.useState([]);

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

  useEffect(() => {
    if (isFocused) {
      const getData = async () => {
        const commentData = await getAllCommentsByPostId(item.id);
        // set upto three comments in the state
        setAllComments(commentData.slice(0, 3));
      };
      getData();
    } else {
      setAllComments([]);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {AllComments.length > 0 ? (
        AllComments.map((comment, index) => {
          return (
            <SingleComment
              key={index}
              comment={comment}
            />
          );
        })
      ) : (
        <Text>No comments yet.. </Text>
      )}

      <TouchableOpacity
        style={{ position: "absolute", alignSelf: "center", bottom: 0 }}
        onPress={() => navigation.navigate("CommentScreen", { item: item })}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "green",
            fontSize: 16,
          }}
        >
          Show all comments
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    paddingTop: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  subtext: {
    fontSize: 12,
    color: "grey",
    marginTop: 10,
  },
});
