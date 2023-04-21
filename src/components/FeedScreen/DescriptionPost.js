import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React from "react";
import { CARD_HEIGHT } from "../../Constants";
import BottomDrawer from "react-native-bottom-drawer-view";


const DescriptionPost = ({ isBottomDrawerOpen, closeBottomDrawer }) => {
  return (
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={isBottomDrawerOpen}
    //   onRequestClose={closeBottomDrawer}
    //   useNativeDriver={true}
    // >
    //   <View style={[styles.bottomSheet, { height: CARD_HEIGHT * 0.6}]}>
    //     <View
    //       style={{
    //         flex: 0,
    //         width: "100%",
    //         justifyContent: "space-between",
    //         flexDirection: "row",
    //       }}
    //     >
    //       <TouchableHighlight onPress={closeBottomDrawer}>
    //         <Text>Hide</Text>
    //       </TouchableHighlight>
    //     </View>
    //   </View>
    // </Modal>
    <></>
  );
};

export default DescriptionPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    borderWidth: 1,
    borderColor: "red",
  },
});
