import { firebase } from "./config/firebase";
// import ImageResizer from 'react-native-image-resizer';
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Image } from "react-native";
import { CARD_HEIGHT, CARD_WIDTH } from "./Constants";

export const getPost = () => {
  const markers = [
    { id: 1, name: "subhodip" },
    { id: 2, name: "Mark" },
  ];
  return markers;
};

export const getAllPosts = () => {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const newPosts = [];
        querySnapshot.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          newPosts.push(post);
        });
        resolve(newPosts);
      }, reject);
  });
};

export const compressImage = async (uri, format = SaveFormat.PNG) => {
  // SaveFormat.PNG
  const result = await manipulateAsync(uri, [{ resize: { width: CARD_WIDTH, height:CARD_HEIGHT } }], {
    compress: 0.3,
    format,
  });
  // console.log(result);
  return {
    name: `${Date.now()}.${format}`,
    type: `image/${format}`,
    ...result,
  };
  // return: { name, type, width, height, uri }
};
