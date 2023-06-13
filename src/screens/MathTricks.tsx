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
import { UniversalProps } from "../navigation/NavigationTypes";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { getMathTricks, searchPosts, serachPosts } from "../actions";
import TricksRow from "../components/TricksRow";
import {
  PRE_LOADER,
  SET_SEARCH_POSTS,
  SET_TRICKS_DATA,
} from "../actions/types";
import { colors } from "../theme/Colors";
import SearchBar from "../components/SearchBar";
import SearchItemView from "../components/SearchItemView";
import { hp } from "../helper/Constants";
import { useIsFocused } from "@react-navigation/native";

const MathTricks = ({ navigation }: UniversalProps) => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const TRICKS_DATA = useAppSelector((e) => e.common.tricksData);
  const { searchPostsList } = useAppSelector((e) => e.common);
  const [footerLoading, setFooterLoading] = useState(false);
  const [onEndReachedCalled, setOnEndReachedCalled] = useState(true);
  const [searchText, setSearchText] = useState<string>("");
  const isFocused = useIsFocused();

  useEffect(() => {
    // dispatch({ type: PRE_LOADER, payload: true });
    if (isFocused == true) {
      dispatch({ type: SET_SEARCH_POSTS, payload: [] });
      let obj1 = {
        data: [],
        page: 1,
      };
      dispatch({ type: SET_TRICKS_DATA, payload: obj1 });
      dispatch({ type: PRE_LOADER, payload: true });

      let obj = {
        params: { page: 1 },
        onSuccess: () => {
          setPage(page + 1);
        },
        onFail: () => {},
      };
      dispatch(getMathTricks(obj));
    }
  }, [isFocused]);

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
      <View style={ApplicationStyles.container2}>
        <FlatList
          data={searchPostsList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <SearchItemView item={item} />;
          }}
          // scrollEnabled={false}
          style={{
            marginBottom: searchPostsList.length !== 0 ? hp(2) : 0,
          }}
        />
        <FlatList
          data={TRICKS_DATA}
          renderItem={({ item, index }) => (
            <TricksRow index={index} data={item} />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.2}
          onMomentumScrollBegin={() => setOnEndReachedCalled(false)}
          ListFooterComponent={() => {
            if (footerLoading) {
              return (
                <ActivityIndicator color={colors.darkBlue} size={"large"} />
              );
            } else {
              return null;
            }
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default MathTricks;
