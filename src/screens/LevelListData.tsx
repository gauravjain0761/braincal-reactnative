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
import { PRE_LOADER, SET_LEVEL_DATA } from "../actions/types";
import { colors } from "../theme/Utils";
import { useNavigation } from "@react-navigation/native";
import { getLevelWiseData } from "../actions/levelAction";

const LevelListData = ({ route }: UniversalProps) => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const TRICKS_DATA = useAppSelector((e) => e.common.levelData);
  const [footerLoading, setFooterLoading] = useState(false);
  const [onEndReachedCalled, setOnEndReachedCalled] = useState(true);
  const [isDataFound, setIsDataFound] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch({ type: SET_LEVEL_DATA, payload: { data: [], page: 1 } });
    dispatch({ type: PRE_LOADER, payload: true });
    let dataTemp = {
      page: page,
      type: "11_plus",
      taxId: route.params.typeValue,
      cr: 1,
      per_page: 10,
    };
    dataTemp[route.params.type] = route.params.typeValue;
    let obj = {
      params: dataTemp,

      onSuccess: (res) => {
        console.log(res);
        setPage(page + 1);
      },
      onFail: () => {},
    };
    dispatch(getLevelWiseData(obj));
  }, []);

  const loadMore = () => {
    if (!onEndReachedCalled && !footerLoading) {
      setFooterLoading(true);
      let dataTemp = {
        page: page,
        taxId: route.params.typeValue,
        type: "11_plus",
        cr: 1,
        per_page: 10,
      };
      dataTemp[route.params.type] = route.params.typeValue;
      let obj = {
        params: dataTemp,
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
      dispatch(getLevelWiseData(obj));
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

export default LevelListData;
