import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { MainStackParamList } from "../types/navigation";
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
import ModalWindow from "./ModalWindow";
import { supabase } from "../initSupabase";
import { AuthContext } from "../provider/AuthProvider";

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
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
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

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [buttonText, setButtonText] = useState("");

  const [session, setSession] = useState("");
  const [profiles, setProfiles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const authInfo = useContext(AuthContext);

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
          bankNumber: bankNumber.toString(),
          updated_at: new Date(),
        })
        .eq("id", authInfo.session?.user.id);

      if (!error) {
        console.log("업데이트성공");
      } else {
        console.log("error:", error);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", authInfo.session?.user.id);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setProfiles(data[0]);
      setNickName(data[0].nickName);
      setEmail(authInfo.session?.user.email);

      setBirthDate(data[0].birthDate);
      setUsername(data[0].username);
      setPhoneName(data[0].phoneName);
      setBankName(data[0].bankName);
      setPhoneNumber(data[0].phoneNumber);
      setBankNumber(data[0].bankNumber);
      setIsLoading(true);
    }
  };
  // console.log("bankName:", bankName);

  const update = () => {
    console.log("aa");
  };

  return (
    <Layout>
      <ModalWindow
        title={`${username}님 변경 완료`}
        ButtonText={"확인"}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      ></ModalWindow>
      <Button
        text="로그아웃"
        size="sm"
        style={{ position: "absolute", top: "7.5%", zIndex: 2, right: 10 }}
        color="#F90"
        outline
        onPress={async () => {
          const { error } = await supabase.auth.signOut();
          if (!error) {
            console.log("로그아웃완료");
          }
          if (error) {
            alert(error.message);
          }
        }}
      ></Button>
      <ScrollView
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#FFFDF4",
          paddingTop: "25%",
          paddingBottom: 60,
          flexDirection: "column",
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "#FFFDF4",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: "10%",
          }}
        >
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
                    editable={false}
                    placeholder="이메일을 입력해주세요."
                    value={email}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={(text) => {
                      setEmail(text);
                    }}
                    borderRadius={8}
                    backgroundColor={"#E2E2E2"}
                  />
                </View>
              </View>
            </View>
            {/* <View style={styles.textInput}>
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
            </View> */}
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
                    {/* <Picker
                      items={phoneItems}
                      value={isLoading&&phoneName}
                      placeholder="통신사"
                      onValueChange={(val) => {
                        setPhoneName(val)
                      
                      }}
                      closeIconColor={"#F90"}
                    /> */}
                    <TextInput
                      placeholder="통신사를 입력해주세요"
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
                      placeholder="은행명을 입력해주세요"
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
          <View style={{ width: "100%", height: "20%", marginTop: "5%" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <View>
                <Button
                  color="#F90"
                  text={loading ? "변경 중..." : "변경하기"}
                  onPress={() => {
                    updateProfile();
                    setIsModalVisible(true);
                  }}
                  style={{
                    marginBottom: "3%",
                  }}
                  width={150}
                  disabled={loading}
                />
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
    height: "15%",
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
    height: "100%",
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
});
