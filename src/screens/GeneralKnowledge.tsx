import React, { useEffect } from "react";
import {
  Alert,
  Button,
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
import { getQuestions, getQuiz } from "../actions/quizAction";

const GeneralKnowledge = ({}: UniversalProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(false);
  const togglerTimer = () => setRunTimer((t) => !t);
  useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(60 * 5);
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
      Alert.alert(
        "Confirmation",
        "Click start button to begin the test.\nThere are 10 questions.\nYou have 5 minutes",
        [
          {
            text: "OK",
            onPress: () => {
              // dispatch(getQuiz());
              dispatch(getQuestions());
              togglerTimer();
              dispatch({ type: "SET_QUESTIONS", payload: "" });
              // setSelectedQue(queData[0].id);
              // viewPager.current.setPage(0);
            },
          },
        ]
      );
    }
  }, [isFocused]);

  return (
    <View style={ApplicationStyles.container}>
      <View style={ApplicationStyles.innerContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default GeneralKnowledge;
