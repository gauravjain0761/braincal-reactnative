import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { UniversalProps } from "../helper/NavigationTypes";
import { hp, wp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { colors } from "../theme/Utils";
import { commonFont } from "../theme/Fonts";
import Input from "../components/Input";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { sendFeedback } from "../actions";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CommonButton from "../components/CommonButton";

const Feedback = ({ navigation }: UniversalProps) => {
  const dispatch = useAppDispatch();
  const { goBack } = useNavigation();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAppSelector((state) => state.common);

  useEffect(() => {
    setName(user?.firstname);
  }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      setMessage("");
    }, [])
  );

  const onPressSend = () => {
    let obj = {
      name: name,
      message: message,
      mobile: user?.mobile,
    };
    let request = {
      data: obj,
      onSuccess: () => goBack(),
      onFail: () => {},
    };
    dispatch(sendFeedback(request));
  };

  return (
    <KeyboardAwareScrollView style={ApplicationStyles.container}>
      <View style={ApplicationStyles.innerContainer}>
        <View style={styles.inputBoxStyle}>
          <Input
            placeholder="Enter Name"
            label={"Name"}
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="Enter Message"
            label={"Message"}
            value={message}
            onChangeText={setMessage}
          />
        </View>
        <CommonButton
          disabled={name?.length && message.length ? false : true}
          title={"SEND"}
          onPress={onPressSend}
          style={{
            ...styles.buttonStyle,
            // opacity: name?.length && message.length ? 1 : 0.6,
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  inputBoxStyle: {
    marginTop: hp(3),
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
  buttonText: {
    ...commonFont(500, 18, colors.white),
  },
  buttonStyle: {
    width: wp(90),
    alignSelf: "center",
    marginVertical: hp(2),
  },
});

export default Feedback;
