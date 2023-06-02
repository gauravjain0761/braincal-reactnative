import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export const WEB_CLIENT_ID =
  "355295706725-jju0h51dqmnabbddljlnvr9nkegki8c2.apps.googleusercontent.com";

export const wp = (val: any) => {
  return widthPercentageToDP(val);
};

export const hp = (val: any) => {
  return heightPercentageToDP(val);
};
