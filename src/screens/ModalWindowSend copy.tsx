import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Layout,
  TextInput,
  Button,
  Text,
  useTheme,
  CheckBox,
} from "react-native-rapi-ui";
import { Modal } from "react-native";
import * as FileSystem from "expo-file-system";
import Animated from "react-native-reanimated";

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
  uploadImage
}) {
  const onPressModalOpen = () => {
    console.log("팝업을 여는 중입니다.");
    setIsModalVisible(true);
  };

  const onPressModalClose = async() => {
    setIsModalVisible(false);
    const base64 = await FileSystem.readAsStringAsync(video.uri, { encoding: 'base64' });
    uploadImage(base64)
    setTitle("")
    setAddress("")
    setDescription("")
  };

  const [isComplete, setIsComplete] = useState(false)

  return (
    
    <Modal animationType="fade" visible={isModalVisible} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.modalTextStyle}>
              음식점에 대한 정보를 입력해주세요.
            </Text>
          </View>
          <View style={{marginTop:26}}>
            <Text style={{fontSize:13,fontWeight:"900",textAlign:'left'}}>상호 또는 음식이름</Text>
          </View>
          <View style={{ width: "100%",height:37 }}>
            <TextInput
              value={title}
              onChangeText={(val) => {
                setTitle(val);
              }}
              
            ></TextInput>
          </View>
          <View>
            <Text style={{fontSize:13,fontWeight:"900",textAlign:'left',marginTop:15}}>음식점 주소</Text>
          </View>
          <View style={{ width: "100%",height:37 }}>
            <TextInput
              value={address}
              onChangeText={(val) => {
                setAddress(val);
              }}
            ></TextInput>
          </View>
          <View>
            <Text style={{fontSize:13,fontWeight:"900",textAlign:'left',marginTop:15}}>상세정보</Text>
          </View>
          <View style={{ width: "100%", height: "20%" }}>
            <TextInput
              multiline={true}
              value={description}
              onChangeText={(val) => {
                setDescription(val);
              }}
              placeholder="음식의 특징, 재료 등 영상 자막에 들어가면 좋을만한 정보를 기입해주세요"
              style={{fontSize:13,fontWeight:"900",textAlign:'left'}}
            ></TextInput>
          </View>
          
          <View style={{marginTop: 34 }}>
            <View style={{marginLeft:"15%",justifyContent:'center',alignItems:'center'}}>
            <Button
                color="#F90"
                width={164}
                text={"업로드"}
                onPress={onPressModalClose}
                
              />
            </View>
              
          </View>
          
          
        </View>
      </View>
    </Modal>
  );
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
    
    margin: 28,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "flex-start",
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
});
