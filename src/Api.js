import { firebase } from "./config/firebase";

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
    db.collection("posts").orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
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
