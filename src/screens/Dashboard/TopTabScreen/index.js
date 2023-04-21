import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FollowingTab from "./FollowingTab";
import RecepiesTab from "./RecepiesTab";
import DiscoveryTab from "./DiscoveryTab";
import ForYouTab from "./ForYouTab";
import BottomBar from "../../../components/FeedScreen/BottomBar";

const Tab = createMaterialTopTabNavigator();

const TopTabScreen = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="For You"
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarLabelStyle: { fontSize: 10, fontWeight: "bold" },
          tabBarAndroidRipple: { borderless: false },
          tabBarIndicatorStyle: {
            backgroundColor: "white",
            display: "flex",
            height: 2,
            borderRadius: 10,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: "transparent",
            borderWidth: 0,
          },
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
          },
        }}
      >
        <Tab.Screen
          name="For You"
          component={ForYouTab}
          options={{
            tabBarLabel: "For You",
          }}
        />
        <Tab.Screen
          name="Following"
          component={FollowingTab}
          options={{
            tabBarLabel: "Following",
          }}
        />
        <Tab.Screen
          name="Recepies"
          component={RecepiesTab}
          options={{
            tabBarLabel: "Recepies",
          }}
        />
        <Tab.Screen
          name="Discovery"
          component={DiscoveryTab}
          options={{
            tabBarLabel: "Discovery",
          }}
        />
      </Tab.Navigator>
      {/* <BottomBar /> */}
    </>
  );
};

export default TopTabScreen;
