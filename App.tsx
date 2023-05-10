import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAppSelector } from "./src/redux/Hooks";
import Navigation from "./src/navigation/Navigation";
import { colors } from "./src/theme/Utils";

const App = () => {
  const preLoader = useAppSelector((e) => e.common.preLoader);
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
      {preLoader && (
        <View style={styles.loaderView}>
          <ActivityIndicator size={"large"} color={colors.darkBlue} />
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

// trickstype: {
//   science_11, english_11, maths_11;
// }
