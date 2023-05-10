import { createStackNavigator } from "@react-navigation/stack";
import ImagePost from "./ImagePost";
import DescriptionPost from "./DescriptionPost";
import { useState } from "react";
import { Alert, Text } from "react-native";
import BottomDrawerTab from "../BottomDrawer/BottomDrawer";
import BottomDrawer from "react-native-bottom-drawer-view";
import { CARD_HEIGHT } from "../../Constants";

const Posts = ({ item, focusedIndex, index}) => {
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);

  const openBottomDrawer = () => {
    setIsBottomDrawerOpen(true);
  };


  const closeBottomDrawer = () => {
    setIsBottomDrawerOpen(false);
  };

  return (
    <>
      <ImagePost
        item={item}
        openBottomDrawer={openBottomDrawer}
        focusedIndex={focusedIndex}
        index={index}
      />
      {isBottomDrawerOpen && (
        <BottomDrawer
          containerHeight={CARD_HEIGHT * 0.8}
          onCollapsed={closeBottomDrawer}
        >
          <BottomDrawerTab item={item} />
        </BottomDrawer>
      )}
    </>
  );
};

export default Posts;
