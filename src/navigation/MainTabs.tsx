import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";
import TabBarIconCenter from "../components/utils/TabBarIconCenter";
import { View } from "react-native";

import Home from "../screens/Home";
import About from "../screens/About";
import Profile from "../screens/Profile";
import Ionicons from 'react-native-vector-icons/Ionicons';
import SecondScreen from "../screens/SecondScreen";

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      
      screenOptions={{
        
        tabBarActiveTintColor: 'danger',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
          
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="홈" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-home"} size={25} />
          ),
        }}
        
      />
      
      <Tabs.Screen
        name="Profile"
        component={Profile}
        onPress={()=>{
          
        }}
          options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="촬영" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon='videocam' size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="About"
        component={About}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="정보" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"person"} size={25} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainTabs;
