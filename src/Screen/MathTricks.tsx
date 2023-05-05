import React, { useEffect } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UniversalProps } from "../Helper/NavigationTypes";
import { Header } from "../Components";
import { hp, wp } from "../Helper/Constants";
import { ApplicationStyles } from "../Theme/ApplicationStyles";
import { useAppDispatch, useAppSelector } from "../Redux/Hooks";
import { getTricks } from "../APIServices/ApiServices";
import TricksRow from "../Components/Common/TricksRow";

const MathTricks = ({ navigation }: UniversalProps) => {
  const dispatch = useAppDispatch();
  const TRICKS_DATA = useAppSelector((e) => e.common.tricksData);
  console.log("TRICKS_DATA--", TRICKS_DATA);
  useEffect(() => {
    let data = { page: 1 };
    dispatch(getTricks(data));
  }, []);

  return (
    <View style={ApplicationStyles.container}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={TRICKS_DATA}
        renderItem={({ item }) => <TricksRow data={item} />}
        // ListHeaderComponent={renderHeader}
        // ListFooterComponent={renderFooter}
        // ListEmptyComponent={renderEmpty}
        // onEndReachedThreshold={0.2}
        // onEndReached={fetchMoreData}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MathTricks;
