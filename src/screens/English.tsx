import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UniversalProps } from "../navigation/NavigationTypes";
import { hp, wp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import LevelsBlock from "../components/LevelsBlock";
import { colors } from "../theme/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import SubscribeModal from "../components/SubscribeModal";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { getMyPlan } from "../actions";
import { api } from "../helper/ApiConstants";

const English = ({}: UniversalProps) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { user, myPlan } = useAppSelector((state) => state.common);
  const [subscribeModal, setSubscribeModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFocused == true) {
      let obj = {
        userid: user.id,
        hash: api.hash,
      };
      let request = {
        type: "plan/details",
        params: obj,
        onSuccess: (res: any) => {},
        onFail: (err: any) => {},
      };
      dispatch(getMyPlan(request));
    }
  }, [isFocused]);

  const onPressLevel = (typeValue: number, heading: string) => {
    navigation.navigate("LevelListData", {
      type: "english_11",
      typeValue: typeValue,
      heading: heading,
    });
  };

  const onPressTest = () => {
    if (myPlan?.data?.is_plan_active) {
      // setSubscribeModal(true);
      navigation.navigate("Quiz", {
        id: 1,
        quizName: "11+ English Marathon",
      });
    } else {
      setSubscribeModal(true);
    }
  };

  return (
    <View style={ApplicationStyles.container}>
      <View style={ApplicationStyles.innerContainer}>
        <LevelsBlock
          title={"Level 1"}
          onPressLevel={() => {
            onPressLevel(27, "11 Plus English Level 1");
          }}
          bgColor={colors.skyBlue1}
        />
        <LevelsBlock
          title={"Level 2"}
          onPressLevel={() => {
            onPressLevel(28, "11 Plus English Level 2");
          }}
          bgColor={colors.pink}
        />
        <LevelsBlock
          title={"Level 3"}
          onPressLevel={() => {
            onPressLevel(29, "11 Plus English Level 3");
          }}
          bgColor={colors.skyBlue1}
        />
        <LevelsBlock
          title={"11+English Marathon Test"}
          onPressLevel={() => {
            onPressTest();
          }}
          bgColor={colors.pink}
        />
      </View>
      <SubscribeModal
        isVisible={subscribeModal}
        onClose={() => {
          setSubscribeModal(false), console.log("hereeeeee");
        }}
        onSuccess={() => {
          navigation.navigate("Quiz", {
            id: 1,
            quizName: "11+ English Marathon",
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default English;
