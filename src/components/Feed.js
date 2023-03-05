import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import Post from "./Post";

export default function Feed() {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Post imageUri="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg" username="subhodip" />
        <Post imageUri="https://images.prestigeonline.com/wp-content/uploads/sites/4/2021/12/28134738/sam-moqadam-yxZSAjyToP4-unsplash-scaled-1.jpg" username="adam"/>
        <Post imageUri="https://www.wbcsd.org/var/site/storage/images/media/images/fresh_pa/80809-2-eng-GB/FRESH_PA_i1140.jpg" username="rahul"/>
        <Post imageUri="https://www.westcentralfoodservice.com/wp-content/uploads/2019/04/5-food-trends-2019-no-title.jpg" username="adam"/>
        <Post imageUri="https://media.cnn.com/api/v1/images/stellar/prod/221223111858-impossible-whopper-file.jpg?c=original" username="adam"/>
        <Post imageUri="https://www.refrigeratedfrozenfood.com/ext/resources/NEW_RD_Website/DefaultImages/default-pasta.jpg?1430942591" username="adam"/>
        <Post imageUri="https://images.prestigeonline.com/wp-content/uploads/sites/4/2021/12/28134738/sam-moqadam-yxZSAjyToP4-unsplash-scaled-1.jpg" username="adam"/>
        <Post imageUri="https://images.prestigeonline.com/wp-content/uploads/sites/4/2021/12/28134738/sam-moqadam-yxZSAjyToP4-unsplash-scaled-1.jpg" username="adam"/>
        <Post imageUri="https://images.prestigeonline.com/wp-content/uploads/sites/4/2021/12/28134738/sam-moqadam-yxZSAjyToP4-unsplash-scaled-1.jpg" username="adam"/>
        <Post imageUri="https://images.prestigeonline.com/wp-content/uploads/sites/4/2021/12/28134738/sam-moqadam-yxZSAjyToP4-unsplash-scaled-1.jpg" username="adam"/>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
  },
});
