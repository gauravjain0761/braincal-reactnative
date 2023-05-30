import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
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
import ReactNativeModal from "react-native-modal";
import { dispatchErrorAction } from "../helper/Global";
import { icons } from "../helper/IconConstant";
import BackgroundTimer from "react-native-background-timer";
import CommonAlert from "../components/CommonAlert";

const GeneralKnowledge = ({ route }: UniversalProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(false);
  const question = useAppSelector((e) => e.common.questions);
  const togglerTimer = () => setRunTimer((t) => !t);
  const [selectedQue, setSelectedQue] = React.useState(29);
  const [initialPage, setInitialPage] = React.useState(29);
  const viewPager = useRef(null);
  const [startUpModal, setStartUpModal] = useState(false);
  const [leavingModal, setleavingModal] = useState(false);
  const [expireModal, setExpireModal] = useState(false);
  const [withouAnswerModal, setWithouAnswerModal] = useState(false);

  useEffect(() => {
    if (runTimer) {
      setCountDown(60 * 0.1), startTimer();
    } else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [runTimer]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setCountDown((secs) => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };

  useEffect(() => {
    if (countDown === 0) {
      if (runTimer == true) {
        setExpireModal(true);
      }
      setRunTimer(false);
      BackgroundTimer.stopBackgroundTimer();
    }
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

  // useEffect(() => {
  //   let timerId;
  //   if (runTimer) {
  //     setCountDown(60 * Number(question.q_time));
  //     timerId = setInterval(() => {
  //       setCountDown((countDown) => countDown - 1);
  //     }, 1000);
  //   } else {
  //     clearInterval(timerId);
  //   }
  //   return () => clearInterval(timerId);
  // }, [runTimer]);

  // useEffect(() => {
  //   if (countDown < 0 && runTimer) {
  //     console.log("expired");
  //     setRunTimer(false);
  //     setCountDown(0);
  //   }
  // }, [countDown, runTimer]);

  const backPress = () => {
    if (runTimer == true) {
      setleavingModal(true);
    } else {
      navigation.navigate("Home");
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
          navigation.navigate("Home"), setRunTimer(false);
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

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Alert,
//   BackHandler,
//   Dimensions,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { UniversalProps } from "../navigation/NavigationTypes";
// import { hp } from "../helper/Constants";
// import { ApplicationStyles } from "../theme/ApplicationStyles";
// import { useIsFocused, useNavigation } from "@react-navigation/native";
// import { useDispatch } from "react-redux";
// import { getQuestions } from "../actions/quizAction";
// import { ON_SELECT_ANS, SET_QUESTIONS } from "../actions/types";
// import { useAppSelector } from "../redux/Hooks";
// import PagerView from "react-native-pager-view";
// import { colors } from "../theme/Colors";
// import RenderHtml from "react-native-render-html";
// import { commonFont } from "../theme/Fonts";
// import ReactNativeModal from "react-native-modal";
// import { dispatchErrorAction } from "../helper/Global";
// import { icons } from "../helper/IconConstant";
// import BackgroundTimer from "react-native-background-timer";

// const GeneralKnowledge = ({ route }: UniversalProps) => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const isFocused = useIsFocused();
//   const [countDown, setCountDown] = React.useState(0);
//   const [runTimer, setRunTimer] = React.useState(false);
//   const question = useAppSelector((e) => e.common.questions);
//   const togglerTimer = () => setRunTimer((t) => !t);
//   const [selectedQue, setSelectedQue] = React.useState(28);
//   const [initialPage, setInitialPage] = React.useState(28);
//   const viewPager = useRef(null);
//   const [startUpModal, setStartUpModal] = useState(false);
//   const [withouAnswerModal, setWithouAnswerModal] = useState(false);
//   const prevName = useRef(runTimer);
//   console.log("count---->>", countDown);

//   useEffect(() => {
//     const backAction = () => {
//       backPress();
//       return true;
//     };
//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backAction
//     );
//     return () => backHandler.remove();
//   }, [navigation, runTimer]);

//   useEffect(() => {
//     let timerId;
//     if (runTimer) {
//       setCountDown(60 * Number(question.q_time));
//       timerId = setInterval(() => {
//         setCountDown((countDown) => countDown - 1);
//       }, 1000);
//     } else {
//       clearInterval(timerId);
//     }
//     return () => clearInterval(timerId);
//   }, [runTimer]);

//   useEffect(() => {
//     if (countDown < 0 && runTimer) {
//       console.log("expired");
//       setRunTimer(false);
//       setCountDown(0);
//     }
//   }, [countDown, runTimer]);

//   const backPress = () => {
//     console.log(countDown, runTimer);
//     if (runTimer == true) {
//       Alert.alert("Confirm leaving?", "Your test session will be lost.", [
//         {
//           text: "Leave",
//           onPress: () => {
//             navigation.navigate("Home"), setRunTimer(false);
//           },
//         },
//         { text: "Stay", onPress: () => null, style: "cancel" },
//       ]);
//     } else {
//       navigation.navigate("Home");
//     }
//   };

//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity
//           onPress={() => {
//             console.log(countDown, runTimer);
//             backPress();
//           }}
//           style={ApplicationStyles.headerLeftView}
//         >
//           <Image
//             source={icons.backArrow}
//             style={[ApplicationStyles.backBtn, { tintColor: colors.white }]}
//           />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation, runTimer]);

//   useEffect(() => {
//     if (isFocused == true) {
//       if (route.params) {
//         navigation.setOptions({
//           headerTitle: route.params.quizName,
//           gestureEnabled: false,
//         });
//       }
//       setRunTimer(false);
//       setCountDown(0);
//       setSelectedQue(0);
//       dispatch({ type: SET_QUESTIONS, payload: {} });
//       let obj = {
//         params: {
//           id: route.params ? route.params.id : 0,
//         },
//         onSuccess: (res: any) => {
//           setStartUpModal(true);
//         },
//         onFail: () => {},
//       };
//       dispatch(getQuestions(obj));
//     }
//   }, [isFocused]);
//   const onClickOption = (optionIndex: any, index: any) => {
//     dispatch({ type: ON_SELECT_ANS, payload: { optionIndex, index } });
//   };

//   const onPressNext = (ans: any) => {
//     if (ans == null) {
//       setWithouAnswerModal(true);
//       // dispatchErrorAction(dispatch, "Please select any answer");
//     } else {
//       if (selectedQue + 1 == question.questions.length) {
//         togglerTimer();
//         navigation.navigate("QuizAnswer", {
//           heading: route?.params ? route.params.quizName : "General Knowledge",
//         });
//       } else {
//         viewPager.current.setPage(selectedQue + 1);
//       }
//     }
//   };

//   const onPressOKwithoutAnswer = () => {
//     setWithouAnswerModal(false);
//     setTimeout(() => {
//       if (selectedQue + 1 == question.questions.length) {
//         togglerTimer();
//         navigation.navigate("QuizAnswer", {
//           heading: route?.params ? route.params.quizName : "General Knowledge",
//         });
//       } else {
//         viewPager.current.setPage(selectedQue + 1);
//       }
//     }, 1000);
//   };

//   const onPressOK = () => {
//     setRunTimer(true);
//     setSelectedQue(0);
//     setStartUpModal(false);
//   };

//   return (
//     <View style={ApplicationStyles.container}>
//       {countDown == 0 && (
//         <View style={ApplicationStyles.innerContainer}>
//           <Text style={styles.titleText2}>
//             This test series has no question yet.
//           </Text>
//         </View>
//       )}
//       {countDown !== 0 && Object.keys(question).length !== 0 && (
//         <View style={{ flex: 1 }}>
//           <View style={styles.headerView}>
//             <View>
//               <Text style={styles.title}>Question {selectedQue + 1}.</Text>
//             </View>
//             <View style={styles.timeView}>
//               <Text style={styles.timeText}>
//                 {String(Math.floor(countDown / 60)).padStart(1, 0) +
//                   "m " +
//                   String(countDown % 60).padStart(2, 0) +
//                   "s"}
//               </Text>
//             </View>
//           </View>
//           <PagerView
//             onPageSelected={(e) => {
//               setSelectedQue(e.nativeEvent.position);
//             }}
//             ref={viewPager}
//             scrollEnabled={false}
//             style={styles.pagerView}
//             initialPage={initialPage}
//           >
//             {Object.keys(question).length !== 0 &&
//               question?.questions?.map((item, index) => {
//                 return (
//                   <View style={styles.rowView} key={item.id}>
//                     {/* <Text style={styles.questionTitle}>{item.question}</Text> */}
//                     <RenderHtml
//                       contentWidth={Dimensions.get("window").width - hp(4)}
//                       tagsStyles={{
//                         p: {
//                           ...commonFont(500, 20, colors.black),
//                         },
//                       }}
//                       source={{
//                         html: `
//                             <p >
//                               ${item.questionText}
//                             </p>`,
//                       }}
//                     />
//                     {item.answers.map((ans, i) => {
//                       if (item.type == "radio") {
//                         return (
//                           <View style={styles.optionView}>
//                             <TouchableOpacity
//                               onPress={() => onClickOption(i, index)}
//                               style={styles.clickView}
//                               key={i}
//                             >
//                               <View style={{ flex: 1 }}>
//                                 <Text style={styles.optionText}>
//                                   {i + 1}. {ans.text.replace(/\n/g, "")}
//                                 </Text>
//                               </View>
//                               <View>
//                                 {item.selected_answer_index == i ? (
//                                   <Image
//                                     source={require("../assets/selected.png")}
//                                     style={[
//                                       styles.radioImage,
//                                       { tintColor: colors.skyBlue1 },
//                                     ]}
//                                   />
//                                 ) : (
//                                   <Image
//                                     source={require("../assets/unselected.png")}
//                                     style={styles.radioImage}
//                                   />
//                                 )}
//                               </View>
//                             </TouchableOpacity>
//                           </View>
//                         );
//                       }
//                     })}
//                     <View style={{ alignItems: "center", marginTop: 30 }}>
//                       <TouchableOpacity
//                         onPress={() => onPressNext(item.selected_answer_index)}
//                         style={styles.nextButton}
//                       >
//                         <Text style={styles.timeText}>{"NEXT"}</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 );
//               })}
//           </PagerView>
//         </View>
//       )}
//       <ReactNativeModal isVisible={startUpModal}>
//         <View style={styles.modalView}>
//           <Text style={[styles.titleMOdal2, { marginHorizontal: hp(3) }]}>
//             Confirmation
//           </Text>
//           <Text
//             style={styles.titleModal}
//           >{`Click start button to begin the test.\nThere are ${question?.questions?.length} questions.\nYou have ${question?.q_time} minutes.`}</Text>

//           <View style={styles.button}>
//             <TouchableOpacity
//               onPress={() => {
//                 onPressOK();
//               }}
//             >
//               <Text style={styles.btnText}>START</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setStartUpModal(false)}>
//               <Text style={styles.btnText}>CANCEL</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ReactNativeModal>

//       <ReactNativeModal isVisible={withouAnswerModal}>
//         <View style={styles.modalView}>
//           <Text style={[styles.titleMOdal2, { marginHorizontal: hp(3) }]}>
//             Confirm leaving
//           </Text>
//           <Text
//             style={styles.titleModal}
//           >{`You did not select any answer.Are you sure you want to continue?`}</Text>

//           <View style={styles.button}>
//             <TouchableOpacity
//               onPress={() => {
//                 onPressOKwithoutAnswer();
//               }}
//             >
//               <Text style={styles.btnText}>OK</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => setWithouAnswerModal(false)}>
//               <Text style={styles.btnText}>CANCEL</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ReactNativeModal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   modalView: {
//     backgroundColor: colors.white,
//     paddingTop: hp(3),
//     borderRadius: 10,
//   },
//   questionTitle: {
//     ...commonFont(700, 18, colors.black),
//     paddingHorizontal: 10,
//     paddingVertical: 20,
//   },
//   optionText: {
//     ...commonFont(400, 17, colors.black),
//     // fontSsize: 18,
//     paddingVertical: 7,
//   },
//   title: {
//     ...commonFont(700, 18, colors.black),
//   },
//   titleText2: {
//     ...commonFont(400, 18, colors.black),
//   },
//   titleMOdal2: {
//     ...commonFont(700, 20, colors.black),
//     marginBottom: hp(1),
//   },
//   titleModal: {
//     ...commonFont(400, 17, colors.grey),
//     paddingHorizontal: hp(3),
//     lineHeight: 25,
//   },
//   rowView: {
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//   },
//   clickView: {
//     paddingVertical: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   optionView: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#d8d8d8",
//   },
//   radioImage: {
//     height: 25,
//     width: 25,
//     resizeMode: "contain",
//     tintColor: colors.grey,
//   },
//   timeView: {
//     backgroundColor: colors.skyBlue,
//     paddingHorizontal: hp(1.5),
//     paddingVertical: hp(0.7),
//     // borderRadius: 8,
//     width: "30%",
//     alignItems: "center",
//   },
//   nextButton: {
//     backgroundColor: colors.skyBlue,
//     paddingHorizontal: hp(1.5),
//     paddingVertical: hp(1),
//     borderRadius: 5,
//     width: "25%",
//     alignItems: "center",
//   },
//   timeText: { color: colors.white, fontWeight: "bold", fontSize: 18 },
//   pagerView: {
//     flex: 1,
//   },
//   headerView: {
//     padding: hp(2),
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   button: {
//     // padding: hp(2),
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-end",
//   },
//   btnText: {
//     ...commonFont(600, 18, colors.skyBlue),
//     paddingHorizontal: hp(3),
//     paddingVertical: hp(3),
//   },
// });

// export default GeneralKnowledge;
