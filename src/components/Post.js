import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function Post() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.firstHeader}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
            }}
          />
          <Text style={styles.username}>@Subhodip</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/7066/7066144.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Image
          style={styles.postImage}
          source={{
            uri: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg",
          }}
        />
        <Text style={styles.caption}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
      </View>
      <View style={styles.engagementCount}>
        <Text>100 Likes</Text>
        <Text>9 comments</Text>
      </View>
      <View style={styles.activityRow}>
        <View style={styles.firstActivityRow}>
          <TouchableOpacity style={styles.button}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2/2267.png",
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1380/1380338.png",
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/25/25419.png",
              }}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/6165/6165217.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    width: "99%",
    borderWidth: 2,
    borderColor: "#d2d4d2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#d2d4d2",
    paddingHorizontal: 10,
  },
  firstHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    padding: 10,
    margin: 10,
  },
  caption: {
    margin: 10,
  },
  engagementCount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#d2d4d2",
    padding: 10,
  },
  content: {
    borderRadius: 10,
    width: "100%",
    // margin: 20,
  },
  username: {
    marginLeft: 0,
  },
  postImage: {
    // width: "100%",
    height: 200,
    // borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  button: {
    backgroundColor: "#e6e8e6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  firstActivityRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
