import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  Alert,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import { supabase } from "../../initSupabase";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  CheckBox,
} from "react-native-rapi-ui";
import { FontSize, Color } from "../GlobalStyles";
import { Shadow } from "react-native-shadow-2";
import { Modal } from "react-native";
import ModalWindow from "../ModalWindow";
export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Policy">) {
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  

  const handleClick = () => {
    if (checkBox1 === true && checkBox2 === true) {
      navigation.navigate("Register")
    } else {
      Alert.alert("에러", "동의합니다에 체크 부탁드립니다.");
    }
  };

  useEffect(()=>{
    if(checkBox1===true && checkBox2===true){
      setIsModalVisible(true)
    }
  },[checkBox2])

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <View style={styles.container}>
        <View
          style={{
            paddingTop: "10%",
            width: "80%",
            height: "40%",
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <View style={{ width: "100%",paddingTop:"5%"}}>
            <Text style={{ fontSize: 16, fontWeight: "700", paddingBottom: 5 }}>
              이용약관
            </Text>
          </View>
          <Shadow distance={3}>
            <View
              style={{
                width: "100%",
                borderRadius: 12,
                height: 250,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "85%",
                  backgroundColor: "white",
                  borderRadius: 20,
                }}
              >
                <View style={{ width: "100%", height: "100%", padding: 20 }}>
                  <ScrollView>
                    <Text style={{ fontSize: 14 }}>
{`제1조 (목적)
이 약관은 주식회사 유에프코리아(이하”회사”)가 제공하는 회원의 영상촬영물 대금 지급 서비스(이하”서비스”)에 가입한 회원이 서비스를 이용함에 있어 회사와 회원간의 권리 , 의무 및 책임사항과 절차 등을 정하기 위해 만들어졌습니다.

제2조 (정의)
이 약관에서는 용어를 다음과 같이 정의하여 사용합니다.
1.	서비스란 회원의 영상을 회사가 검토 후 대금지급이 가능한 영상 1편당 대금을 지급하는 것을 의미합니다
2.	“회원”이란 서비스에 가입하여 영상 촬영물을 업로드 한 고객을 말합니다
3.	“아이디”란 회원의 식별과 서비스 제공을 위하여 회원이 제공한 정보를 기반으로 생성한 고유 ID를 의미합니다.
4.	“적립금 or 리워드”이란 회원이 회사가 정한 규정에 따라 서비스에서 출금 가능한 금액을 뜻하며 재화로서의 가치가 있습니다.

제3조 (약관의 게시와 개정)
1.	이 약관은 서비스 가입신청 과정에 게시되며 이에 대하여 서비스에 가입신청 하면 회원이 본 약관에 동의하는 것으로 판단하며 이로써 효력이 발생합니다.
2.	회사는 필요에 따라 “약관의 규제에 관한법률” , ”정보통신망 이용촉진 및 정보보호등에  관한법률” 등 관련 법령을 위반하지 않는 범위 내에서 이 약관을 개정할 수 있습니다.
3.	회사가 약관을 개정하는 경우 적용일자 및 개정사항을 명시하여 적용일 7일 전에 서비스 화면에 게시합니다.
4.	공지일로부터 7일 이내에 회원이 명시적으로 거부하지 않는 경우 개정 약관에 동의하신 것으로 봅니다.
5.	회원이 개정에 동의하지 않는다는 의사를 표시한 경우 회사는 개정된 약관을 해당 회원에게 적용할 수 없으며, 회원은 개정 약관의 효력 발생일부터 서비스를 이용하실 수 없습니다.
6.	회원이 변경된 약관을 알지 못하여 발생한 손해에 대하여 회사는 책임을 지지 않습니다.

제4조 (약관의 해석)
1.	이 약관에서 정하지 않은 사항이나 해석에 대하여는 관련법령 또는 상관례에 따릅니다.
제5조 (이용계약의 체결)
1.	서비스 이용계약은 회원이 되고자 하는 사람(이하 “가입신청자”)이 가입신청을 하게 되면 본 약관에 동의하는 것으로 간주됩니다.
2.	가입신청자는 가입신청 시 진실한 정보를 기재하여야 하며, 허위의 정보를 기재함으로 인한 불이익 및 법적 책임은 가입신청자에게 있습니다.

제6조 (이용신청에 대한 승인의 제한)
회사는 다음 각호에 해당하는 신청에 대하여 승인을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
1.	타인의 명의를 이용한 경우
2.	허위정보를 기재하거나 회사가 제시하는 내용을 기재하지 않는 경우

제7조(서비스의 변경)
1.	서비스를 변경하는 경우 변경사유 및 일자, 변경내용을 변경 7일 전 서비스내 공지사항에 공지합니다.
2.	단, 변경사유 또는 내용을 구체적으로 공지하기 어려운 경우에는 기 이유를 밝힙니다.

제8조 (서비스의 일시 중단)
1.	회사는 서비스관련설비 보수점검, 교체 및 고장, 통신두절 등 기술상 업무상의 이유로 서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 사전에 통지함을 원칙으로 하지만, 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.
2.	서비스 일시 중단은 서비스 내 공지사항에 게시하는 방법으로 통지합니다.

제9조 (회원의 계약해지)
1.	회원은 언제든지 서비스 이용을 중단 할 수 있으며 회사는 이를 즉시 처리합니다.
2.	적립금을 사용하지 않고 해지를 하는 경우 잔여 적립금은 출금이 불가하며 파기됩니다.

제10조 (적립금 적립)
1.	회원이 촬영 영상을 업로드 후 회사가 사용허가 판정을 한 영상물에 대해서는 1편당 일정 리워드를 회사가 판단하여 회원의 아이디에 적립 할 수 있습니다. (단, 사용불가 판정에 대한 영상은 즉시 파기된다.)
2.	적립된 적립금은 서비스 내에서 로그인 후 확인할 수 있습니다.

제11조 (적립금 출금)
1.	적립금 출금은 일정금액 이상부터 출금이 가능 합니다.
2.	11조 1항 일정 금액이라 하면 기본 50,000원 이상을 뜻 하며, 이는 변동이 될 수 있습니다.
3.	모든 적립금 출금 건에 대해서 원천징수세 3.3% 공제 후 지급합니다.
4.	출금신청을 하게 될 경우 최대 토,일요일 과 법정공휴일을 제외하고 3영업일 이내에 회사가 회원에게 지급을 완료 해야 합니다

제18조 (저작권의 귀속 및 이용제한)
1.	회원이 업로드 한 영상에 대한 모든 저작권은 회사의 귀속됩니다.
2.	회원이 업로드 한 영상에 대해서는 회사의 허락 없이 회원은 인터넷에 존재하는 모든 플랫폼에 업로드 할 수 없습니다.
3.	회사가 인터넷 플랫폼에 영상을 업로드 할 경우 촬영자의 출처를 SNS 아이디로 기록 할 수 있습니다.
4.	음식점 촬영 영상의 경우 업로드 과정에 있어 음식점의 정보가 들어가는 경우는 촬영자가 직접 음식점 주인의 허가를 구해야 한다

제19조 (영상의 사용)
1.	회원이 제공한 영상은 회사가 유튜브,인스타,틱톡 등 모든 플랫폼에서 회사만 사용 할 수 있습니다.
2.	회사의 허락 없이 영상을 인터넷에 관련된 모든 플랫폼에 사용이 될 경우 회사는 회원에게  민,형사상의 책임을 물을 수 있으며, 모든 책임은 회원이 지게 됩니다.
`}
                    </Text>
                    
                  </ScrollView>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  height: "15%",
                  borderRadius: 12,
                  paddingHorizontal: 20,
                  paddingBottom: 12,
                }}
              >
                <CheckBox
                  value={checkBox1}
                  onValueChange={(val) => setCheckBox1(val)}
                  checkedColor={"#F90"}
                />
                <Text style={{ marginLeft: 10, color: "red", fontSize: 14 }}>
                  [필수]
                </Text>
                <Text style={{ marginLeft: 10, color: "black", fontSize: 14 }}>
                  동의합니다.
                </Text>
              </View>
            </View>
          </Shadow>
        </View>
        <View
          style={{
            paddingTop: "15%",
            width: "80%",
            height: "15%",
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%",paddingTop:"5%" }}>
            <Text style={{ fontSize: 16, fontWeight: "700", paddingBottom: 5 }}>
              개인정보 보호정책 및 수집동의
            </Text>
          </View>
          <Shadow distance={3}>
            <View
              style={{
                width: "100%",
                borderRadius: 12,
                height: 220,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "85%",
                  backgroundColor: "white",
                  borderRadius: 20,
                }}
              >
                <View style={{ width: "100%", height: "100%", padding: 20 }}>
                  <ScrollView>
                    <Text style={{ fontSize: 14 }}>
{`
제1조 (목적)
이 약관은 주식회사 유에프코리아(이하”회사”)가 제공하는 회원의 영상촬영물 대금 지급 서비스(이하”서비스”)에 가입한 회원이 서비스를 이용함에 있어 회사와 회원간의 권리 , 의무 및 책임사항과 절차 등을 정하기 위해 만들어졌습니다.

제2조 (정의)
이 약관에서는 용어를 다음과 같이 정의하여 사용합니다.
1.	서비스란 회원의 영상을 회사가 검토 후 대금지급이 가능한 영상 1편당 대금을 지급하는 것을 의미합니다
2.	“회원”이란 서비스에 가입하여 영상 촬영물을 업로드 한 고객을 말합니다
3.	“아이디”란 회원의 식별과 서비스 제공을 위하여 회원이 제공한 정보를 기반으로 생성한 고유 ID를 의미합니다.
4.	“적립금 or 리워드”이란 회원이 회사가 정한 규정에 따라 서비스에서 출금 가능한 금액을 뜻하며 재화로서의 가치가 있습니다.
제3조 (약관의 게시와 개정)
1.	이 약관은 서비스 가입신청 과정에 게시되며 이에 대하여 서비스에 가입신청 하면 회원이 본 약관에 동의하는 것으로 판단하며 이로써 효력이 발생합니다.
2.	회사는 필요에 따라 “약관의 규제에 관한법률” , ”정보통신망 이용촉진 및 정보보호등에  관한법률” 등 관련 법령을 위반하지 않는 범위 내에서 이 약관을 개정할 수 있습니다.
3.	회사가 약관을 개정하는 경우 적용일자 및 개정사항을 명시하여 적용일 7일 전에 서비스 화면에 게시합니다.
4.	공지일로부터 7일 이내에 회원이 명시적으로 거부하지 않는 경우 개정 약관에 동의하신 것으로 봅니다.
5.	회원이 개정에 동의하지 않는다는 의사를 표시한 경우 회사는 개정된 약관을 해당 회원에게 적용할 수 없으며, 회원은 개정 약관의 효력 발생일부터 서비스를 이용하실 수 없습니다.
6.	회원이 변경된 약관을 알지 못하여 발생한 손해에 대하여 회사는 책임을 지지 않습니다.
제4조 (약관의 해석)
1.	이 약관에서 정하지 않은 사항이나 해석에 대하여는 관련법령 또는 상관례에 따릅니다.
제5조 (이용계약의 체결)
1.	서비스 이용계약은 회원이 되고자 하는 사람(이하 “가입신청자”)이 가입신청을 하게 되면 본 약관에 동의하는 것으로 간주됩니다.
2.	가입신청자는 가입신청 시 진실한 정보를 기재하여야 하며, 허위의 정보를 기재함으로 인한 불이익 및 법적 책임은 가입신청자에게 있습니다.

제6조 (이용신청에 대한 승인의 제한)
회사는 다음 각호에 해당하는 신청에 대하여 승인을 하지 않거나 사후에 이용계약을 해지할 수 있습니다.
1.	타인의 명의를 이용한 경우
2.	허위정보를 기재하거나 회사가 제시하는 내용을 기재하지 않는 경우

제7조(서비스의 변경)
1.	서비스를 변경하는 경우 변경사유 및 일자, 변경내용을 변경 7일 전 서비스내 공지사항에 공지합니다.
2.	단, 변경사유 또는 내용을 구체적으로 공지하기 어려운 경우에는 기 이유를 밝힙니다.

제8조 (서비스의 일시 중단)
1.	회사는 서비스관련설비 보수점검, 교체 및 고장, 통신두절 등 기술상 업무상의 이유로 서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 사전에 통지함을 원칙으로 하지만, 부득이한 사유가 있는 경우 사후에 통지할 수 있습니다.
2.	서비스 일시 중단은 서비스 내 공지사항에 게시하는 방법으로 통지합니다.

제9조 (회원의 계약해지)
1.	회원은 언제든지 서비스 이용을 중단 할 수 있으며 회사는 이를 즉시 처리합니다.
2.	적립금을 사용하지 않고 해지를 하는 경우 잔여 적립금은 출금이 불가하며 파기됩니다.

제10조 (적립금 적립)
1.	회원이 촬영 영상을 업로드 후 회사가 사용허가 판정을 한 영상물에 대해서는 1편당 일정 리워드를 회사가 판단하여 회원의 아이디에 적립 할 수 있습니다. (단, 사용불가 판정에 대한 영상은 즉시 파기된다.)
2.	적립된 적립금은 서비스 내에서 로그인 후 확인할 수 있습니다.

제11조 (적립금 출금)
1.	적립금 출금은 일정금액 이상부터 출금이 가능 합니다.
2.	11조 1항 일정 금액이라 하면 기본 50,000원 이상을 뜻 하며, 이는 변동이 될 수 있습니다.
3.	모든 적립금 출금 건에 대해서 원천징수세 3.3% 공제 후 지급합니다.
4.	출금신청을 하게 될 경우 최대 토,일요일 과 법정공휴일을 제외하고 3영업일 이내에 회사가 회원에게 지급을 완료 해야 합니다

제18조 (저작권의 귀속 및 이용제한)
1.	회원이 업로드 한 영상에 대한 모든 저작권은 회사의 귀속됩니다.
2.	회원이 업로드 한 영상에 대해서는 회사의 허락 없이 회원은 인터넷에 존재하는 모든 플랫폼에 업로드 할 수 없습니다.
3.	회사가 인터넷 플랫폼에 영상을 업로드 할 경우 촬영자의 출처를 SNS 아이디로 기록 할 수 있습니다.
4.	음식점 촬영 영상의 경우 업로드 과정에 있어 음식점의 정보가 들어가는 경우는 촬영자가 직접 음식점 주인의 허가를 구해야 한다

제19조 (영상의 사용)
1.	회원이 제공한 영상은 회사가 유튜브,인스타,틱톡 등 모든 플랫폼에서 회사만 사용 할 수 있습니다.
2.	회사의 허락 없이 영상을 인터넷에 관련된 모든 플랫폼에 사용이 될 경우 회사는 회원에게  민,형사상의 책임을 물을 수 있으며, 모든 책임은 회원이 지게 됩니다.
`}
                    </Text>
                    
                  </ScrollView>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  height: "15%",
                  borderRadius: 12,
                  paddingHorizontal: 20,
                  paddingBottom: 12,
                }}
              >
                <CheckBox
                  value={checkBox2}
                  onValueChange={(val) => setCheckBox2(val)}
                  checkedColor={"#F90"}
                />
                <Text style={{ marginLeft: 10, color: "red", fontSize: 14 }}>
                  [필수]
                </Text>
                <Text style={{ marginLeft: 10, color: "black", fontSize: 14 }}>
                  동의합니다.
                </Text>
              </View>
            </View>
          </Shadow>
        </View>
        <View style={{ marginBottom: "5%" }}>
          <Button
            color="#F90"
            text={"다음"}
            onPress={handleClick}
            style={{
              marginTop: "10%",
              marginBottom: "3%",
            }}
            width={164}
          />
        </View>
      </View>
      <ModalWindow title={"이용약관은 계약서를 대체합니다.\n꼼꼼하게 확인하셨나요?"} ButtonText={"확인하였습니다."} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}></ModalWindow>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView:{
    flex: 1,
    alignContent: "center",
    textAlignVertical: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.8)",    
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFDF4",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
