import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export const WEB_CLIENT_ID =
  "355295706725-jju0h51dqmnabbddljlnvr9nkegki8c2.apps.googleusercontent.com";
// export const BASE_URL = "https://braincal.com";
// export const getNonce =
//   BASE_URL + "/api/core/get_nonce?controller=user&method=register";
// export const register = BASE_URL + "/api/user/register";
// export const getPostsData = BASE_URL + "/wp-json/wp/v2/tricks";

export const wp = (val: any) => {
  return widthPercentageToDP(val);
};

export const hp = (val: any) => {
  return heightPercentageToDP(val);
};
