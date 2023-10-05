import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { UniversalProps } from "../../navigation/NavigationTypes";
import { ApplicationStyles } from "../../theme/ApplicationStyles";
import CommonButton from "../../components/CommonButton";
import { commonFont } from "../../theme/Fonts";
import { colors } from "../../theme/Colors";
import { hp } from "../../helper/constants";
import Lottie from "lottie-react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";

const OtpSuccess = ({}: UniversalProps) => {
  const navigation = useNavigation();
  const onPressGetin = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Dashboard" }],
      })
    );
  };
  return (
    <View style={ApplicationStyles.container}>
      <View style={ApplicationStyles.innerContainer}>
        <View style={styles.animationView}>
          <Lottie
            style={{ height: hp(32), alignSelf: "center" }}
            source={require("../../assets/OtpSuccess.json")}
            autoPlay
            loop
          />
        </View>
        <Text style={styles.title}>Success, You’re In</Text>
        <Text style={styles.des}>Your account has been created</Text>
        <CommonButton title={"Get In"} onPress={() => onPressGetin()} />
      </View>
    </View>
  );
};

export default OtpSuccess;

const styles = StyleSheet.create({
  title: { ...commonFont(700, 30, colors.darkBlue), textAlign: "center" },
  des: {
    ...commonFont(400, 16, colors.grey),
    textAlign: "center",
    marginTop: hp(2),
    marginBottom: hp(4),
  },
  animationView: {
    marginTop: hp(18),
    marginBottom: hp(4),
  },
});
