import React from "react";
import Navigation from "./src/Navigation/Navigation";
import {
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
    </View>
  );
};

export default App;
