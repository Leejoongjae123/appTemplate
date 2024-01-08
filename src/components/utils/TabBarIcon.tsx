import React from "react";
import { themeColor, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
export default ({ icon, focused,size }: { icon: any; focused: boolean,size:any }) => {
  const { isDarkmode } = useTheme();
  return (
    <View >
      <Ionicons
        name={icon}
        style={{ marginBottom: -7 }}
        size={size}
        color={
          focused
            ? isDarkmode
              ? themeColor.white100
              : "#F90"
            : "rgb(143, 155, 179)"
        }
      />
    </View>
  );
};
