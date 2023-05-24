import React, { useEffect, useState } from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UniversalProps } from "../navigation/NavigationTypes";
import { hp, wp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import LevelsBlock from "../components/LevelsBlock";
import { colors } from "../theme/Colors";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { getMyPlan } from "../actions";
import SubscribeModal from "../components/SubscribeModal";

const Maths = ({}: UniversalProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { user, myPlan } = useAppSelector((state) => state.common);
  const [subscribeModal, setSubscribeModal] = useState(false);

  useEffect(() => {
    if (isFocused == true) {
      let obj = {
        userid: user.id,
        hash: "EB46F14D6E44B1472AA818248116FF65",
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
      type: "maths_11",
      typeValue: typeValue,
      heading: heading,
    });
  };

  const onPressTest = () => {
    if (myPlan?.data?.is_plan_active) {
      // setSubscribeModal(true);
      navigation.navigate("Quiz", {
        id: 2,
        quizName: "11+ Maths Marathon",
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
            onPressLevel(24, "11 Plus Maths Level 1");
          }}
          bgColor={colors.skyBlue1}
        />
        <LevelsBlock
          title={"Level 2"}
          onPressLevel={() => {
            onPressLevel(23, "11 Plus Maths Level 2");
          }}
          bgColor={colors.pink}
        />
        <LevelsBlock
          title={"Level 3"}
          onPressLevel={() => {
            onPressLevel(25, "11 Plus Maths Level 3");
          }}
          bgColor={colors.skyBlue1}
        />
        <LevelsBlock
          title={"11+Maths Marathon Test"}
          onPressLevel={() => onPressTest()}
          bgColor={colors.pink}
        />
      </View>
      <SubscribeModal
        isVisible={subscribeModal}
        onClose={() => {
          setSubscribeModal(false);
        }}
        onSuccess={() => {
          navigation.navigate("Quiz", {
            id: 2,
            quizName: "11+ Maths Marathon",
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Maths;
