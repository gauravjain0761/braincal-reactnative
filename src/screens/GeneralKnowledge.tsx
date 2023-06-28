import React, { useEffect, useRef, useState } from "react";
import {
  AppState,
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UniversalProps } from "../navigation/NavigationTypes";
import { hp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getQuestions } from "../actions/quizAction";
import { ON_SELECT_ANS, SET_QUESTIONS } from "../actions/types";
import { useAppSelector } from "../redux/Hooks";
import PagerView from "react-native-pager-view";
import { colors } from "../theme/Colors";
import RenderHtml from "react-native-render-html";
import { commonFont } from "../theme/Fonts";
import { icons } from "../helper/IconConstant";
import CommonAlert from "../components/CommonAlert";
var time = new Date();
const GeneralKnowledge = ({ route }: UniversalProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(false);
  const question = useAppSelector((e) => e.common.questions);
  const togglerTimer = () => setRunTimer((t) => !t);
  const [selectedQue, setSelectedQue] = React.useState(0);
  const [initialPage, setInitialPage] = React.useState(0);
  const viewPager = useRef(null);
  const [startUpModal, setStartUpModal] = useState(false);
  const [leavingModal, setleavingModal] = useState(false);
  const [expireModal, setExpireModal] = useState(false);
  const [withouAnswerModal, setWithouAnswerModal] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [backSec, setbackSec] = useState(new Date());

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        if (runTimer == true && countDown !== 0) {
          setCountDown(
            countDown - Math.round(Math.abs(time - new Date()) / 1000)
          );
        }
      }

      if (nextAppState == "background") {
        time = new Date();
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, [countDown]);

  useEffect(() => {
    const backAction = () => {
      backPress();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [navigation, runTimer]);

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
      setExpireModal(true);
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  const backPress = () => {
    if (runTimer == true) {
      setleavingModal(true);
    } else {
      if (route?.params) {
        navigation.goBack();
      } else {
        navigation.navigate("Home");
      }
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            backPress();
          }}
          style={ApplicationStyles.headerLeftView}
        >
          <Image
            source={icons.backArrow}
            style={[ApplicationStyles.backBtn, { tintColor: colors.white }]}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, runTimer]);

  useEffect(() => {
    if (isFocused == true) {
      if (route.params) {
        navigation.setOptions({
          headerTitle: route.params.quizName,
          gestureEnabled: false,
        });
      }
      setRunTimer(false);
      setCountDown(0);
      setSelectedQue(0);
      dispatch({ type: SET_QUESTIONS, payload: {} });
      let obj = {
        params: {
          id: route.params ? route.params.id : 0,
        },
        onSuccess: (res: any) => {
          setStartUpModal(true);
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
      setWithouAnswerModal(true);
      // dispatchErrorAction(dispatch, "Please select any answer");
    } else {
      if (selectedQue + 1 == question.questions.length) {
        togglerTimer();
        navigation.navigate("QuizAnswer", {
          heading: route?.params ? route.params.quizName : "General Knowledge",
        });
      } else {
        viewPager.current.setPage(selectedQue + 1);
      }
    }
  };

  const onPressOKwithoutAnswer = () => {
    setWithouAnswerModal(false);
    setTimeout(() => {
      if (selectedQue + 1 == question.questions.length) {
        togglerTimer();
        navigation.navigate("QuizAnswer", {
          heading: route?.params ? route.params.quizName : "General Knowledge",
        });
      } else {
        viewPager.current.setPage(selectedQue + 1);
      }
    }, 1000);
  };

  const onPressOK = () => {
    setRunTimer(true);
    setSelectedQue(0);
    setStartUpModal(false);
  };

  return (
    <View style={ApplicationStyles.container}>
      {countDown == 0 && (
        <View style={ApplicationStyles.innerContainer}>
          <Text style={styles.titleText2}>
            This test series has no question yet.
          </Text>
        </View>
      )}
      {countDown !== 0 && Object.keys(question).length !== 0 && (
        <View style={{ flex: 1 }}>
          <View style={styles.headerView}>
            <View>
              <Text style={styles.title}>Question {selectedQue + 1}.</Text>
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
          <PagerView
            onPageSelected={(e) => {
              setSelectedQue(e.nativeEvent.position);
            }}
            ref={viewPager}
            scrollEnabled={false}
            style={styles.pagerView}
            initialPage={initialPage}
          >
            {Object.keys(question).length !== 0 &&
              question?.questions?.map((item, index) => {
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
                                  {i + 1}.{" "}
                                  {ans.text
                                    .replace(/\n/g, "")
                                    .replace(/\r/g, "")}
                                </Text>
                              </View>
                              <View>
                                {item.selected_answer_index == i ? (
                                  <Image
                                    source={require("../assets/selected.png")}
                                    style={[
                                      styles.radioImage,
                                      { tintColor: colors.skyBlue1 },
                                    ]}
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
                        style={styles.nextButton}
                      >
                        <Text style={styles.timeText}>{"NEXT"}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
          </PagerView>
        </View>
      )}

      <CommonAlert
        isVisible={startUpModal}
        onSuccess={() => onPressOK()}
        onCancel={() => setStartUpModal(false)}
        title1={"Confirmation"}
        title2={`Click start button to begin the test.\nThere are ${question?.questions?.length} questions.\nYou have ${question?.q_time} minutes.`}
        successBtn={"START"}
        cancelBtn={"CANCEL"}
      />

      <CommonAlert
        isVisible={withouAnswerModal}
        onSuccess={() => onPressOKwithoutAnswer()}
        onCancel={() => setWithouAnswerModal(false)}
        title1={"Confirm leaving?"}
        title2={`You did not select any answer.Are you sure you want to continue?`}
        successBtn={"OK"}
        cancelBtn={"CANCEL"}
      />

      <CommonAlert
        isVisible={expireModal}
        onCancel={() => {
          setExpireModal(false);
          navigation.navigate("Home");
        }}
        title1={"Expire!"}
        title2={`Your time of test is over`}
        cancelBtn={"OK"}
      />

      <CommonAlert
        isVisible={leavingModal}
        onSuccess={() => {
          if (route?.params) {
            navigation.goBack();
          } else {
            navigation.navigate("Home");
          }

          setRunTimer(false);
          setleavingModal(false);
        }}
        onCancel={() => setleavingModal(false)}
        title1={"Confirm leaving?"}
        title2={`Your test session will be lost.`}
        successBtn={"LEAVE"}
        cancelBtn={"STAY"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: colors.white,
    paddingTop: hp(3),
    borderRadius: 10,
  },
  questionTitle: {
    ...commonFont(700, 18, colors.black),
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  optionText: {
    ...commonFont(400, 17, colors.black),
    // fontSsize: 18,
    paddingVertical: 7,
  },
  title: {
    ...commonFont(700, 18, colors.black),
  },
  titleText2: {
    ...commonFont(400, 18, colors.black),
    marginTop: hp(2),
  },
  titleMOdal2: {
    ...commonFont(700, 20, colors.black),
    marginBottom: hp(1),
  },
  titleModal: {
    ...commonFont(400, 17, colors.grey),
    paddingHorizontal: hp(3),
    lineHeight: 25,
  },
  rowView: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
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
    tintColor: colors.grey,
  },
  timeView: {
    backgroundColor: colors.skyBlue,
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(0.7),
    // borderRadius: 8,
    width: "30%",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: colors.skyBlue,
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(1),
    borderRadius: 5,
    width: "25%",
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
  button: {
    // padding: hp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  btnText: {
    ...commonFont(600, 18, colors.skyBlue),
    paddingHorizontal: hp(3),
    paddingVertical: hp(3),
  },
});

export default GeneralKnowledge;
