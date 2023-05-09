import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UniversalProps } from "../helper/NavigationTypes";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { getMathTricks } from "../actions";
import TricksRow from "../components/TricksRow";
import { PRE_LOADER } from "../actions/types";
import { colors } from "../theme/Utils";

const MathTricks = ({ navigation }: UniversalProps) => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const TRICKS_DATA = useAppSelector((e) => e.common.tricksData);
  const [footerLoading, setFooterLoading] = useState(false);
  const [onEndReachedCalled, setOnEndReachedCalled] = useState(true);
  const [isDataFound, setIsDataFound] = useState(false);

  useEffect(() => {
    dispatch({ type: PRE_LOADER, payload: true });
    let obj = {
      params: { page: page },
      onSuccess: () => {
        setPage(page + 1);
      },
      onFail: () => {},
    };
    dispatch(getMathTricks(obj));
  }, []);
  console.log("onEndReachedCalled", onEndReachedCalled);

  const loadMore = () => {
    if (!onEndReachedCalled && !footerLoading) {
      setFooterLoading(true);
      let obj = {
        params: { page: page },
        onSuccess: () => {
          setPage(page + 1);
          setFooterLoading(false);
          setOnEndReachedCalled(true);
        },
        onFail: () => {
          setOnEndReachedCalled(true);
          setFooterLoading(false);
        },
      };
      dispatch(getMathTricks(obj));
    }
  };

  return (
    <View style={ApplicationStyles.container}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={TRICKS_DATA}
        renderItem={({ item }) => <TricksRow data={item} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        onMomentumScrollBegin={() => setOnEndReachedCalled(false)}
        ListFooterComponent={() => {
          if (footerLoading) {
            return <ActivityIndicator color={colors.darkBlue} size={"large"} />;
          } else {
            return null;
          }
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default MathTricks;
