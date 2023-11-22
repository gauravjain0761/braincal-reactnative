import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageSourcePropType,
  Platform,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { UniversalProps } from "../../navigation/NavigationTypes";
import { ApplicationStyles } from "../../theme/ApplicationStyles";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { WEB_CLIENT_ID, hp } from "../../helper/constants";
import { commonFont } from "../../theme/Fonts";
import { colors } from "../../theme/Colors";
import CountryPicker from "rn-country-picker";
import CommonButton from "../../components/CommonButton";
import {
  getNonce,
  newUserRegister,
  setUserInfo,
  userLogin,
} from "../../actions";
import {
  dispatchErrorAction,
  getUserInfo,
  setToken,
  setUserInfoAsync,
} from "../../helper/global";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { icons } from "../../helper/iconConstant";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/Navigation";
import jwt_decode from "jwt-decode";
import { getCurrencies, getLocales } from "react-native-localize";
import {
  appleAuth,
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
  Profile,
  GraphRequestManager,
  GraphRequest,
} from "react-native-fbsdk-next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { country } from "../../helper/CountryData";
import { api } from "../../helper/apiConstants";

interface container {
  title: String;
  image: ImageSourcePropType;
  onPress: () => void;
}

type LoginProp = StackNavigationProp<RootStackParamList, "Login">;
const Login = ({ }: UniversalProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<LoginProp>();
  const [mobileno, setMobileno] = useState("");
  const [countryCode, setCountryCode] = useState<string>("91");
  const preLoader = useAppSelector((e) => e.common.preLoader);

  useEffect(() => {
    let locals = getLocales();
    let temp = country.filter((e) => e.iso == locals[0].countryCode);
    if (temp.length !== 0) setCountryCode(temp[0].code);
    else setCountryCode("91");
  }, []);

  const selectedValue = (value: string) => {
    setCountryCode(value);
  };

  const RenderSocialButton: FC<container> = ({ title, image, onPress }) => {
    return (
      <TouchableOpacity onPress={() => onPress()} style={styles.button}>
        <Image style={styles.socialImage} source={image} />
        <View>
          <Text style={[styles.socialButtonText, { height: 0 }]}>
            Connect with Facebook
          </Text>
          <Text style={styles.socialButtonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const loginApiCallback = (nonce: string) => {
    let mobileTemp = ''
    if (mobileno.charAt(0) == '0') {
      mobileTemp = mobileno.substring(1)
    } else {
      mobileTemp = mobileno
    }
    let login_data = {
      mobile: mobileTemp,
      countryCode: "+" + countryCode,
      nonce: nonce,
    };

    let obj = {
      params: login_data,
      onSuccess: (res: any) => {
        if (res.status === "ok") {
          navigation.navigate("VerifyOtp", {
            otp_session: res?.otp_session,
            mobileno: mobileTemp,
            countryCode: "+" + countryCode,
            nonce: nonce,
          });
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

  const onPressSignIn = () => {
    if (mobileno.trim().length !== 0) {
      let nonce_data = {
        controller: "user",
        method: "register",
      };
      let obj = {
        params: nonce_data,
        onSuccess: (res: any) => {
          loginApiCallback(res?.nonce);
        },
      };
      dispatch(getNonce(obj));
    } else {
      dispatchErrorAction(dispatch, "Please enter valid mobile number");
    }
  };

  const onRegisterUser = (email: any, name: any, username: any) => {
    let login_data = {
      email: email,
      first_name: name,
      username: username,
      hash: api.hash,
    };
    let obj = {
      params: login_data,
      onSuccess: (res: any) => {
        if (res.success === true) {
          setToken(res?.data.cookie);
          setUserInfoAsync(res?.data);
          dispatch(setUserInfo(res?.data));
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "OtpSuccess" }],
            })
          );
        } else {
          dispatchErrorAction(dispatch, res?.error);
        }
      },
      onFail: (error: string) => {
        dispatchErrorAction(dispatch, error);
      },
    };
    dispatch(newUserRegister(obj));
  };

  const onGoogleLogin = async () => {
    try {
      await GoogleSignin.configure({ webClientId: WEB_CLIENT_ID });
      const result = await GoogleSignin.getCurrentUser();
      if (result) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      onRegisterUser(
        userInfo?.user.email,
        userInfo?.user.givenName,
        userInfo?.user?.name
      );
      // dispatch(googleSignIn(data));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const onFacebookButtonPress = async () => {
    LoginManager.logOut();
    try {
      const result = await LoginManager.logInWithPermissions(
        ["public_profile", "email", "user_friends"],
        "limited",
        "my_nonce"
      );

      if (Platform.OS === "ios") {
        const result = await AuthenticationToken.getAuthenticationTokenIOS();
        const currentProfile1 = Profile.getCurrentProfile().then(function (
          currentProfile
        ) {
          if (currentProfile) {
            if (currentProfile?.email) {
              onRegisterUser(
                currentProfile.email,
                currentProfile.firstName,
                currentProfile.name
              );
            } else {
              onRegisterUser("", currentProfile.firstName, currentProfile.name);
            }
          } else {
            dispatchErrorAction(dispatch, "Please try again");
          }
        });
      } else {
        const result1 = await AccessToken.getCurrentAccessToken();
        getInfoFromToken(result1.accessToken);
      }
    } catch (error) { }
  };
  const getInfoFromToken = (token: any) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "id, name, first_name, last_name, birthday, email",
      },
    };
    const profileRequest = new GraphRequest(
      "/me",
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
        } else {
          if (result) {
            if (result?.email) {
              onRegisterUser(result.email, result.first_name, result.name);
            } else {
              onRegisterUser("", result?.first_name, result?.name);
            }
          } else {
            dispatchErrorAction(dispatch, "Please try again");
          }
        }
      }
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const onAppleButtonPress = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error("Apple Sign-In failed - no identify token returned");
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    if (identityToken) {
      // const appleCredential = auth.AppleAuthProvider.credential(
      //   identityToken,
      //   nonce
      // );
      const { email, email_verified, is_private_email, sub } = jwt_decode(
        appleAuthRequestResponse.identityToken
      );
      var str = email;
      str = str.split("@");
      onRegisterUser(email, email, str[0]);
    }
  };
  if (preLoader == false) {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={ApplicationStyles.container}
      >
        <View style={ApplicationStyles.innerContainer}>
          <Image style={styles.image} source={icons.brainCalImage} />
          <View>
            <Text style={styles.heading}>Mobile Number</Text>
            <View style={styles.imputMainView}>
              <View style={{ width: "28%" }}>
                <CountryPicker
                  disable={false}
                  animationType={"slide"}
                  language="en"
                  containerStyle={styles.pickerStyle}
                  selectedCountryTextStyle={styles.selectedCountryTextStyle}
                  countryNameTextStyle={styles.countryNameTextStyle}
                  pickerTitle={"Country Picker"}
                  searchBarPlaceHolder={"Search......"}
                  hideCountryFlag={false}
                  hideCountryCode={false}
                  searchBarStyle={styles.searchBarStyle}
                  countryCode={countryCode}
                  countryFlagStyle={styles.flagImage}
                  selectedValue={selectedValue}
                  dropDownImageStyle={styles.dropDownImage}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  value={mobileno}
                  onChangeText={(text) => setMobileno(text)}
                  style={styles.textInput}
                  placeholder="Enter Number"
                  keyboardType="numeric"
                  placeholderTextColor={colors.grey}
                />
                {mobileno.length > 0 && (
                  <TouchableOpacity onPress={() => setMobileno("")}>
                    <Image
                      source={icons.closeRound}
                      style={styles.roundCloseImage}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <CommonButton onPress={onPressSignIn} title={"Sign In"} />
            <View style={styles.strokeView}></View>
            <RenderSocialButton
              title={"Connect with Google"}
              image={icons.google}
              onPress={() => {
                onGoogleLogin();
              }}
            />
            <RenderSocialButton
              title={"Connect with Facebook"}
              image={icons.facebook}
              onPress={() => {
                onFacebookButtonPress();
              }}
            />
            {Platform.OS == "ios" && (
              <AppleButton
                buttonStyle={AppleButton.Style.WHITE_OUTLINE}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                  width: "100%",
                  height: hp(8),
                  alignSelf: "center",
                }}
                onPress={() => onAppleButtonPress()}
              />
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  } else {
    <View></View>;
  }
};

export default Login;

const styles = StyleSheet.create({
  image: {
    height: hp(15),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: hp(10),
  },
  heading: {
    ...commonFont(500, 13, colors.grey),
    marginTop: hp(3),
  },
  imputMainView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: hp(1.5),
    marginBottom: hp(3),
  },
  pickerStyle: {
    height: hp(7),
    alignItems: "center",
    backgroundColor: colors.whiteGrey,
    borderRadius: 10,
    ...commonFont(500, 15, colors.darkBlue),
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    ...commonFont(500, 15, colors.darkBlue),
    textAlign: "right",
  },
  countryNameTextStyle: {
    ...commonFont(500, 15, colors.darkBlue),
    textAlign: "right",
    paddingLeft: 15,
  },
  searchBarStyle: {
    flex: 1,
    ...commonFont(500, 14, colors.darkBlue),
  },
  textInput: {
    height: hp(7),
    ...commonFont(500, 15, colors.darkBlue),
    flex: 1,
    paddingHorizontal: hp(2),
  },
  roundCloseImage: {
    height: hp(3),
    width: hp(3),
    resizeMode: "contain",
    marginVertical: hp(2),
    marginRight: hp(2),
  },
  inputView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.whiteGrey,
    borderRadius: 10,
    height: hp(7),
    alignItems: "center",
    marginLeft: hp(1),
  },
  dropDownImage: {
    height: 0,
    width: 0,
    paddingLeft: 0,
    marginLeft: 0,
  },
  flagImage: {
    borderRadius: 25 / 2,
    resizeMode: "cover",
    height: 25,
    width: 25,
  },
  strokeView: {
    height: 2.5,
    backgroundColor: colors.grey,
    borderRadius: 10,
    alignSelf: "center",
    width: "12%",
    marginVertical: hp(3),
  },
  button: {
    borderRadius: 10,
    borderColor: colors.lightSkyBlue,
    borderWidth: 1,
    marginBottom: hp(1),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: hp(8),
  },
  socialButtonText: { ...commonFont(500, 15, colors.darkBlue) },
  socialImage: {
    height: hp(4),
    width: hp(4),
    resizeMode: "contain",
    marginRight: 10,
  },
});
