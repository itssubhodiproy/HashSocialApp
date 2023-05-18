import {
  StyleSheet,
  Text,
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  SafeAreaView,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getAllPosts, getFileType } from "../../../Api";
import { CARD_HEIGHT } from "../../../Constants";
import { ActivityIndicator } from "react-native-paper";
import Posts from "../../../components/FeedScreen/Posts";

const ForYouTab = () => {
  const isFocused = useIsFocused();
  const [posts, setposts] = useState([]);
  const [focusedIndex, setFocusedIndex] = React.useState(0);

  // api call for user posts
  useEffect(() => {
    if (isFocused) {
      console.log("api called");
      getAllPosts().then((data) => {
        setposts(data);
      });
    } else {
      setposts([]);
    }
  }, [isFocused]);

  console.log(focusedIndex);

  return (
    <SafeAreaView style={styles.container}>
      {posts.length ? (
        <FlatList
          onScroll={(e) => {
            const index = Math.round(
              e.nativeEvent.contentOffset.y / CARD_HEIGHT
            );
            setFocusedIndex(index);
          }}
          snapToInterval={CARD_HEIGHT}
          snapToAlignment="center"
          decelerationRate={"fast"}
          data={posts}
          initialNumToRender={5}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            (<Posts item={item} focusedIndex={focusedIndex} index={index} />)
          }
        />
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#fc433c" />
        </View>
        // <Posts/>
      )}
      {/* <BottomBar /> */}
    </SafeAreaView>
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
