import React from "react";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UniversalProps } from "../helper/NavigationTypes";
import { hp, wp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import LevelsBlock from "../components/LevelsBlock";
import { colors } from "../theme/Utils";
import { useAppDispatch } from "../redux/Hooks";
import { useNavigation } from "@react-navigation/native";
import * as RNIap from "react-native-iap";
import {
  purchaseErrorListener,
  purchaseUpdatedListener,
  requestPurchase,
} from "react-native-iap";

const itemSkus = Platform.select({
  ios: ["com.prod1"],
  android: ["com.prod1"],
});

const Maths = ({}: UniversalProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  React.useEffect(() => {
    if (Platform.OS == "ios") {
      RNIap.initConnection().then(() => {
        RNIap.getProducts({ skus: itemSkus })
          .then((res) => {
            console.log("res--", res);
            // console.log("res---", res);
            // product1 = res;
            // setproduct(res);
            // setLoader(false);
          })
          .catch((err) => {
            console.log("err--", err);
            // setLoader(false);
          });
        // RNIap.requestSubscription("com.dematade.basic_plan");
      });
    } else {
      console.log("android");
      // setLoader(false);
    }

    const subscription = purchaseUpdatedListener((purchase: Purchase) => {
      console.log(purchase);
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        console.log("receipt==>", receipt);
        // setIsLoading(false);
        // velidateReceipt(receipt);
        // RNIap.finishTransactionIOS(purchase.transactionId);
      }
    });
    const subscriptionError = purchaseErrorListener((error: PurchaseError) => {
      console.log("error==>", error);
      // setIsLoading(false);
      // setLoader(false);
    });
    return () => {
      subscription.remove();
      subscriptionError.remove();
      RNIap.endConnection();
    };
  }, []);

  const onPressLevel = (typeValue: number, heading: string) => {
    navigation.navigate("LevelListData", {
      type: "maths_11",
      typeValue: typeValue,
      heading: heading,
    });
  };

  return (
    <View style={ApplicationStyles.container}>
      <View style={ApplicationStyles.innerContainer}>
        <LevelsBlock
          title={"Level 1"}
          onPressLevel={() => {
            onPressLevel(24, "11 Plus Maths Level 1");
          }}
          bgColor={colors.skyBlue1}
        />
        <LevelsBlock
          title={"Level 2"}
          onPressLevel={() => {
            onPressLevel(23, "11 Plus Maths Level 2");
          }}
          bgColor={colors.pink}
        />
        <LevelsBlock
          title={"Level 3"}
          onPressLevel={() => {
            onPressLevel(25, "11 Plus Maths Level 3");
          }}
          bgColor={colors.skyBlue1}
        />
        <LevelsBlock
          title={"11+Maths Marathon Test"}
          onPressLevel={() => {}}
          bgColor={colors.pink}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Maths;
