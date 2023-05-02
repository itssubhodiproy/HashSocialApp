import { firebase } from "./config/firebase";
// import ImageResizer from 'react-native-image-resizer';
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { Image } from "react-native";
import { CARD_HEIGHT, CARD_WIDTH } from "./Constants";
import * as VideoThumbnails from "expo-video-thumbnails";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";

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

export const compressVideo = async (videoUri) => {
  try {
    // generate a thumbnail image for the video
    const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri);

    // determine the output file path and name
    const outputFileName = `${FileSystem.documentDirectory}compressed.mp4`;

    // use the handleVideo method to compress the video and save to local file system
    const source = { uri, type: "video/mp4" };
    const destination = { uri: outputFileName, type: "video/mp4" };
    const result = await Video.compressAsync(source, destination, {
      quality: Video.QUALITY_MEDIUM,
      maxDuration: 60, // limit the maximum duration of the compressed video to 60 seconds
    });
    return { uri: result.uri, width: result.width, height: result.height };
  } catch (error) {
    console.error(error);
  }
};
