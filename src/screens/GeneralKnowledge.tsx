import React, { useEffect, useRef } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UniversalProps } from "../helper/NavigationTypes";
import { hp, wp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getQuestions } from "../actions/quizAction";
import { ON_SELECT_ANS, SET_QUESTIONS } from "../actions/types";
import { useAppSelector } from "../redux/Hooks";
import PagerView from "react-native-pager-view";
import { colors } from "../theme/Utils";
import RenderHtml from "react-native-render-html";
import { commonFont } from "../theme/Fonts";

const GeneralKnowledge = ({}: UniversalProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(false);
  const question = useAppSelector((e) => e.common.questions);
  const togglerTimer = () => setRunTimer((t) => !t);
  const [selectedQue, setSelectedQue] = React.useState(0);
  const viewPager = useRef(null);

  useEffect(() => {
    let timerId;
    if (runTimer) {
      setCountDown(60 * Number(question.q_time));
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      console.log("expired");
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);
  useEffect(() => {
    if (isFocused == true) {
      setRunTimer(false);
      setCountDown(0);
      setSelectedQue(0);
      dispatch({ type: SET_QUESTIONS, payload: {} });
      let obj = {
        params: {},
        onSuccess: (res: any) => {
          Alert.alert(
            "Confirmation",
            `Click start button to begin the test.\nThere are ${res.questions.length} questions.\nYou have ${res.q_time} minutes`,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => {
                  togglerTimer();
                  setSelectedQue(0);
                  viewPager.current.setPage(0);
                },
              },
            ]
          );
        },
        onFail: () => {},
      };

      dispatch(getQuestions(obj));
    }
  }, [isFocused]);
  const onClickOption = (optionIndex: any, index: any) => {
    dispatch({ type: ON_SELECT_ANS, payload: { optionIndex, index } });
  };

  const onPressNext = (ans: any) => {
    if (ans == null) {
      Alert.alert("PLease select any ans");
    } else {
      if (selectedQue + 1 == question.questions.length) {
        togglerTimer();
        navigation.navigate("QuizAnswer");
      } else {
        viewPager.current.setPage(selectedQue + 1);
      }
    }
  };

  return (
    <View style={ApplicationStyles.container}>
      <View style={styles.headerView}>
        <View>
          <Text style={styles.title}>Question:{selectedQue + 1}</Text>
        </View>
        <View style={styles.timeView}>
          <Text style={styles.timeText}>
            {String(Math.floor(countDown / 60)).padStart(1, 0) +
              "m " +
              String(countDown % 60).padStart(2, 0) +
              "s"}
          </Text>
        </View>
      </View>
      {countDown !== 0 && (
        <PagerView
          onPageSelected={(e) => {
            console.log("Current page index", e.nativeEvent.position);
            setSelectedQue(e.nativeEvent.position);
          }}
          ref={viewPager}
          scrollEnabled={false}
          style={styles.pagerView}
          initialPage={0}
        >
          {question?.questions?.map((item, index) => {
            return (
              <View style={styles.rowView} key={item.id}>
                {/* <Text style={styles.questionTitle}>{item.question}</Text> */}
                <RenderHtml
                  contentWidth={Dimensions.get("window").width - hp(4)}
                  tagsStyles={{
                    p: {
                      ...commonFont(500, 20, colors.black),
                    },
                  }}
                  source={{
                    html: `
<p >
${item.questionText}
</p>`,
                  }}
                />
                {item.answers.map((ans, i) => {
                  if (item.type == "radio") {
                    return (
                      <View style={styles.optionView}>
                        <TouchableOpacity
                          onPress={() => onClickOption(i, index)}
                          style={styles.clickView}
                          key={i}
                        >
                          <View style={{ flex: 1 }}>
                            <Text style={styles.optionText}>
                              {i + 1}. {ans.text}
                            </Text>
                          </View>
                          <View>
                            {item.selected_answer_index == i ? (
                              <Image
                                source={require("../assets/selected.png")}
                                style={styles.radioImage}
                              />
                            ) : (
                              <Image
                                source={require("../assets/unselected.png")}
                                style={styles.radioImage}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                })}
                <View style={{ alignItems: "center", marginTop: 30 }}>
                  <TouchableOpacity
                    onPress={() => onPressNext(item.selected_answer_index)}
                    style={styles.timeView}
                  >
                    <Text style={styles.timeText}>{"NEXT"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </PagerView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  questionTitle: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  optionText: {
    color: "grey",
    fontSize: 18,
  },
  title: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 18,
  },
  rowView: {
    paddingHorizontal: 20,
  },
  clickView: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionView: {
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8d8",
  },
  radioImage: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    tintColor: colors.skyBlue,
  },
  timeView: {
    backgroundColor: colors.skyBlue,
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(0.7),
    borderRadius: 8,
    width: "30%",
    alignItems: "center",
  },
  timeText: { color: colors.white, fontWeight: "bold", fontSize: 18 },
  pagerView: {
    flex: 1,
  },
  headerView: {
    padding: hp(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default GeneralKnowledge;
