import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { UniversalProps } from "../../Helper/NavigationTypes";
import { CountrySelector, Header } from "../../Components";
import { hp, wp } from "../../Helper/Constants";
import { colors } from "../../Theme/Utils";
import { icons } from "../../Helper/IconConstant";
import { ApplicationStyles } from "../../Theme/ApplicationStyles";
import { commonFont } from "../../Theme/Fonts";
import OtpEnterModal from "../../Components/Common/OtpEnterModal";
import { useAppDispatch, useAppSelector } from "../../Redux/Hooks";
import {
  getNonceApi,
  getRegisterLogin,
  verifyOtp,
} from "../../APIServices/ApiServices";
import { getToken } from "../../Helper/AsyncStorage";
import { CommonActions } from "@react-navigation/native";

const Login = ({ navigation }: UniversalProps) => {
  const [country, setCountry] = useState<String>("India");
  const [countryDataSelected, setCountryDataSelected] = useState<any>("");
  const [mobile, setMobile] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpModalVisible, setOtpModalVisible] = useState<Boolean>(false);
  const [mobileValid, setMobileValid] = useState<Boolean>(false);
  const dispatch = useAppDispatch();
  const [otpSession, setOtpSession] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const preLoader = useAppSelector((e) => e.common.preLoader);

  const getScreen = async () => {
    let user = await getToken();
    console.log("user--", user);
    if (user && Object.keys(user).length !== 0) {
      dispatch({ type: "SET_USER", payload: user });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "DrawerHome" }],
        })
      );
    } else {
      dispatch({ type: "PRE_LOADER", payload: false });
    }
  };

  useEffect(() => {
    getScreen();
  }, []);

  const onLoginMobile = () => {
    dispatch(
      getNonceApi((res: any) => {
        console.log(res);
        let data = {
          mobile: mobile,
          countryCode:
            countryDataSelected == ""
              ? "91"
              : countryDataSelected.callingCode[0],
          nonce: res.nonce,
        };
        console.log(data);
        dispatch(
          getRegisterLogin(data, (res: any) => {
            setOtpModalVisible(true);
            setOtpSession(res.otp_session);
          })
        );
      })
    );
  };

  const handleMobileInput = (text: string) => {
    setMobile(text);
    if (text.trim().length == 10) {
      setMobileValid(true);
    } else {
      setMobileValid(false);
    }
  };

  const onSendOtp = () => {
    setOtpError("");
    if (otp.trim() !== "") {
      let data = {
        mobile: mobile,
        countryCode:
          countryDataSelected == "" ? "91" : countryDataSelected.callingCode[0],
        otp_session: otpSession,
        otp: otp,
      };
      dispatch(
        verifyOtp(
          data,
          () => {
            setOtpModalVisible(false);
            navigation.navigate("DrawerHome");
          },
          (err: any) => {
            setOtpError(err.error);
          }
        )
      );
    } else {
      setOtpError("Please enter valid OTP");
    }
  };
  if (preLoader == false) {
    return (
      <View style={ApplicationStyles.container}>
        <Header title={"Login"} />
        <View style={ApplicationStyles.innerContainer}>
          <Image source={icons.ok} style={styles.iconStyleOkIcon} />
          <CountrySelector
            country={country}
            onSelectCountry={(res: any) => {
              console.log(res);
              setCountry(res?.name);
              setCountryDataSelected(res);
            }}
          />
          <View style={styles.mobileInputView}>
            <Image source={icons.phone} style={styles.iconStyle} />
            <TextInput
              value={mobile}
              onChangeText={(text) => {
                handleMobileInput(text);
              }}
              keyboardType={"numeric"}
              style={styles.mobileInput}
              placeholder="Mobile"
              placeholderTextColor={colors.primary}
            />
          </View>
          {mobileValid == true ? (
            <TouchableOpacity
              onPress={() => onLoginMobile()}
              style={styles.loginButton}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          ) : (
            <View style={[styles.loginButton, { opacity: 0.6 }]}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.rowView, { backgroundColor: colors.red }]}
          >
            <Image source={icons.google} style={styles.iconStyleButton} />
            <View style={styles.textButtonView}>
              <Text style={styles.buttonText}>LOGIN WITH GOOGLE</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rowView, { backgroundColor: colors.blue }]}
          >
            <Image source={icons.facebook} style={styles.iconStyleButton} />
            <View style={styles.textButtonView}>
              <Text style={styles.buttonText}>LOGIN WITH FACEBOOK</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rowView, { backgroundColor: colors.black }]}
          >
            <Image source={icons.apple} style={styles.iconStyleButton} />
            <View style={styles.textButtonView}>
              <Text style={styles.buttonText}>SIGN IN WITH APPLE</Text>
            </View>
          </TouchableOpacity>
          <OtpEnterModal
            onCancel={() => setOtpModalVisible(false)}
            otp={otp}
            onSetOtp={(res: any) => setOtp(res)}
            onPressOk={() => {
              onSendOtp();
            }}
            error={otpError}
            isVisible={otpModalVisible}
          />
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
};

const styles = StyleSheet.create({
  mobileInputView: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteGrey,
  },
  mobileInput: {
    flex: 1,
    marginLeft: hp(2),
    ...commonFont(400, 18, colors.black),
    height: hp(5),
  },
  iconStyleOkIcon: {
    height: hp(15),
    width: hp(15),
    tintColor: colors.primary,
    alignSelf: "center",
    marginVertical: hp(3),
  },
  iconStyle: {
    height: hp(2),
    width: hp(2),
    tintColor: colors.primary,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    height: hp(5),
    marginTop: hp(4),
  },
  buttonText: {
    ...commonFont(500, 18, colors.white),
  },
  iconStyleButton: {
    height: hp(3),
    width: hp(3),
    tintColor: colors.white,
    marginHorizontal: hp(1.5),
  },
  textButtonView: {
    flex: 1,
    borderLeftWidth: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    alignItems: "center",
    borderRadius: 6,
    height: hp(5),
    backgroundColor: colors.primary,
    justifyContent: "center",

    marginTop: hp(1),
    marginBottom: hp(2),
  },
});

export default Login;
