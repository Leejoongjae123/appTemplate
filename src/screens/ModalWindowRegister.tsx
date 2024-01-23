import React from 'react'
import { View,StyleSheet} from 'react-native'
import {
  Layout,
  TextInput,
  Button,
  Text,
  useTheme,
  CheckBox,
} from "react-native-rapi-ui";
import { Modal } from "react-native";

export default function ModalWindow({title,ButtonText,isModalVisible,setIsModalVisible,navigation}) {

  const onPressModalOpen = () => {
    console.log("팝업을 여는 중입니다.");
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
    navigation.navigate("Login")
  };

  return (
    <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalTextStyle}>
                {title}
              </Text>
            </View>
            <View style={{ marginTop: 34 }}>
              <Button
                color="#F90"
                width={164}
                text={ButtonText}
                onPress={onPressModalClose}
              />
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView:{
    flex: 1,
    alignContent: "center",
    textAlignVertical: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.8)",    
  },
  modalView: {
    marginTop: 230,
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
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