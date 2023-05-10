import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { UniversalProps } from "../helper/NavigationTypes";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { getMathTricks, searchPosts, serachPosts } from "../actions";
import TricksRow from "../components/TricksRow";
import { PRE_LOADER } from "../actions/types";
import { colors } from "../theme/Utils";
import SearchBar from "../components/SearchBar";
import SearchItemView from "../components/SearchItemView";

const MathTricks = ({ navigation }: UniversalProps) => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const TRICKS_DATA = useAppSelector((e) => e.common.tricksData);
  const { searchPostsList } = useAppSelector((e) => e.common);
  const [footerLoading, setFooterLoading] = useState(false);
  const [onEndReachedCalled, setOnEndReachedCalled] = useState(true);
  const [searchText, setSearchText] = useState<string>("");

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

  useEffect(() => {
    let obj = {
      page: 1,
      per_page: 20,
      search: searchText?.trim().length === 0 ? "null" : searchText,
    };
    let request = {
      type: "tricks",
      params: obj,
      onSuccess: () => {},
      onFail: () => {},
    };
    dispatch(searchPosts(request));
  }, [searchText]);

  const onSearchPosts = (text: string) => {
    setSearchText(text);
  };

  return (
    <View style={ApplicationStyles.container}>
      <SearchBar
        value={searchText}
        onChangeText={(text) => onSearchPosts(text)}
        onPressClose={() => setSearchText("")}
      />
      <FlatList
        data={searchPostsList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return <SearchItemView item={item} />;
        }}
      />
      <FlatList
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
