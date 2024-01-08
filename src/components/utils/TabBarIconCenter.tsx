import React from "react";
import { themeColor, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { SvgUri } from "react-native-svg";

export default ({ icon, focused }: { icon: any; focused: boolean }) => {
  const { isDarkmode } = useTheme();
  return (
    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: 80,
        bottom: "30%",
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 0,
      }}
    >
      <View style={{marginLeft:5,marginBottom:5}}>
        <Ionicons
          name={icon}
          style={{ marginBottom: -7 }}
          size={40}
          color={
            focused
              ? isDarkmode
                ? themeColor.white100
                : themeColor.primary
              : "white"
          }
        />
        

      </View>
    </View>
  );
};
