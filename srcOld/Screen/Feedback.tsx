import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { UniversalProps } from "../Helper/NavigationTypes";
import { Input } from "../Components";
import { hp, wp } from "../Helper/Constants";
import { ApplicationStyles } from "../Theme/ApplicationStyles";
import { colors } from "../Theme/Utils";
import { commonFont } from "../Theme/Fonts";

const Feedback = ({ navigation }: UniversalProps) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  return (
    <View style={ApplicationStyles.container}>
      <KeyboardAwareScrollView>
        <View style={ApplicationStyles.innerContainer}>
          <View style={styles.inputBoxStyle}>
            <Input label={"Name"} value={name} onChangeText={setName} />
            <Input
              label={"Message"}
              value={message}
              onChangeText={setMessage}
            />
          </View>
          <TouchableOpacity
            disabled={name?.length && message.length ? false : true}
            style={{
              ...styles.loginButton,
              opacity: name?.length && message.length ? 1 : 0.6,
            }}
          >
            <Text style={styles.buttonText}>{"SEND"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
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
});

export default Feedback;
