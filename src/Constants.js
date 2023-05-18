import { Dimensions } from "react-native";
export const CARD_HEIGHT = Dimensions.get("window").height;
export const CARD_WIDTH = Dimensions.get("window").width;

export const CreatePageSingleRecordHeight =
  Dimensions.get("window").height * 0.15;

export const AllCategories = [
  "Western",
  "Asian",
  "Fusion",
  "Dessert",
  "Low Calorie",
  "Vegetarian",
  "Halal",
  "Indian",
];

export const AllCommentsDummy = [
  {
    id: 1,
    text: "This is a comment 1",
    userName: "John Doe",
    TimeRangeEarlier: "1h ago",
    parentId: 1,
  },
  {
    id: 2,
    text: "This is a comment 2",
    userName: "John Doe",
    TimeRangeEarlier: "1h ago",
    parentId: 2,
  },
  {
    id: 3,
    text: "This is a comment 3",
    userName: "John Doe",
    TimeRangeEarlier: "1h ago",
    parentId: 1,
  },
  {
    id: 4,
    text: "This is a comment 4",
    userName: "John Doe",
    TimeRangeEarlier: "1h ago",
    parentId: 2,
  },
  {
    id: 5,
    text: "This is a comment 5",
    userName: "John Doe",
    TimeRangeEarlier: "1h ago",
    parentId: 5,
  },
];
