import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UniversalProps } from "../navigation/NavigationTypes";
import { hp, wp } from "../helper/Constants";
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

const QuizAnswer = ({ route }: UniversalProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const question = useAppSelector((e) => e.common.questions);

  const [score, setscore] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.heading,
    });
    let score = 0;
    question.questions.forEach((element) => {
      let selected_answer = element.selected_answer_index;
      if (selected_answer != null) {
        element.answers.forEach((ans, index) => {
          if (ans.correct == true && selected_answer == index) {
            score = score + 1;
          }
        });
      }
    });
    setscore(score);
  }, []);

  return (
    <View style={ApplicationStyles.container}>
      <ScrollView>
        <View style={styles.headerView}>
          <View>
            <Text style={styles.title1}>
              Congratulation - you have completed{" "}
              <Text style={styles.title}>{route?.params?.heading}</Text>. You
              scored <Text style={styles.title}>{score}</Text> point(s) out of{" "}
              <Text style={styles.title}>
                {Object.keys(question).length !== 0
                  ? question.questions.length
                  : 0}
              </Text>{" "}
              points total. Here are the details for incorrect answers:
            </Text>
          </View>
        </View>

        <View>
          {Object.keys(question).length !== 0 &&
            question.questions.map((item, index) => {
              return (
                <View style={styles.rowView}>
                  <Text style={[styles.title, { textAlign: "center" }]}>
                    Question {index + 1}
                  </Text>
                  <RenderHtml
                    contentWidth={Dimensions.get("window").width - hp(4)}
                    tagsStyles={{
                      p: {
                        ...commonFont(500, 18, colors.black),
                      },
                    }}
                    source={{
                      html: `
<p >
${item.questionText}
</p>`,
                    }}
                  />

                  {item.selected_answer_index == null ? (
                    <View>
                      <View style={styles.optionView}>
                        <Text style={styles.optionText}>
                          No answer selected.
                        </Text>
                      </View>
                    </View>
                  ) : (
                    item.answers.map((ans, i) => {
                      return (
                        <View style={styles.optionView}>
                          <View style={styles.clickView} key={i}>
                            <View style={{ flex: 1 }}>
                              <Text style={styles.optionText}>
                                {i + 1}. {ans.text.replace(/\n/g, "")}
                              </Text>
                            </View>
                            <View>
                              {i == item.selected_answer_index &&
                                !ans.correct && (
                                  <Image
                                    source={require("../assets/cancel.png")}
                                    style={[
                                      styles.radioImage,
                                      { tintColor: "red" },
                                    ]}
                                  />
                                )}

                              {i == item.selected_answer_index &&
                                ans.correct && (
                                  <Image
                                    source={require("../assets/correct.png")}
                                    style={[
                                      styles.radioImage,
                                      { tintColor: "green" },
                                    ]}
                                  />
                                )}
                              {i != item.selected_answer_index &&
                                ans.correct && (
                                  <Image
                                    source={require("../assets/correct.png")}
                                    style={[
                                      styles.radioImage,
                                      { tintColor: "green" },
                                    ]}
                                  />
                                )}

                              {/* {item.answer == option ? (
                          <Image
                            source={require("../../Assets/correct.png")}
                            style={[
                              styles.radioImage,
                              { tintColor: "green" },
                            ]}
                          />
                        ) : item.selected == option &&
                          item.answer !== option ? (
                          <Image
                            source={require("../../Assets/cancel.png")}
                            style={[styles.radioImage, { tintColor: "red" }]}
                          />
                        ) : (
                          <Image
                            source={require("../../Assets/cancel.png")}
                            style={[
                              styles.radioImage,
                              { tintColor: "red", opacity: 0 },
                            ]}
                          />
                        )} */}
                            </View>
                          </View>
                        </View>
                      );
                    })
                  )}
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...commonFont(700, 18, colors.black),
  },
  title1: {
    color: "grey",
    // fontWeight: 'bold',
    fontSize: 18,
    ...commonFont(400, 18, colors.black),
  },
  headerView: {
    padding: hp(2),
  },
  timeView: {
    backgroundColor: colors.skyBlue,
    paddingHorizontal: hp(1.5),
    paddingVertical: hp(0.7),
    borderRadius: 8,
    width: "25%",
    alignItems: "center",
  },
  timeText: { color: colors.white, fontWeight: "bold", fontSize: 18 },
  pagerView: {
    flex: 1,
  },
  questionTitle: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 18,
    // paddingHorizontal: 10,
    paddingVertical: 10,
  },
  optionText: {
    ...commonFont(400, 17, colors.black),
    // fontSsize: 18,
    paddingVertical: 7,
  },
  rowView: {
    paddingHorizontal: 20,
    marginBottom: 30,
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
    marginLeft: hp(2),
  },
  radioImage: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    tintColor: colors.skyBlue,
    marginRight: hp(1.5),
  },
});

export default QuizAnswer;
