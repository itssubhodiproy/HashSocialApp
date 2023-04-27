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

export const Instructions = [
  {
    id: 1,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imageURL:
      "https://nationaltoday.com/wp-content/uploads/2020/06/Soul-Food-1-1.jpg",
  },
  {
    id: 2,
    text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
    imageURL:
      "https://media.self.com/photos/61096783e8a6e3edda24d8e8/1:1/w_3840,h_3840,c_limit/GettyImages-723523393%20(1).jpg",
  },
  {
    id: 3,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imageURL: "https://thumbs.dreamstime.com/z/number-1-made-food-26501131.jpg",
  },
  {
    id: 4,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imageURL: "https://thumbs.dreamstime.com/z/number-1-made-food-26501131.jpg",
  },
  {
    id: 5,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imageURL: "https://thumbs.dreamstime.com/z/number-1-made-food-26501131.jpg",
  },
  {
    id: 6,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imageURL: "https://thumbs.dreamstime.com/z/number-1-made-food-26501131.jpg",
  },
  {
    id: 7,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imageURL: "https://thumbs.dreamstime.com/z/number-1-made-food-26501131.jpg",
  },
  {
    id: 8,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    imageURL: "https://thumbs.dreamstime.com/z/number-1-made-food-26501131.jpg",
  },
];
