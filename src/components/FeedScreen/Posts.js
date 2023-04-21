import { createStackNavigator } from "@react-navigation/stack";
import ImagePost from "./ImagePost";
import DescriptionPost from "./DescriptionPost";
import { useState } from "react";
import { Alert, Text } from "react-native";
import BottomDrawerTab from "../BottomDrawer/BottomDrawer";
import BottomDrawer from "react-native-bottom-drawer-view";
import { CARD_HEIGHT } from "../../Constants";

const Stack = createStackNavigator();

const Posts = ({ item }) => {
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);

  const openBottomDrawer = () => {
    setIsBottomDrawerOpen(true);
  };

  const toggleDrawer = () => {
    setIsBottomDrawerOpen(!isBottomDrawerOpen);
  };

  const closeBottomDrawer = () => {
    setIsBottomDrawerOpen(false);
  };

  return (
    <>
      <ImagePost
        item={item}
        openBottomDrawer={openBottomDrawer}
        toggleDrawer={toggleDrawer}
      />
      {isBottomDrawerOpen && (
        <BottomDrawer
          containerHeight={CARD_HEIGHT * 0.6}
          onCollapsed={closeBottomDrawer}
        >
          <BottomDrawerTab item={item} />
        </BottomDrawer>
      )}
    </>
  );
};

export default Posts;
