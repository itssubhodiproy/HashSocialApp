import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { AllCategories } from "../../Constants";

const SingleCategory = ({ item, addOrRemoveCategory, isCategorySelected }) => {
  const isSelected = isCategorySelected(item);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: !isSelected ? "white" : "#fc433c",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        borderWidth: !isSelected ? 1 : 0,
        borderColor: "#fc433c",
      }}
      onPress={() => addOrRemoveCategory(item)}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: "500",
          color: !isSelected ? "#fc433c" : "white",
        }}
      >
        #{item}
      </Text>
    </TouchableOpacity>
  );
};

const AddCategory = ({ addOrRemoveCategory, isCategorySelected }) => {
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {AllCategories.map((item, index) => (
          <SingleCategory
            item={item}
            key={index}
            addOrRemoveCategory={addOrRemoveCategory}
            isCategorySelected={isCategorySelected}
          />
        ))}
      </View>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
});
