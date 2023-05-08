import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "./srcOld/Theme/Utils";
import { useAppSelector } from "./src/redux/Hooks";
import Navigation from "./src/navigation/Navigation";

const App = () => {
  const preLoader = useAppSelector((e) => e.common.preLoader);
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
      {preLoader && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={"large"} color={colors.black} />
        </View>
      )}
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  loaderView: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
