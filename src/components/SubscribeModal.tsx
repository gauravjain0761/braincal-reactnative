import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { FC, useState } from "react";
import { UniversalProps } from "../navigation/NavigationTypes";
import { colors } from "../theme/Colors";
import { commonFont } from "../theme/Fonts";
import { hp } from "../helper/constants";
import Modal from "react-native-modal";
import { icons } from "../helper/iconConstant";
import * as RNIap from "react-native-iap";
import {
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
} from "react-native-iap";
import CommonButton from "./CommonButton";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { getMyPlan, subscribePlan } from "../actions";
import { api } from "../helper/apiConstants";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const itemSkus = Platform.select({
  ios: ["com.prod.consumable1"],
  android: ["com.prod.consumable1"],
});
const SubscribeModal: FC<Props> = ({ isVisible, onClose, onSuccess }) => {
  const [products, setProducts] = useState([]);
  const [productsPrice, setProductsPrice] = useState("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.common);
  console.log('products-----', products)
  React.useEffect(() => {
    RNIap.initConnection().then(() => {
      RNIap.getProducts({ skus: itemSkus })
        .then((res) => {
          console.log("res--", res);
          setProducts(res);
          setProductsPrice(res[0].price);
        })
        .catch((err) => {
          console.log("err--", err);
        });
    });

    const subscription = purchaseUpdatedListener((purchase: Purchase) => {
      console.log("purchase===>>", purchase);
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        onPurchasePlan(purchase);
      }
    });
    const subscriptionError = purchaseErrorListener((error: PurchaseError) => {
      console.log("error==>", error);
    });
    return () => {
      subscription.remove();
      subscriptionError.remove();
      RNIap.endConnection();
    };
  }, []);
  const onPressBuy = () => {
    onClose();
    // setTimeout(() => {

    if (Platform.OS == "ios") {
      RNIap.requestPurchase({ sku: "com.prod.consumable1" });
    } else {
      RNIap.requestPurchase({ skus: [products[0].productId] });
    }

    // }, 3000);
  };
  const onPurchasePlan = (purchase: any) => {
    let obj = {
      // signature: Platform.OS == "android" ? purchase.signatureAndroid : "",
      signature:
        Platform.OS == "android"
          ? purchase.signatureAndroid
          : `ath2oLxCxo42MHlXPYEynFTvNGUqCTGyYNLCdq7HcTZY3qY+4xNUzymRrGRxSATyhfKh7WIKsj3WIMEEUMTm7S+dUw2/kj/FILV7nkJir/9C2ImqMRd+KAP4Pk+jqHVvNv01NiTxTOW/vc6sZNKte9Dnv/sE8+8ceAUqSbrhWxWM0UJbXtNYFYNAusz5Tt9WuEP5HkOENWE4ZPEq+t4/SzWxqoq1JeXLiktbBNEYbnzzmwyTe/4VO7SVOnJhe9zl45vcostw2Kp0tHEiPmriSF1Lqzj15np2i1WgD3gPG3ArjlQwYKoPDUM//b/BoBRULOX0ujTPsdYrDIHqAVPGzg==`,
      userid: user.id,
      hash: api.hash,
      device_type: Platform.OS == "android" ? "ANDROID" : "IOS",
      transaction_id: purchase.transactionId,
      product_id: purchase.productId,
      amount: productsPrice,
      receipt: purchase.transactionReceipt,
    };
    let request = {
      type: "subscribe/plan",
      params: obj,
      onSuccess: (res: any) => {
        if (res.success == true) {
          let obj = {
            userid: user.id,
            hash: api.hash,
          };
          let request = {
            type: "plan/details",
            params: obj,
            onSuccess: (res: any) => { },
            onFail: (err: any) => { },
          };
          dispatch(getMyPlan(request));
          onSuccess();
        }
      },
      onFail: (err: any) => {
        console.log(err);
      },
    };
    dispatch(subscribePlan(request));
    RNIap.finishTransaction(purchase.transactionId);
  };
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={() => onClose()} style={styles.btnView}>
          <Image source={icons.closeRound} style={styles.closeBtn} />
        </TouchableOpacity>
        <Image source={icons.brainCalImage} style={styles.logo} />
        <Text style={styles.titleText}>Braincal Premium</Text>
        <Text style={styles.des}>{products[0]?.description}</Text>
        <Text style={styles.priceText}>{products[0]?.localizedPrice}/M</Text>
        <CommonButton
          onPress={() => onPressBuy()}
          title={"BUY NOW"}
          style={styles.buyBtn}
        />
      </View>
    </Modal>
  );
};

export default SubscribeModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  closeBtn: {
    height: hp(3.5),
    width: hp(3.5),
    resizeMode: "contain",
    tintColor: colors.skyBlue1,
  },
  logo: {
    height: hp(12),
    width: hp(12),
    resizeMode: "contain",
    alignSelf: "center",
  },
  btnView: {
    alignSelf: "flex-end",
    padding: hp(1),
  },
  titleText: {
    ...commonFont(700, 22, colors.darkBlue),
    textAlign: "center",
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  des: {
    marginHorizontal: hp(3),
    ...commonFont(400, 16, colors.black),
    textAlign: "center",
  },
  priceText: {
    ...commonFont(700, 28, colors.skyBlue1),
    textAlign: "center",
    marginVertical: hp(3),
  },
  buyBtn: {
    backgroundColor: colors.skyBlue1,
    width: "80%",
    alignSelf: "center",
    marginBottom: hp(3),
  },
});
