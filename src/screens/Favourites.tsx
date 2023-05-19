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
import { hp, wp } from "../helper/Constants";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { PRE_LOADER, SET_FAVOURITES_POSTS } from "../actions/types";
import TricksRow from "../components/TricksRow";
import { colors } from "../theme/Utils";
import { getFavouritesData } from "../actions/favouriteAction";
import { useIsFocused } from "@react-navigation/native";

const Favourites = ({ navigation }: UniversalProps) => {
  const favouritesId = useAppSelector((e) => e.common.favouritesId);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const [onEndReachedCalled, setOnEndReachedCalled] = useState(true);
  const [footerLoading, setFooterLoading] = useState(false);
  const favouritesPosts = useAppSelector((e) => e.common.favouritesPosts);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused == true) {
      setPage(1);
      setOnEndReachedCalled(true);
      setFooterLoading(false);
      dispatch({ type: PRE_LOADER, payload: true });
      let ids = Object.assign([], favouritesId);
      if (ids.length !== 0) {
        if (!ids) ids = "0";
        if (ids.indexOf(",") >= 0) {
          let tempIds: string[] = ids.split(",");
          let validIds: number[] = [];
          for (let i = 0; i < tempIds.length; i++) {
            let validId: number = parseInt(tempIds[i]);
            if (!isNaN(validId)) validIds.push(parseInt(tempIds[i]));
          }
          if (validIds.length > 0) {
            ids = validIds.join();
          }
        }

        let obj = {
          params: { page: 1, per_page: 10, include: ids },
          onSuccess: () => {
            setPage(page + 1);
          },
          onFail: () => {},
        };
        dispatch(getFavouritesData(obj));
      } else {
        dispatch({
          type: SET_FAVOURITES_POSTS,
          payload: { data: [], page: 1 },
        });
      }
    }
  }, [isFocused]);
  const loadMore = () => {
    if (!onEndReachedCalled && !footerLoading) {
      setFooterLoading(true);
      let ids = Object.assign([], favouritesId);
      if (ids.length !== 0) {
        if (!ids) ids = "0";
        if (ids.indexOf(",") >= 0) {
          let tempIds: string[] = ids.split(",");
          let validIds: number[] = [];
          for (let i = 0; i < tempIds.length; i++) {
            let validId: number = parseInt(tempIds[i]);
            if (!isNaN(validId)) validIds.push(parseInt(tempIds[i]));
          }
          if (validIds.length > 0) {
            ids = validIds.join();
          }
        }

        let obj = {
          params: { page: page, per_page: 10, include: ids },
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
        dispatch(getFavouritesData(obj));
      } else {
        dispatch({
          type: SET_FAVOURITES_POSTS,
          payload: { data: [], page: 1 },
        });
      }
    }
  };

  return (
    <View
      style={[
        ApplicationStyles.container,
        ApplicationStyles.container2,
        { marginTop: hp(3) },
      ]}
    >
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        data={favouritesPosts}
        renderItem={({ item, index }) => (
          <TricksRow index={index} data={item} />
        )}
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

export default Favourites;
