import { firebase } from "./config/firebase";
// import ImageResizer from 'react-native-image-resizer';
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
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
          console.log(doc.id);
          post.id = doc.id;
          newPosts.push(post);
        });
        resolve(newPosts);
      }, reject);
  });
};

export const compressImage = async (uri, format = SaveFormat.PNG) => {
  // SaveFormat.PNG
  const result = await manipulateAsync(
    uri,
    [{ resize: { width: CARD_WIDTH, height: CARD_HEIGHT } }],
    {
      compress: 0.3,
      format,
    }
  );
  // console.log(result);
  return {
    name: `${Date.now()}.${format}`,
    type: `image/${format}`,
    ...result,
  };
  // return: { name, type, width, height, uri }
};

export const getFileType = (uri) => {
  const extension = uri.split(".").pop();
  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
  const videoExtensions = ["mp4", "mov", "avi"];

  if (imageExtensions.includes(extension)) {
    return "image";
  } else if (videoExtensions.includes(extension)) {
    return "video";
  } else {
    return "unknown";
  }
};

export const getAllCommentsByPostId = async (postId) => {
  const comments = await firebase
    .firestore()
    .collection("comments")
    .where("postId", "==", postId)
    .orderBy("createdAt")
    .get();
  const data = comments.docs.map((comment) => comment.data());
  return data;
};

export const postComment = async (comment) => {
  const db = firebase.firestore();
  await db.collection("comments").add(comment);
};
