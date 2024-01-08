import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Layout,
  TextInput,
  Button,
  Text,
  useTheme,
  CheckBox,
} from "react-native-rapi-ui";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ModalWindowWithdrawal({
  username,
  withdraw,
  amount,
  title,
  ButtonText,
  isModalVisible,
  setIsModalVisible,
  restRatio,
}) {
  const [isComplete, setIsComplete] = useState(false);
  const onPressModalOpen = () => {
    console.log("팝업을 여는 중입니다.");
    setIsModalVisible(true);
  };

  const onPressModalClose = () => {
    setIsModalVisible(false);
    setIsComplete(false);
  };

  const onPressModalRequest = () => {
    setIsComplete(true);
  };
  if (parseInt(restRatio) >= 1) {
    return (
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ position: "absolute", right: "5%", top: "5%" }}>
              <TouchableOpacity onPress={onPressModalClose}>
                <Ionicons name="ios-close" size={24} color="black"></Ionicons>
              </TouchableOpacity>
            </View>
            {isComplete ? (
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{ color: "black", fontWeight: "900", fontSize: 18 }}
                >
                  {username}님
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.modalTextStyle}>{title}</Text>
              </View>
            )}

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: "#F90", fontWeight: "900", fontSize: 18 }}>
                {amount}p
              </Text>
            </View>
            {isComplete ? (
              <View>
                <Text
                  style={{
                    marginTop: "3%",
                    color: "#17191c",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  출금 신청이 완료됐습니다.
                </Text>
              </View>
            ) : null}

            {isComplete ? (
              <View style={{ width: "100%", marginTop: 20 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    textDecorationLine: "underline",
                    color: "#DE4743",
                  }}
                >
                  3영업일 이내 등록하신 계좌로 지급됩니다.
                </Text>
              </View>
            ) : (
              <View style={{ width: "100%", marginTop: 20 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    textDecorationLine: "underline",
                    color: "#DE4743",
                  }}
                >
                  출금 신청 금액은 원천세 3.3% 공제 후 제공됩니다.
                </Text>
              </View>
            )}

            {isComplete ? (
              <View style={{ marginTop: 20 }}>
                <Button
                  color="#F90"
                  width={100}
                  text={"확인"}
                  onPress={() => {
                    onPressModalClose();
                  }}
                />
              </View>
            ) : (
              <View style={{ marginTop: 20 }}>
                <Button
                  color="#F90"
                  width={100}
                  text={ButtonText}
                  onPress={() => {
                    setIsComplete(true);
                    withdraw();
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ position: "absolute", right: "5%", top: "5%" }}>
              <TouchableOpacity onPress={onPressModalClose}>
                <Ionicons name="ios-close" size={24} color="black"></Ionicons>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  textAlign: "center",
                  color: "#F90",
                  fontWeight: "900",
                  fontSize: 18,
                }}
              >
                출금 실패
              </Text>
              <Text
                style={{
                  margin: 10,
                  textAlign: "center",
                  color: "gray",
                  fontWeight: "900",
                  fontSize: 16,
                }}
              >
                최소 출금액(10만원이상) 불만족
              </Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <Button
                color="#F90"
                width={100}
                text={"확인"}
                onPress={() => {
                  onPressModalClose();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignContent: "center",
    textAlignVertical: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalView: {
    position: "relative",
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
