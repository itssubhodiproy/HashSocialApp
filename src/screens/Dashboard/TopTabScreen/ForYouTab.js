import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getAllPosts } from "../../../Api";
import { CARD_HEIGHT } from "../../../Constants";
import { ActivityIndicator } from "react-native-paper";
import Posts from "../../../components/FeedScreen/Posts";
import BottomDrawer from "react-native-bottom-drawer-view";
import BottomBar from "../../../components/FeedScreen/BottomBar";

const ForYouTab = () => {
  const isFocused = useIsFocused();
  const [posts, setposts] = useState([]);
  // api call for user posts
  useEffect(() => {
    if (isFocused) {
      console.log("api called");
      getAllPosts().then((data) => setposts(data));
    } else {
      setposts([]);
    }
  }, [isFocused]);

  // if(isFocused){
  //   console.log("api called");
  //   getAllPosts().then((data) => setposts(data));
  // }

  return (
    <View style={styles.container}>
      {posts.length ? (
        <FlatList
          snapToInterval={CARD_HEIGHT}
          snapToAlignment="center"
          decelerationRate={"fast"}
          data={posts}
          initialNumToRender={5}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Posts item={item} />}
        />
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#fc433c" />
        </View>
        // <Posts/>
      )}
      {/* <BottomBar /> */}
    </View>
  );
};

export default ForYouTab;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
