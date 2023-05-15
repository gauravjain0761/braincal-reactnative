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
import React, { FC, useState } from "react";
import { UniversalProps } from "../../helper/NavigationTypes";
import { ApplicationStyles } from "../../theme/ApplicationStyles";
import { useAppDispatch } from "../../redux/Hooks";
import { useNavigation } from "@react-navigation/native";
import { WEB_CLIENT_ID, hp } from "../../helper/Constants";
import { commonFont } from "../../theme/Fonts";
import { colors } from "../../theme/Utils";
import CountryPicker from "rn-country-picker";
import CommonButton from "../../components/CommonButton";
import { getNonce, userLogin } from "../../actions";
import { dispatchErrorAction } from "../../helper/Global";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { icons } from "../../helper/IconConstant";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/Navigation";
import jwt_decode from "jwt-decode";
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

interface container {
  title: String;
  image: ImageSourcePropType;
  onPress: () => void;
}

type LoginProp = StackNavigationProp<RootStackParamList, "Login">;
const Login = ({}: UniversalProps) => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<LoginProp>();
  const [mobileno, setMobileno] = useState("");
  const [countryCode, setCountryCode] = useState<string>("91");

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
    let login_data = {
      mobile: mobileno,
      countryCode: "+" + countryCode,
      nonce: nonce,
    };
    let obj = {
      params: login_data,
      onSuccess: (res: any) => {
        if (res.status === "ok") {
          navigate("VerifyOtp", {
            otp_session: res?.otp_session,
            mobileno: mobileno,
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
      dispatchErrorAction(dispatch, "Please enter mobile number");
    }
  };

  const onGoogleLogin = async () => {
    try {
      await GoogleSignin.configure({ webClientId: WEB_CLIENT_ID });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      let data = {
        name: userInfo?.user?.name,
        email: userInfo?.user.email,
        googleId: userInfo?.user?.id,
      };
      console.log("userInfo", userInfo);
      // dispatch(googleSignIn(data));
    } catch (error) {
      console.log(error);
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
        const currentProfile = Profile.getCurrentProfile().then(function (
          currentProfile
        ) {
          console.log("currentProfile--", currentProfile);
          // if (currentProfile) {
          //   onFacebookLogin(
          //     currentProfile.name,
          //     currentProfile.email,
          //     currentProfile.userID
          //   );
          // }
        });
      } else {
        const result1 = await AccessToken.getCurrentAccessToken();
        getInfoFromToken(result1.accessToken);
      }
    } catch (error) {}
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
          if (result.isCancelled) {
          }
          if (result.email === undefined) {
            Alert.alert(
              strings("validationString.error"),
              strings("validationString.to_continuw_myapp_please_allow_email"),
              strings("validationString.ok")
            );
          } else {
            console.log("currentProfile--", result);
            // onFacebookLogin(result.name, result.email, result.id);
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
      console.log(email, email_verified, is_private_email, sub);
      var str = email;
      str = str.split("@");

      console.log("appleCredential--", identityToken);
    }
  };

  return (
    <KeyboardAwareScrollView style={ApplicationStyles.container}>
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
                countryCode={"91"}
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
              <TouchableOpacity onPress={() => setMobileno("")}>
                <Image
                  source={icons.closeRound}
                  style={styles.roundCloseImage}
                />
              </TouchableOpacity>
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
                width: "100%", // You must specify a width
                height: hp(8),
                alignSelf: "center", // You must specify a height
              }}
              onPress={() => onAppleButtonPress()}
            />
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
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
