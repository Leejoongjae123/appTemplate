import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  View,
  Alert,
  ImageURISource,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Text, Button } from "react-native-rapi-ui";
import { supabase } from "../initSupabase";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import Push from "../components/Push";
import { Camera } from "expo-camera";
import { Video } from "expo-av";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import ModalWindowSend from "./ModalWindowSend";
import ModalWindow from "./ModalWindow";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  let cameraRef = useRef();
  // const [cameraRef, setCameraRef] = useState()
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState();
  const [imageBase64, setImageBase64] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [cameraOrientation, setCameraOrientation] = useState("portrait");
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [isGetUrlComplete, setIsGetUrlComplete] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");
  const [savePath, setSavePath] = useState("")

  const isFocused = useIsFocused(); // 포커스 시 변경

  const uploadVideo = async (imageBase64) => {
    const videoName = `${session.user.email}_${getCurrentDateTime()}`;
    setSavePath(videoName)
    var { data, error } = await supabase.storage
      .from("videos")
      .upload(`videos/${videoName}.mp4`, decode(imageBase64), {
        contentType: "video/mp4",
      });
    if (error) {
      console.log(error);
    } else {
      console.log("파일업로드완료", data);
      setIsUploadComplete(true);
    }
  };

  const uploadData=async(uploadUrl,savePath)=>{
    var { error } = await supabase.from("uploadData").insert({
      video: `https://fydgwkkgfigeihwzhekm.supabase.co/storage/v1/object/public/videos/videos/${savePath}.mp4`,
      email: session.user.email,
      title: title,
      googledriveurl: uploadUrl,
    });

    if (error) {
      console.log("에러발생:", error);
    } else {
      console.log("전송완료");
    }
  }

  useEffect(()=>{
    if(uploadUrl&&savePath){
      uploadData(uploadUrl,savePath)
    }
  },[uploadUrl])

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    };
    getPermission();
    setIsRecording(false);
    // tabbottomnav를 숨김
    // navigation.setOptions({ tabBarStyle: { display: "none" } });
    // 처음에 auth 정보를 받음
    const session = supabase.auth.session();
    setSession(session);
  }, [isFocused]);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      if (window.width < window.height) {
        setCameraOrientation("portrait");
      } else {
        setCameraOrientation("landscape");
      }
    });

    return () => subscription.remove();
  }, []);

  console.log(uploadUrl);
  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    console.log("1234");
    return <Text style={{ color: "white" }}>Requestion permissions...</Text>;
  } else if (!hasCameraPermission) {
    console.log("4321");
    return (
      <Text style={{ color: "white" }}>Permission for camera not granted.</Text>
    );
  }

  let recordVideo = () => {
    setIsRecording(true);
    let options = {
      quality: Camera.Constants.VideoQuality["720p"],
      maxDuration: 5, // 녹화 최대 지속 시간 (초 단위)
      mute: false, // 오디오 녹음 여부
      fileFormat: "mp4", // MP4 형식으로 저장
    };
    cameraRef.current.recordAsync(options).then(async (recordedVideo: any) => {
      setVideo(recordedVideo);
      setIsRecording(false);
      setIsModalVisible(true);
    });
  };

  let stopRecording = async () => {
    cameraRef?.current.stopRecording();
    setIsRecording(false);
  };

  const fetchGoogleDrive = async () => {
    const headers = {
      "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      Connection: "keep-alive",
      Referer: "http://3.38.97.252/docs",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "application/json",
    };

    const params = {
      useremail: session.user.email,
    };

    try {
      const response = await axios.get("https://y7c3hqick3zvhfeq2eemafyysa0audcu.lambda-url.ap-northeast-2.on.aws/getPath", {
        params,
        headers,
      });
      // console.log(response.data);
      setUploadUrl(response.data);
      setIsGetUrlComplete(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{ position: "absolute", zIndex: 1, top: 0, right: 0 }}
        ></View>
        <ModalWindowSend
          title={title}
          setTitle={setTitle}
          address={address}
          setAddress={setAddress}
          description={description}
          setDescription={setDescription}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          video={video}
          uploadVideo={uploadVideo}
          isUploadComplete={isUploadComplete}
          setIsUploadComplete={setIsUploadComplete}
          fetchGoogleDrive={fetchGoogleDrive}
          uploadUrl={uploadUrl}
          setUploadUrl={setUploadUrl}
          isGetUrlComplete={isGetUrlComplete}
          setIsGetUrlComplete={setIsGetUrlComplete}
        ></ModalWindowSend>
        {isFocused && (
          <Camera style={{ flex: 1, justifyContent: "center" }} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#DE4743",
                    borderRadius: 70,
                    width: 70,
                    height: 70,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {isRecording ? (
                      <TouchableOpacity
                        onPress={() => {
                          stopRecording();
                          setIsModalVisible(true);
                        }}
                      >
                        <Ionicons name={"stop"} size={40} color={"white"} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={recordVideo}>
                        <Ionicons name={"stop"} size={40} color={"#DE4743"} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </Camera>
        )}

        <View></View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "10%",
    margin: "auto",
    position: "absolute",
    bottom: "3%",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  buttonRecord: {
    flex: 1,
    alignItems: "center",
  },
});

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더해줌
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}
