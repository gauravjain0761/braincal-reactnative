import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { UniversalProps } from "../../helper/NavigationTypes";
import { useAppDispatch } from "../../redux/Hooks";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ApplicationStyles } from "../../theme/ApplicationStyles";
import { SCREEN_WIDTH, commonFont } from "../../theme/Fonts";
import { colors } from "../../theme/Utils";
import { hp } from "../../helper/Constants";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import CommonButton from "../../components/CommonButton";
import {
  dispatchErrorAction,
  dispatchSuccessAction,
  setToken,
  setUserInfoAsync,
} from "../../helper/Global";
import { setUserInfo, userLogin } from "../../actions";
import { RootStackParamList } from "../../navigation/Navigation";
import { StackNavigationProp } from "@react-navigation/stack";

type VerifyOtpProp = StackNavigationProp<RootStackParamList, "VerifyOtp">;

const VerifyOtp = ({ route }: UniversalProps) => {
  const { otp_session, mobileno, countryCode, nonce } = route.params || {};
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<VerifyOtpProp>();
  const [value, setValue] = useState("");
  const [session, setSession] = useState<string>("");
  const ref = useBlurOnFulfill({ value, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    setSession(otp_session || "");
  }, [route.params]);

  const onPressVerify = () => {
    if (value.trim().length !== 0) {
      let verify_data = {
        mobile: mobileno,
        countryCode: countryCode,
        otp_session: session,
        otp: value,
      };
      let obj = {
        params: verify_data,
        onSuccess: (res: any) => {
          if (res.status === "ok") {
            setToken(res?.cookie);
            setUserInfoAsync(res?.user);
            dispatch(setUserInfo(res?.user));
            navigate("OtpSuccess");
          } else {
            dispatchErrorAction(dispatch, res?.error);
          }
        },
        onFail: (error: string) => {
          dispatchErrorAction(dispatch, error);
        },
      };
      dispatch(userLogin(obj));
    } else {
      dispatchErrorAction(dispatch, "Please enter OTP");
    }
    // navigation.navigate("OtpSuccess");
  };

  const resendCode = () => {
    let login_data = {
      mobile: mobileno,
      countryCode: countryCode,
      nonce: nonce,
    };
    let obj = {
      params: login_data,
      onSuccess: (res: any) => {
        if (res.status === "ok") {
          setSession(res?.otp_session);
          dispatchSuccessAction(dispatch, "OTP send successfully");
        } else {
          dispatchErrorAction(dispatch, res?.error);
        }
      },
      onFail: (error: string) => {
        dispatchErrorAction(dispatch, error);
      },
    };
    dispatch(userLogin(obj));
  };

  return (
    <View style={ApplicationStyles.container}>
      <View style={ApplicationStyles.innerContainer}>
        <Text style={styles.title}>Verify</Text>
        <Text style={styles.greyText}>
          Please enter the OTP sent to your registered mobile number.
        </Text>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View style={styles.cellView}>
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
        <CommonButton title={"Verify"} onPress={() => onPressVerify()} />
        <Text style={styles.resendCode}>
          Didn’t receive code?{" "}
          <Text
            onPress={resendCode}
            style={{ ...commonFont(600, 15, colors.skyBlue) }}
          >
            Resend Now
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  title: {
    ...commonFont(600, 24, colors.darkBlue),
    textAlign: "center",
    marginTop: hp(3),
    marginBottom: hp(1),
  },
  greyText: {
    ...commonFont(400, 15, colors.grey),
    textAlign: "center",
  },
  codeFieldRoot: { marginTop: hp(4), marginBottom: hp(3) },
  cellView: {
    width: (SCREEN_WIDTH - hp(11)) / 6,
    height: (SCREEN_WIDTH - hp(11)) / 6 - 5,
    backgroundColor: colors.whiteGrey,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    ...commonFont(500, 15, colors.darkBlue),
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
  resendCode: {
    ...commonFont(400, 15, colors.grey),
    textAlign: "center",
    marginTop: hp(4),
  },
});
