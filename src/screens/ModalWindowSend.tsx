import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Layout,
  TextInput,
  Button,
  Text,
  useTheme,
  CheckBox,
} from "react-native-rapi-ui";
import { Modal, Dimensions } from "react-native";
import * as FileSystem from "expo-file-system";
import { Ionicons } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

export default function ModalWindow({
  title,
  setTitle,
  address,
  setAddress,
  description,
  setDescription,
  isModalVisible,
  setIsModalVisible,
  video,
  uploadImage,
  isComplete,
  setIsComplete,
}) {
  const [isSend, setIsSend] = useState(false);

  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    setProgressValue(-20);
    // 5초 후에 progressValue를 30으로 변경

    const timer1 = setTimeout(() => {
      setProgressValue(20);
    }, 3000);

    // 15초 후에 progressValue를 80으로 변경
    const timer2 = setTimeout(() => {
      setProgressValue(50);
    }, 6000);
    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    return () => {
      if (!isComplete) {
        clearTimeout(timer1);
        clearTimeout(timer2);
      }
    };
  }, [isModalVisible]);

  const onPressModalOpen = () => {
    console.log("팝업을 여는 중입니다.");
    setIsModalVisible(true);
  };

  const onPressModalClose = async () => {
    const base64 = await FileSystem.readAsStringAsync(video.uri, {
      encoding: "base64",
    });
    uploadImage(base64);
    setTitle("");
    setAddress("");
    setDescription("");
  };

  const onPressModalClose2 = async () => {
    setIsModalVisible(false);
    setIsSend(false);
  };

  useEffect(() => {
    // isComplete가 true로 변경될 때 타이머를 설정합니다.
    if (isComplete) {
      const timer = setTimeout(() => {
        setIsModalVisible(false);
        setIsComplete(false);
        setIsSend(false);
      }, 3000);

      // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  const ANGLE = 10;
  const TIME = 100;
  const EASING = Easing.elastic(1.5);

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  useEffect(()=>{
    rotation.value = withSequence(
      // deviate left to start from -ANGLE
      withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
      // wobble between -ANGLE and ANGLE 7 times
      withRepeat(
        withTiming(ANGLE, {
          duration: TIME,
          easing: EASING,
        }),
        7,
        true
      ),
      // go back to 0 at the end
      withTiming(0, { duration: TIME / 2, easing: EASING })
    );
  },[isComplete])

  if (!isComplete) {
    return (
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View style={styles.centeredView}>
          {isSend ? (
            <View style={styles.modalView}>
              <View style={{ position: "absolute", right: "5%", top: "5%" }}>
                <TouchableOpacity onPress={onPressModalClose2}>
                  <Ionicons name="ios-close" size={24} color="black"></Ionicons>
                </TouchableOpacity>
              </View>
              <View style={styles.container}></View>
              <View style={{}}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={32}
                  color="black"
                ></Ionicons>
              </View>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "900",
                    textAlign: "center",
                  }}
                >
                  업로드 중이에요!
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "900",
                    textAlign: "center",
                  }}
                >
                  앱을 종료하지 말아주세요!
                </Text>
              </View>
              <View
                style={{ justifyContent: "center", width: "80%", height: 40 }}
              >
                <View>
                  <ProgressBar
                    theme={{ colors: { primary: "orange" } }}
                    progress={progressValue * 0.01}
                  ></ProgressBar>
                </View>
                <Animated.View
                  style={[
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      width: "40%",
                      height: 26,
                      backgroundColor: "orange",
                      position: "absolute",
                      borderRadius: 60,
                      borderColor: "white",
                      borderWidth: 2,
                      left: `${progressValue}%`,
                    },
                  ]}
                >
                  <Text
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      fontSize: 10,
                      fontWeight: "900",
                      color: "white",
                    }}
                  >
                    업로드 중
                  </Text>
                </Animated.View>
              </View>
            </View>
          ) : (
            <View style={styles.modalView}>
              <View style={{ position: "absolute", right: "5%", top: "5%" }}>
                <TouchableOpacity onPress={onPressModalClose2}>
                  <Ionicons name="ios-close" size={24} color="black"></Ionicons>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.modalTextStyle}>
                  음식점에 대한 정보를 입력해주세요.
                </Text>
              </View>
              <View style={{ marginTop: 26 }}>
                <Text
                  style={{ fontSize: 13, fontWeight: "900", textAlign: "left" }}
                >
                  상호 또는 음식이름
                </Text>
              </View>
              <View style={{ width: "100%", height: 37 }}>
                <TextInput
                  value={title}
                  onChangeText={(val) => {
                    setTitle(val);
                  }}
                ></TextInput>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "900",
                    textAlign: "left",
                    marginTop: 15,
                  }}
                >
                  음식점 주소
                </Text>
              </View>
              <View style={{ width: "100%", height: 37 }}>
                <TextInput
                  value={address}
                  onChangeText={(val) => {
                    setAddress(val);
                  }}
                ></TextInput>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "900",
                    textAlign: "left",
                    marginTop: 15,
                  }}
                >
                  상세정보
                </Text>
              </View>
              <View style={{ width: "100%", height: "20%" }}>
                <TextInput
                  multiline={true}
                  value={description}
                  onChangeText={(val) => {
                    setDescription(val);
                  }}
                  placeholder="음식의 특징, 재료 등 영상 자막에 들어가면 좋을만한 정보를 기입해주세요"
                  style={{ fontSize: 13, fontWeight: "900", textAlign: "left" }}
                ></TextInput>
              </View>

              <View style={{ marginTop: 34 }}>
                <View
                  style={{
                    marginLeft: "15%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    color="#F90"
                    width={164}
                    text={"업로드"}
                    onPress={()=>{
                      onPressModalClose()
                      setIsSend(true)
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ position: "absolute", right: "5%", top: "5%" }}>
              <TouchableOpacity onPress={onPressModalClose2}>
                <Ionicons name="ios-close" size={24} color="black"></Ionicons>
              </TouchableOpacity>
            </View>
            <View style={styles.container}></View>

            <View style={{}}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "900",
                  textAlign: "center",
                }}
              >
                업로드가 완료됐습니다.
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "900",
                  textAlign: "center",
                }}
              >
                빠른 시일 내 검수하겠습니다!
              </Text>
            </View>
            <Animated.View
              style={[
                {
                  margin: 10,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                },
                animatedStyle,
              ]}
            >
              <Ionicons
                name="checkmark-circle"
                size={40}
                color="green"
              ></Ionicons>
            </Animated.View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalView: {
    margin: "10%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: "10%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextStyle: {
    color: "#17191c",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 20,
    width: 20,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    marginVertical: 50,
  },
});
