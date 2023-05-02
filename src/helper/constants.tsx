import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const wp = (val: any) => {
  return widthPercentageToDP(val);
};

export const hp = (val: any) => {
  return heightPercentageToDP(val);
};
