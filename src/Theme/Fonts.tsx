import { Dimensions, Platform, PixelRatio, TextStyle } from "react-native";

export function getFontType(fontWeight: Number) {
  if (fontWeight == 300) {
    return "Inter-Light";
  } else if (fontWeight == 400) {
    return "Inter-Regular";
  } else if (fontWeight == 500) {
    return "Inter-Medium";
  } else if (fontWeight == 600) {
    return "Inter-SemiBold";
  } else if (fontWeight == 700) {
    return "Inter-Bold";
  } else {
    return "Inter-Regular";
  }
}
export function commonFont(
  fontWeight: number,
  fontSize: number,
  color: string
): TextStyle {
  return {
    fontFamily: getFontType(fontWeight),
    fontSize: actuatedNormalize(fontSize - 2.5),
    color: color,
    includeFontPadding: false,
  };
}

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

const scale = SCREEN_WIDTH / 320;

export function actuatedNormalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
