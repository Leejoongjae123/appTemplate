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
  KeyboardAvoidingViewBase,
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
  themeColor,
  Picker,
} from "react-native-rapi-ui";
import { FontSize, Color } from "../GlobalStyles";
import ModalWindow from "../ModalWindow";
import "react-native-url-polyfill/auto";
import { SafeAreaView } from "react-native-safe-area-context";

const phoneItems = [
  { label: "SKT", value: "SKT" },
  { label: "KT", value: "KT" },
  { label: "LG", value: "LG" },
];
const bankItems = [
  { label: "국민", value: "국민" },
  { label: "우리", value: "우리" },
  { label: "신한", value: "신한" },
  { label: "농협", value: "농협" },
  { label: "하나", value: "하나" },
];

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Register">) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uid, setUid] = useState("ac93d80b-7244-453d-b288-eab153807ec7");
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nickName, setNickName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [phoneName, setPhoneName] = useState("");
  const [emailList, setEmailList] = useState([])

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [buttonText, setButtonText] = useState("");

  const getRef=async()=>{
    const { data, error } = await supabase
      .from("profiles")
      .select('email')
    if (error) {
      console.log(error);
    }
    if (data) {
      setEmailList(data)
    }    
  }

  async function register() {
    const result=checkEmailInList(email,emailList)
    if (result){
      setLoading(true);
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (!error && !user) {
        setLoading(false);
        console.log(error)
        console.log(user)
      }
      if (error) {
        console.log(error)
        console.log(user)
        setLoading(false);
        alert(error.message);
      } else {
        console.log(error)
        console.log(user)
        // alert("이메일을 확인해주세요");
        setTitle("이메일 인증을 완료해주세요");
        setButtonText("확인");
        setIsModalVisible(true);
        setUid(user?.id);
        setLoading(false);
      }
      if (isModalVisible === false) {
        // navigation.navigate("Login");
        console.log("1234");
      }
    } else{
      setIsModalVisible(true)
      setTitle("중복된 이메일로 가입할 수 없습니다.")
      setButtonText("확인")
    }
    
  }

  useEffect(() => {
    updateProfile();
    getRef()
  }, [uid]);

  const updateProfile = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: username,
          birthDate: birthDate,
          nickName: nickName,
          phoneNumber: phoneNumber.toString(),
          phoneName: phoneName.toString(),
          bankName: bankName.toString(),
          bankNumber: parseInt(bankNumber),
          updated_at: new Date(),
          email:email,
        })
        .eq("id", uid);

      if (!error) {
        console.log("업데이트성공");
      } else {
        console.log("error:", error);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <Layout>
      <ScrollView style={{ flex: 1, width: "100%",backgroundColor:'#FFFDF4',paddingTop:"10%"}}>
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "#FFFDF4",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ModalWindow
            title={title}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            ButtonText={buttonText}
          ></ModalWindow>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "10%",
              marginTop: "5%",
            }}
          >
            <Text
              style={{ textAlign: "center", fontWeight: "800", fontSize: 22,color:"#F90" }}
            >
              회원가입
            </Text>
          </View>
          <View
            style={{
              width: "80%",
              height: "70%",
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <View style={styles.textInput}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  rowGap: 3,
                }}
              >
                <View style={{ width: "15%" }}>
                  <Text style={{ fontWeight: "800", fontSize: 12 }}>
                    아이디
                  </Text>
                </View>
                <View style={{ width: "100%" }}>
                  <TextInput
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={(text) => {
                      setEmail(text);
                    }}
                    borderRadius={8}
                  />
                </View>
              </View>
            </View>
            <View style={styles.textInput}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  rowGap: 3,
                }}
              >
                <View style={{ width: "15%" }}>
                  <Text style={{ fontWeight: "800", fontSize: 12 }}>
                    비밀번호
                  </Text>
                </View>
                <View style={{ width: "100%" }}>
                  <TextInput
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                    borderRadius={8}
                  />
                </View>
              </View>
            </View>
            <View style={styles.textInput}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  rowGap: 3,
                }}
              >
                <View style={{ width: "15%" }}>
                  <Text style={{ fontWeight: "800", fontSize: 12 }}>
                    닉네임
                  </Text>
                </View>
                <View style={{ width: "100%" }}>
                  <TextInput
                    placeholder="닉네임을 입력해주세요."
                    value={nickName}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => {
                      setNickName(text);
                    }}
                    borderRadius={8}
                  />
                </View>
              </View>
            </View>
            <View style={styles.textInput}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  rowGap: 3,
                }}
              >
                <View style={{ width: "15%" }}>
                  <Text style={{ fontWeight: "800", fontSize: 12 }}>이름</Text>
                </View>
                <View style={{ width: "100%" }}>
                  <TextInput
                    placeholder="이름을 입력해주세요."
                    value={username}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => {
                      setUsername(text);
                    }}
                    borderRadius={8}
                  />
                </View>
              </View>
            </View>
            <View style={styles.textInput}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  rowGap: 3,
                }}
              >
                <View style={{ width: "15%" }}>
                  <Text style={{ fontWeight: "800", fontSize: 12 }}>
                    생년월일
                  </Text>
                </View>
                <View style={{ width: "100%" }}>
                  <TextInput
                    placeholder="생년월일을 입력해주세요."
                    value={birthDate}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => {
                      setBirthDate(text);
                    }}
                    borderRadius={8}
                  />
                </View>
              </View>
            </View>
            <View style={styles.textInput}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  rowGap: 3,
                }}
              >
                <View style={{ width: "30%" }}>
                  <Text style={{ fontWeight: "800", fontSize: 12 }}>
                    휴대전화번호
                  </Text>
                </View>
                <View style={{ width: "100%" }}></View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ width: "30%", height: "100%" }}>
                  <TextInput
                      placeholder="통신사"
                      value={phoneName}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={(text) => setPhoneName(text)}
                    />
                  </View>
                  <View style={{ width: "70%", height: "100%" }}>
                    <TextInput
                      placeholder="전화번호를 입력해주세요"
                      value={phoneNumber}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={(text) => setPhoneNumber(text)}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.textInput}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  rowGap: 3,
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text style={{ fontWeight: "800", fontSize: 12 }}>
                    리워드 출금계좌 등록
                  </Text>
                </View>
                <View style={{ width: "100%" }}></View>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ width: "30%", height: "100%" }}>
                  <TextInput
                      placeholder="은행명"
                      value={bankName}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={(text) => setBankName(text)}
                    />
                  </View>
                  <View style={{ width: "70%", height: "100%" }}>
                    <TextInput
                      placeholder="계좌번호를 입력해주세요"
                      value={bankNumber}
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={(text) => setBankNumber(text)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ width: "100%", height: "15%" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View>
                <Button
                  color="#F90"
                  text={loading ? "회원가입 중..." : "회원가입"}
                  onPress={() => {
                    register();
                  }}
                  style={{
                    marginBottom: "3%",
                  }}
                  width={150}
                  disabled={loading}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  <Text style={styles.text5}>로그인 화면으로 이동</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  login: {
    marginVertical: "10%",
  },
  textInput: {
    height: "13%",
    marginBottom: "2%",
  },
  textInput1: {
    marginVertical: "1%",
    width: "80%",
    height: 45,
  },
  container: {
    flex: 1,
    width: "100%",
    // height: "100%",
    backgroundColor: "#FFFDF4",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  bottomText: {
    position: "absolute",
    bottom: "0%",
    width: "100%",
    height: "18%",
    backgroundColor: "#F90",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  textRegister: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
  },
  buttonRegister: {
    marginTop: "5%",
    width: 164,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#F90",
  },
  text1: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.84,
  },
  text2: {
    textAlign: "center",
    color: "#F90",
    fontSize: 25,
    fontWeight: "700",
  },
  text3: {
    textAlign: "center",
    color: "#82879B",
    fontSize: 14,
    fontWeight: "500",
  },
  text4: {
    textAlign: "center",
    color: "#F90",
    fontSize: 14,
    fontWeight: "500",
  },
  text5: {
    textAlign: "center",
    color: "#F90",
    fontSize: 14,
    fontWeight: "800",
    textDecorationLine: "underline",
  },
  text6: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 21.6,
    left: 26,
  },
  text7: {
    color: "#FFF",
    fontSize: 35,
    fontWeight: "600",
    lineHeight: 48,
    left: 26,
  },
  mainText: {
    paddingTop: "40%",
  },
  subText: {
    paddingTop: "3%",
  },
  icon: {
    top: -20,
    left: 0,
    width: 408,
    height: 284,
    position: "absolute",
  },
  icon1: {
    top: 150,
    left: 0,
    width: 188,
    height: 172,
    position: "absolute",
  },
  icon2: {
    bottom: 10,
    right: -7,
    width: 120,
    height: 120,
    position: "absolute",
  },
  iphoneMain: {
    paddingTop: "5%",
    backgroundColor: Color.colorWhite,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 852,
    overflow: "hidden",
    width: "100%",
  },
});


function checkEmailInList(email, emailList) {
  for (let item of emailList) {
    if (item.email === email) {
      return false; // 일치하는 이메일이 리스트에 있을 경우 false 반환
    }
  }
  return true; // 리스트에 일치하는 이메일이 없을 경우 true 반환
}