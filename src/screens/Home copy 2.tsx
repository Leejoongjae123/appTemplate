import React, { useState } from "react";
import {
  View,
  Linking,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../initSupabase";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import ModalWindow from "./ModalWindow";
// import Animated,{FadeIn,FadeInUp,FadeOut} from "react-native-reanimated";
import { DataTable } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Layout backgroundColor="#FFFDF4">
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SecondScreen");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#F90",
                textDecorationLine: "underline",
              }}
            >{`처음이세요?\n가이드를 먼저 확인해주세요`}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>나의 누적 리워드</Text>
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>2,215,000</Text>
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>Progress Bar</Text>
        </View>
        <View>
          <Text style={{ textAlign: "center" }}>열심히 달려볼까요?</Text>
          <Text style={{ textAlign: "center" }}>테이크 슈터가 되면,</Text>
          <Text style={{ textAlign: "center" }}>
            매달 평균 515,000원 더 챙겨가요!
          </Text>
        </View>

        <View
          style={{
            width: "90%",
            margin: "auto",
          }}
        >
          <Shadow distance={3} style={{ width: "100%", height: "100%" }}>
            <View
              style={{
                borderColor: "#E6E9F4",
                borderWidth: 1,
                width: "100%",
                backgroundColor: "white",
                borderRadius: 5,
                height: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    총 영상
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    검수중
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    사용불가
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    검수완료
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    지급완료
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    출금횟수
                  </Text>
                </View>
              </View>
            </View>
          </Shadow>
        </View>

        <View
          style={{
            width: "90%",
            marginHorizontal: "auto",
            marginTop: 10,
          }}
        >
          <Shadow distance={3} style={{ width: "100%", height: "100%" }}>
            <View
              style={{
                borderColor: "#E6E9F4",
                borderWidth: 1,
                width: "100%",
                backgroundColor: "white",
                borderRadius: 5,
                height: 50,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>86</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>10</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>5</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>30</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>31</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>2</Text>
                </View>
              </View>
            </View>
          </Shadow>
        </View>
        <View>
          <Text>검수상세내역</Text>
        </View>
        <View
          style={{
            width: "90%",
            margin: "auto",
          }}
        >
          <Shadow distance={3} style={{ width: "100%", height: "100%" }}>
            <View
              style={{
                borderColor: "#E6E9F4",
                borderWidth: 1,
                width: "100%",
                backgroundColor: "white",
                borderRadius: 5,
                height: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    적립 날짜
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    리워드 적립
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    누적리워드
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    출금 요청
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    남은 리워드
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRightColor: "#E6E9F4",
                    borderRightWidth: 1,
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 10, textAlign: "center" }}>
                    기타
                  </Text>
                </View>
              </View>
            </View>
          </Shadow>
        </View>
      </ScrollView>
    </Layout>
  );
}
