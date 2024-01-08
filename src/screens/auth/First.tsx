import * as React from "react";
import { useState,useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput
} from "react-native";
import { FontSize, Color } from "../GlobalStyles";
import { ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import { useSpring, animated } from "react-spring";
import Animated,{useSharedValue,useDerivedValue,withTiming,useAnimatedProps} from 'react-native-reanimated';
import { supabase } from "../../initSupabase";



const First = ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "First">) => {
  const [animateToNumber, setAnimateToNumber] = useState(0);

  const [refData, setRefData] = useState("")

  const getRef = async () => {
    const { data, error } = await supabase
      .from("reference")
      .select()
    if (error) {
      console.log(error)
    }
    if (data) {
      setRefData(formatNumberWithCommas(data[0].totalAmount))
    }
  };

  useEffect(()=>{
    getRef();
  },[])

  console.log(refData)
  

  return (
    <View style={styles.iphoneMain}>
      <Image
        style={styles.icon}
        resizeMode="cover"
        source={require("../../../assets/images/dishes.png")}
      />
      <Image
        style={styles.icon1}
        resizeMode="cover"
        source={require("../../../assets/images/camera.png")}
      />
      <View style={styles.mainText}>
        <Text style={styles.text1}>세상의 모든 음식을</Text>
        <Text style={styles.text1}>일상 속 평소대로 촬영하고,</Text>
        <Text style={styles.text1}>
          <Text style={styles.text2}>부수입</Text>을 챙겨가세요
        </Text>
      </View>
      <View style={styles.subText}>
        <Text style={styles.text3}>
          슈퍼플래폼 가이드만 준수하면 평균 매달{" "}
          <Text style={styles.text4}>90만원!</Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Policy");
        }}
        style={styles.buttonRegister}
      >
        <Text style={styles.textRegister}>회원가입</Text>
      </TouchableOpacity>
      <View style={styles.subText}>
        <Text
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={styles.text5}
        >
          이미 계정이 있어요
        </Text>
      </View>

      <View style={styles.bottomText}>
        <View>
          <Text style={styles.text6}>현재까지 지급된 총 리워드</Text>
        </View>
        <View>
          <Text style={styles.text7}> {"￦"+refData}</Text>
          
        </View>
      </View>

      <Image
        style={styles.icon2}
        resizeMode="cover"
        source={require("../../../assets/images/money.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    textAlign: "center",
    color: "#222",
    fontSize: 25,
    fontWeight: "700",
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

export default First;

function formatNumberWithCommas(number) {
  return number.toLocaleString();
}