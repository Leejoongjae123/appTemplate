import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Linking,
  Alert,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
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
import ModalWindowWithdrawl from "./ModalWindowWithdrawal";
// import Animated,{FadeIn,FadeInUp,FadeOut} from "react-native-reanimated";
import { DataTable, ProgressBar } from "react-native-paper";
import { Shadow } from "react-native-shadow-2";
import { AuthContext } from "../provider/AuthProvider";
import { useIsFocused } from "@react-navigation/native";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nousable, setNousable] = useState("");
  const [username, setUsername] = useState("");

  const [totalCount, setTotalCount] = useState("");
  const [countCheck, setCountCheck] = useState("");
  const [countComplete, setCountComplete] = useState("");
  const [countReward, setCountReward] = useState("");
  const [totalReward, setTotalReward] = useState("");
  const [checkResult, setCheckResult] = useState([]);
  const [rewardResult, setRewardResult] = useState([]);
  const [withdrawResult, setWithdrawResult] = useState([]);
  const [rewardNwithdrawResult, setRewardNwithdrawResult] = useState([]);
  const [possibleWithdraw, setPossibleWithdraw] = useState();
  const [restScore, setRestScore] = useState(0)
  const [restRatio, setRestRatio] = useState(0)
  
  const [refData, setRefData] = useState([])
  const [myLevel, setMyLevel] = useState()


  const windowWidth = Dimensions.get("window").width;
  const authInfo = useContext(AuthContext);
  const email = authInfo.session.user.email;

  const levelList=['Lv.1 로드슈터','Lv.2 테이크슈터','Lv.3 플라잉슈터']
  const nextList=['로드슈터','테이크슈터','플라잉슈터','플라잉슈터']

  const isFocused = useIsFocused(); // 포커스 시 변경

  const getUser = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", authInfo.session?.user.id);
    if (error) {
      console.log(error);
    }
    if (data) {
      setUsername(data[0].username);
    }
  };



  const getData = async () => {
    var { data, error } = await supabase
      .from("uploadData")
      .select()
      .eq("email", email);
    if (error) {
      console.log(error);
    }
    if (data) {
      // console.log(data);
      setTotalCount(data.length);
      const countFalseUsable = data.filter(
        (item) => item.usable === false
      ).length;
      setNousable(countFalseUsable);
      const findCheck = data.filter((item) => item.checkDate === null).length;
      setCountCheck(findCheck);
      const findComplete = data.filter(
        (item) => item.checkDate !== null
      ).length;
      setCountComplete(findComplete);
      const findReward = data.filter((item) => item.reward !== null).length;
      setCountReward(findReward);

      const sumOfRewardsAndBonuses = data.reduce((acc, item) => {
        const reward = item.reward !== null ? item.reward : 0;
        const bonus = item.bonus !== null ? item.bonus : 0;
        return acc + reward + bonus;
      }, 0);
      const formattedSum = sumOfRewardsAndBonuses.toLocaleString();
      setTotalReward(formattedSum);

      // 검수 상세내역 가져오기
      const nonNullCheckDates = data
        .filter((item) => item.checkDate !== null)
        .map((item) => item);

      nonNullCheckDates.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      setCheckResult(nonNullCheckDates);

      // 리워드 내역 가져오기
      const nonNullReward = data
        .filter((item) => item.reward !== null || item.bonus !== null)
        .map((item) => item);

      setRewardResult(nonNullReward);

      // 출금 내역 가져오기
    }
  };

  const getWithdraw = async () => {
    const { data, error } = await supabase
      .from("withdraw")
      .select()
      .eq("email", email);
    if (error) {
      console.log(error);
    }
    if (data) {
      // 검수 상세내역 가져오기
      // const nonNullCheckDates = data
      //   .filter((item) => item.checkDate !== null)
      //   .map((item) => item);
      setWithdrawResult(data);
    }
  };

  

  const RequestWithdraw = async () => {
    const numberWithoutComma = -parseInt(totalReward.replace(/,/g, ""), 10);
    const { error } = await supabase
      .from("withdraw")
      .insert({ email: email, amount: numberWithoutComma });
    if (error) {
      console.log(error);
    }
    if (!error) {
      console.log("전송성공");
    }
  };

  useEffect(() => {
    getData();
    getWithdraw();
    getUser();
  }, [isFocused]);

  useEffect(()=>{
    getRef();
  },[totalReward])

  useEffect(() => {
    const rewardNwithdraw = rewardResult.concat(withdrawResult);
    rewardNwithdraw.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    let cumulativeScore = 0;

    rewardNwithdraw.forEach((item) => {
      const reward = item.reward || 0;
      const bonus = item.bonus || 0;

      cumulativeScore += reward + bonus;
      item.cumulativeScore = cumulativeScore;
    });

    let restScore = 0;

    rewardNwithdraw.forEach((item) => {
      const reward = item.reward || 0;
      const bonus = item.bonus || 0;
      const withdraw = item.amount || 0;

      restScore += reward + bonus + withdraw;
      item.restScore = restScore;
      setPossibleWithdraw(restScore);
      
    });

    setRestScore(restScore)
    const CalculateRestRatio=()=>{
      const restRatioRaw=parseInt(restScore)/100000*100
      if (parseInt(restRatioRaw)>=100){
        setRestRatio(1)
      } else if(parseInt(restRatioRaw)<=0){
        setRestRatio(0.2)        
      }else{
        setRestRatio(parseInt(restScore)/10000000*100)
      }
    }

    CalculateRestRatio()

    setRewardNwithdrawResult(rewardNwithdraw);
    
  }, [withdrawResult, rewardResult]);

  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      duration: 2000,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  

  // 박스의 배경색을 결정하는 함수
  const getBoxColor = (elem) => {
    switch (elem.grade) {
      case "A":
        return "#DE4743";
      case "B":
        return "#009C35";
      case "C":
        return "#FFC700";
      default:
        return "gray"; // 기본 색상
    }
  };

  const getRef = async () => {
    const { data, error } = await supabase
      .from("reference")
      .select()
    if (error) {
      console.log(error)
    }
    if (data) {
      console.log(data)
      setRefData(data)
      console.log('totalReward:',totalReward)
      if (removeCommasAndConvertToNumber(totalReward)<=data[0].grade[0]){
        setMyLevel(0)
      }else if(data[0].grade[0]<=removeCommasAndConvertToNumber(totalReward)&&removeCommasAndConvertToNumber(totalReward) <=data[0].grade[1]){
        setMyLevel(1)
      }else if(data[0].grade[1]<=removeCommasAndConvertToNumber(totalReward)) {
        console.log("222")
        setMyLevel(2)
      }
    }
  };

  console.log('restRatio:',restRatio)
  

  return (
    <Layout backgroundColor="#FFFDF4">
      <ModalWindowWithdrawl
        username={username}
        withdraw={RequestWithdraw}
        amount={possibleWithdraw}
        title={"출금신청 가능 금액"}
        ButtonText={"출금신청"}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        restRatio={restRatio}
      ></ModalWindowWithdrawl>
      <ScrollView
        style={{
          zIndex: 50,
          width: "100%",
          height: "100%",
          backgroundColor: "#FFFDF4",
          flex: 1,
          flexDirection: "column",
        }}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <View style={{ marginTop: 28 }}>
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
                fontSize: 12,
                fontWeight: "800",
              }}
            >{`처음이세요?\n가이드를 먼저 확인해주세요`}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 35 }}>
          <Text
            style={{ textAlign: "center", fontSize: 30, fontWeight: "700" }}
          >
            나의 누적 리워드
          </Text>
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 35,
              fontWeight: "800",
              color: "#DE4743",
            }}
          >
            {totalReward}원
          </Text>
        </View>
        <View style={{ justifyContent: "center", width: "80%", height: 40 }}>
          <View>
            <ProgressBar
              theme={{ colors: { primary: "orange" } }}
              progress={1/getShooterLevel(levelList[myLevel])}
            ></ProgressBar>
          </View>
          <View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                width: 80,
                height: 26,
                backgroundColor: "orange",
                position: "absolute",
                borderRadius: 60,
                borderColor: "white",
                borderWidth: 2,
              },
              { left: (windowWidth * 0.8) / getShooterLevel(levelList[myLevel]) -80 },
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
              {levelList[myLevel]}
            </Text>
          </View>
        </View>

        <View>
          <Text style={{ textAlign: "center", fontSize: 14 }}>
            열심히 달려볼까요?
          </Text>
          <Text style={{ textAlign: "center", fontSize: 14 }}>
            {nextList[myLevel+1]}가 되면,
          </Text>
          <Text style={{ textAlign: "center", fontSize: 14 }}>
            매달 평균{" "}
            <Text style={{ color: "#DE4743", fontWeight: "700" }}>
              {myLevel==2?(refData[0]?.avgAmount[2]?.toLocaleString()):(refData[0]?.avgAmount[myLevel+1]?.toLocaleString())}원
            </Text>{" "}
            더 챙겨가요!
          </Text>
        </View>

        <Shadow
          distance={3}
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: "100%",
            borderRadius: 5,
            height: 20,
          }}
          containerStyle={{ width: "80%", marginVertical: 2.5 }}
        >
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 10, textAlign: "center", fontWeight: "800" }}
            >
              총 영상
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "#F90",
                fontWeight: "800",
              }}
            >
              검수중
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "#DE4743",
                fontWeight: "800",
              }}
            >
              사용불가
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "#009C35",
                fontWeight: "800",
              }}
            >
              검수완료
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
              backgroundColor: "#DE4743",
            }}
          >
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
                color: "white",
                fontWeight: "800",
              }}
            >
              지급완료
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 10, textAlign: "center", fontWeight: "800" }}
            >
              출금횟수
            </Text>
          </View>
        </Shadow>

        <Shadow
          distance={3}
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: "100%",
            borderRadius: 5,
            height: 50,
          }}
          containerStyle={{ width: "80%", marginVertical: 2.5 }}
        >
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 12, textAlign: "center", fontWeight: "800" }}
            >
              {totalCount}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: "#F90",
                fontWeight: "800",
              }}
            >
              {countCheck}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: "#DE4743",
                fontWeight: "800",
              }}
            >
              {nousable}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: "#009C35",
                fontWeight: "800",
              }}
            >
              {countComplete}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
              backgroundColor: "#DE4743",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: "white",
                fontWeight: "600",
              }}
            >
              {countReward}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{ fontSize: 12, textAlign: "center", fontWeight: "600" }}
            >
              0
            </Text>
          </View>
        </Shadow>

        <View style={{ position: "relative", marginTop: 11 }}>
          <Text
            style={{
              right: "32%",
              fontSize: 10,
              textDecorationLine: "underline",
            }}
          >
            검수 상세 내역
          </Text>
        </View>

        <Shadow
          distance={3}
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: "100%",
            borderRadius: 5,
            height: 20,
          }}
          containerStyle={{ width: "80%", marginVertical: 2.5 }}
        >
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>
              검수요청일
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>
              검수완료일
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>영상이름</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>영상등급</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>리워드</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>기타</Text>
          </View>
        </Shadow>

        {/* 검수 상세 내용 */}

        <Shadow
          distance={3}
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: "100%",
            borderRadius: 5,
            height: 100,
          }}
          containerStyle={{ width: "80%", marginVertical: 2.5 }}
        >
          <ScrollView
            nestedScrollEnabled={true}
            style={{}}
            scrollEnabled={true}
            contentContainerStyle={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {checkResult.map((elem, index) => {
              return (
                <View style={{ flexDirection: "row" }} key={index}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems:'center',
                    }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 8 }}>
                      {formatDate(elem.created_at)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems:'center',
                    }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 8 }}>
                      {formatDate(elem.checkDate)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems:'center',
                    }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 8 }}>
                      {elem.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems:'center',
                    }}
                  >
                    <View
                      style={{ justifyContent: "center", alignItems: "center",margin:1 }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 8,
                          backgroundColor: getBoxColor(elem),
                          borderRadius: 2,
                          color: "white",
                          fontWeight: "600",
                          padding: 2,
                        }}
                      >
                        {elem.grade}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems:'center',
                    }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 8 }}>
                      {elem.reward}p
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems:'center',
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#DE4743",
                        borderRadius: 2,
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 1,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 6,
                          color: "white",
                          fontWeight: "800",
                        }}
                      >
                        {elem.bonus}p 보너스!
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}

          </ScrollView>
        </Shadow>

        <View style={{ justifyContent: "center", width: "80%", height: 40 }}>
          <View>
            <ProgressBar
              theme={{ colors: { primary: "#DE4743" } }}
              progress={1}
            ></ProgressBar>
          </View>
          <View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
                width: 80,
                height: 26,
                backgroundColor: "white",
                borderColor: "#DE4743",
                borderWidth: 2,
                position: "absolute",
                borderRadius: 60,
              },
              { left: windowWidth * (restRatio) - 80 },
            ]}
          >
            <Text
              style={{
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                fontSize: 10,
                fontWeight: "900",
                color: "#DE4743",
              }}
            >
              최소 출금액 달성
            </Text>
          </View>
        </View>
        <View>
          {restRatio>=1?(<Text style={{ fontSize: 12 }}>
            출금이 가능해요! 지금 바로 출금해보세요!
          </Text>):(<Text style={{ fontSize: 12 }}>
            출금이 불가능해요! 리워드를 10만원 이상 획득 바랍니다.
          </Text>)}
          
        </View>
        <View style={{ marginVertical: 6 }}>
          <Button
            text="출금신청"
            style={{ borderRadius: 60 }}
            color="#DE4743"
            onPress={() => {
              setIsModalVisible(true);
            }}
          ></Button>
        </View>
        <View style={{ position: "relative" }}>
          <Text
            style={{
              right: "33%",
              fontSize: 10,
              textDecorationLine: "underline",
            }}
          >
            리워드 내역
          </Text>
        </View>

        {/* 리워드 내역 헤더 */}

        <Shadow
          distance={3}
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: "100%",
            borderRadius: 5,
            height: 20,
          }}
          containerStyle={{ width: "80%", marginVertical: 2.5 }}
        >
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>적립날짜</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
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
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>
              누적 리워드
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>출금 요청</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderRightColor: "#E6E9F4",
              borderRightWidth: 1,
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
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 10, textAlign: "center" }}>기타</Text>
          </View>
        </Shadow>
        {/* 리워드 내역 내용 */}
        <Shadow
          distance={3}
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            width: "100%",
            borderRadius: 5,
            height: 100,
          }}
          containerStyle={{ width: "80%", marginVertical: 2.5 }}
        >
          <ScrollView
            nestedScrollEnabled={true}
            style={{}}
            scrollEnabled={true}
            contentContainerStyle={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {rewardNwithdrawResult.map((elem, index) => {
              return (
                <View style={{ flexDirection: "row" }} key={index}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 8 }}>
                      {formatDate(elem.created_at)}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 8 }}>
                      {elem.isWithdraw ? "" : (elem.reward + elem.bonus).toLocaleString() + "p"}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 8 }}>
                      {elem.cumulativeScore.toLocaleString()}p
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 8,color:"#DE4743",fontWeight:'800' }}>
                      {elem.isWithdraw ? parseInt(elem.amount).toLocaleString() + "p" : ""}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ textAlign: "center", fontSize: 8 }}>
                      {elem?.restScore.toLocaleString()}p
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{backgroundColor:isCompleteColor(elem.complete),borderRadius:2,justifyContent:'center',alignItems:'center'}}>
                      <Text style={{ textAlign: "center", fontSize: 8,color:"white",fontWeight:"600" }}>
                        {/* {elem.isWithdraw ? isComplete(elem.complete) : ""} */}
                        {elem.isWithdraw ? isComplete(elem.complete) : ""}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </Shadow>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  block: {},
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: "black",
  },
});

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const year = date.getFullYear().toString().slice(2); // 년도의 마지막 두 자리
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월 (0-11 이므로 1 추가)
  const day = date.getDate().toString().padStart(2, "0"); // 일

  return `${year}/${month}/${day}`; // MM/DD/YY 형식
};

const isComplete = (text) => {
  let result = "";
  if (text === true) {
    result = "지급완료";
  } else {
    result = "확인중";
  }
  return result;
};

const isCompleteColor = (text) => {
  let result = "";
  if (text === true) {
    result = "#DE4743";
  } else {
    result = "#FFC700";
  }
  return result;
};

const whatLevel = (refList,totalReward) => {
  let result = "";
  if (totalReward <=refList[0]) {
    result = "로드슈터";
  } else if(refList[0]<=totalReward <=refList[1]) {
    result = "테이크슈터";
  } else {
    result=""
  }
  return result;
};

function getShooterLevel(myLevel) {
  if (myLevel === "Lv.1 로드슈터") {
    return 3;
  } else if (myLevel === "Lv.2 테이크슈터") {
    return 1.5;
  } else if (myLevel === "Lv.3 플라잉슈터") {
    return 1;
  } else {
    // 만약 해당하는 레벨이 없을 경우 기본값 또는 오류 처리를 추가할 수 있습니다.
    return -1; // 예시로 -1을 반환하도록 했습니다.
  }
}


function removeCommasAndConvertToNumber(inputString) {
  // 쉼표를 제거한 문자열 생성
  const stringWithoutCommas = inputString.replace(/,/g, '');
  
  // 숫자로 변환 (정수로 변환하려면 parseInt, 소수점까지 포함하려면 parseFloat 사용)
  const numberValue = parseFloat(stringWithoutCommas);

  return numberValue;
}