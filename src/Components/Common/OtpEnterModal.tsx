import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { FC } from "react";
import { colors } from "../../Theme/Utils";
import Modal from "react-native-modal";
import { hp } from "../../Helper/Constants";
import { commonFont } from "../../Theme/Fonts";

interface props {
  isVisible: any;
  onCancel: () => void;
  onPressOk: () => void;
  otp: string;
  onSetOtp: any;
}

const OtpEnterModal: FC<props> = ({
  otp,
  onSetOtp,
  isVisible,
  onCancel,
  onPressOk,
}) => {
  return (
    <View>
      <Modal isVisible={isVisible}>
        <View style={styles.modalView}>
          <Text style={styles.otpText}>One Time Password</Text>
          <TextInput
            style={styles.otpInput}
            placeholder="OTP"
            placeholderTextColor={colors.grey}
            value={otp}
            onChangeText={(text) => onSetOtp(text)}
          />
          <View style={styles.buttonView}>
            <TouchableOpacity onPress={() => onCancel()} style={styles.buttons}>
              <Text style={styles.blueButtonText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressOk()}
              style={styles.buttons}
            >
              <Text style={styles.blueButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OtpEnterModal;
const styles = StyleSheet.create({
  modalView: {
    backgroundColor: colors.white,
    padding: hp(2),
    borderRadius: 5,
  },
  otpText: {
    ...commonFont(500, 20, colors.black),
  },
  otpInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.whiteGrey,
    ...commonFont(400, 16, colors.black),
    paddingHorizontal: 0,
    height: hp(5),
    marginVertical: hp(3),
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttons: {
    paddingHorizontal: hp(2),
    paddingTop: hp(1),
  },
  blueButtonText: {
    ...commonFont(500, 16, colors.primary),
  },
});
