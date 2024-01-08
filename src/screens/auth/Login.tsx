import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { supabase } from "../../initSupabase";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontSize, Color } from "../GlobalStyles";

import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import ModalWindow from "../ModalWindow";
import { Shadow } from "react-native-shadow-2";

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Login">) {
  const { isDarkmode, setTheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [buttonText, setButtonText] = useState("");

  async function login() {
    setLoading(true);
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (!error && !user) {
      setLoading(false);
      // Alert.alert("에러","아이디 혹은 비밀번호를 재확인 해주세요");
      setTitle("아이디 혹은 비밀번호를 재확인 해주세요");
      setButtonText("확인");
      setIsModalVisible(true);
    }
    if (error) {
      if (error.message === "Email not confirmed") {
        setLoading(false);
        setTitle("이메일 인증을 완료 해주세요");
        setButtonText("확인");
        setIsModalVisible(true);
      } else {
        setLoading(false);
        setTitle("아이디 혹은 비밀번호를 재확인 해주세요");
        setButtonText("확인");
        setIsModalVisible(true);
      }
    }
  }
  return (
    <View style={styles.container}>
      <ModalWindow
        title={title}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        ButtonText={buttonText}
      ></ModalWindow>
      <View style={styles.login}>
        <Text style={styles.text1}>로그인</Text>
      </View>

      <View style={styles.textInput1}>
        <Shadow distance={3} style={{ width: "100%", borderRadius: 8 }}>
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
        </Shadow>
      </View>

      <View style={styles.textInput1}>
        <Shadow distance={3} style={{ width: "100%", borderRadius: 8}} containerStyle={{marginTop:"3%"}}>
          <TextInput
            containerStyle={{}}
            placeholder="비밀번호를 입력해주세요"
            value={password}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </Shadow>
      </View>
      <Button
        color="#F90"
        text={loading ? "로그인중..." : "로그인"}
        onPress={() => {
          login();
        }}
        style={{
          marginTop: 76,
          marginBottom: "3%",
        }}
        width={150}
        disabled={loading}
      />

      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Policy");
          }}
        >
          <Text style={styles.text5}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    marginTop: 0,
  },
  textInput: {
    width: "80%",
    justifyContent: "center",
    alignContent: "center",
  },
  textInput1: {
    width: "80%",
    marginTop: "3%",
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
    marginBottom: 25,
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
