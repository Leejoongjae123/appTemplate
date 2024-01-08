import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import List from "../screens/List";
import SecondScreen from "../screens/SecondScreen";
import MainTabs from "./MainTabs";

const MainStack = createNativeStackNavigator();
const Main = () => {

  

  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
      <MainStack.Screen name="List" component={List} />
    </MainStack.Navigator>
  );
};

export default Main;
