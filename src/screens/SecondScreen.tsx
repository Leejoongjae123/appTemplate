import React, { useContext, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
} from "react-native-rapi-ui";
import { Video, ResizeMode } from "expo-av";
import { AuthContext } from "../provider/AuthProvider";
import { Ionicons } from "@expo/vector-icons";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "SecondScreen">) {
  const { isDarkmode, setTheme } = useTheme();
  const [videoUrl, setVideoUrl] = useState(
    "https://fydgwkkgfigeihwzhekm.supabase.co/storage/v1/object/public/notification/videos/video1.mp4"
  );
  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(()=>{
    video.current.playAsync()
  },[])
  return (
    <Layout>
      <TopNav
        middleContent="음식 촬영 가이드"
        leftContent={
          <Ionicons name="chevron-back" size={20} color={themeColor.dark} />
        }
        leftAction={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#FFFDF4",
        }}
      >
        <View style={{ width: "100%", height: "70%" }}>
          <Video
            ref={video}
            style={{ width: "100%", height: "100%" }}
            source={{
              uri: videoUrl,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            columnGap: 20,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height:"10%"
          }}
        >
          <Button
            text={status.isPlaying ? "Pause" : "Play"}
            onPress={() =>
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync()
            }
            color="#F90"
          />
          <Button
            text={"Next"}
            onPress={() => {
              video.current.stopAsync();
              setVideoUrl(
                "https://fydgwkkgfigeihwzhekm.supabase.co/storage/v1/object/public/notification/videos/video2.mp4"
              );
              video.current.playAsync()
            }}
            color="#F90"
          />
        </View>
      </View>
    </Layout>
  );
}
