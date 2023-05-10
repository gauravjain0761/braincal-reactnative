import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { UniversalProps } from "../helper/NavigationTypes";
import { hp, wp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import Input from "../components/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import CommonButton from "../components/CommonButton";
import {
  dispatchErrorAction,
  getToken,
  setUserInfoAsync,
} from "../helper/Global";
import { setUserInfo, updateUser } from "../actions";

const Profile = ({ navigation }: UniversalProps) => {
  const dispatch = useAppDispatch();
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const { user } = useAppSelector((state) => state.common);

  useEffect(() => {
    setFirstName(user?.firstname);
    setLastName(user?.lastname);
    setEmail(user?.email);
    setMobile(user?.mobile);
    console.log("xvxcv", user.favorites.toString().split(",").map(Number));
  }, [user]);

  const onPressUpdate = async () => {
    const cookie = await getToken();
    let data = {
      cookie: cookie,
      meta_key: "first_name,last_name,mobile,email", //favorites
      meta_value: firstname + "," + lastName + "," + mobile + "," + email, //favorites.map(Number).toString()
    };
    let request = {
      data: data,
      onSuccess: (res: any) => {
        if (res?.status === "ok") {
          dispatch(setUserInfo(res?.user));
          setUserInfoAsync(res?.user);
          navigation.goBack();
        } else {
          dispatchErrorAction(dispatch, res?.error);
        }
      },
      onFail: () => {},
    };
    dispatch(updateUser(request));
  };

  return (
    <KeyboardAwareScrollView style={ApplicationStyles.container}>
      <View style={ApplicationStyles.innerContainer}>
        <View style={{ height: hp(2) }} />
        <Input
          label={"First Name"}
          value={firstname}
          onChangeText={setFirstName}
        />
        <Input
          label={"Last Name"}
          value={lastName}
          onChangeText={setLastName}
        />
        <Input label={"Email"} value={email} onChangeText={setEmail} />
        <Input label={"Mobile"} value={mobile} onChangeText={setMobile} />
      </View>
      <CommonButton
        title={"Update"}
        onPress={onPressUpdate}
        style={styles.buttonStyle}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: wp(90),
    alignSelf: "center",
    marginVertical: hp(2),
  },
});

export default Profile;
