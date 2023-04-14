import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Dimensions, Text } from "react-native";
import Post from "../components/Post";
// import { images } from "../../assets/images";
import { StatusBar } from "expo-status-bar";
import { firebase } from "../config/firebase";

const CARD_WIDTH = Dimensions.get("window").width;
const CARD_HEIGHT = Dimensions.get("window").height;

const Feed = () => {
  const [canSee, setCanSee] = useState(true);
  const [allPosts, setAllPosts] = useState([]);

  const seeHandler = () => {
    setCanSee(!canSee);
  };

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const newPosts = [];
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          newPosts.push(post);
        });
        setAllPosts(newPosts);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {allPosts.length > 0 ? (
        <FlatList
          snapToInterval={CARD_HEIGHT}
          snapToAlignment="center"
          decelerationRate={"fast"}
          data={allPosts}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={true}
          initialNumToRender={7}
          renderItem={({ item }) => (
            <Post item={item} seeHandler={seeHandler} canSee={canSee} />
          )}
        />
      ) : (
        <View>
          <Text>There's no posts to show</Text>
        </View>
      )}

      <StatusBar style="light" backgroundColor="black" translucent={false} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {},
});

export default Feed;
