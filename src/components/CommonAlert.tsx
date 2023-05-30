import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { UniversalProps } from "../navigation/NavigationTypes";
import { colors } from "../theme/Colors";
import { commonFont } from "../theme/Fonts";
import { hp } from "../helper/Constants";
import ReactNativeModal from "react-native-modal";
interface Props {
  isVisible?: boolean;
  onSuccess?: () => void;
  onCancel: () => void;
  title1: string;
  title2: string;
  successBtn?: string;
  cancelBtn: string;
}
const CommonAlert: FC<Props> = ({
  isVisible,
  onSuccess,
  onCancel,
  title1,
  title2,
  successBtn,
  cancelBtn,
}) => {
  return (
    <ReactNativeModal isVisible={isVisible}>
      <View style={styles.modalView}>
        <Text style={styles.titleMOdal2}>{title1}</Text>
        <Text style={styles.titleModal}>{title2}</Text>
        <View style={styles.button}>
          {successBtn && (
            <TouchableOpacity
              onPress={() => {
                onSuccess();
              }}
            >
              <Text style={styles.btnText}>{successBtn}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => onCancel()}>
            <Text style={styles.btnText}>{cancelBtn}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default CommonAlert;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: colors.white,
    paddingTop: hp(3),
    borderRadius: 10,
  },
  titleMOdal2: {
    ...commonFont(700, 20, colors.black),
    marginBottom: hp(1),
    marginHorizontal: hp(3),
  },
  titleModal: {
    ...commonFont(400, 17, colors.grey),
    paddingHorizontal: hp(3),
    lineHeight: 25,
  },
  button: {
    // padding: hp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  btnText: {
    ...commonFont(600, 18, colors.skyBlue),
    paddingHorizontal: hp(3),
    paddingVertical: hp(3),
  },
});
