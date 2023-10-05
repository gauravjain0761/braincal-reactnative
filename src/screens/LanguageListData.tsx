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
import { UniversalProps } from "../navigation/NavigationTypes";
import { ApplicationStyles } from "../theme/ApplicationStyles";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { getMathTricks, searchPosts } from "../actions";
import TricksRow from "../components/TricksRow";
import {
  PRE_LOADER,
  SET_LANGUAGE_DATA,
  SET_SEARCH_POSTS,
} from "../actions/types";
import { colors } from "../theme/Colors";
import { useNavigation } from "@react-navigation/native";
import { getLevelWiseData } from "../actions/levelAction";
import { getLanguageData } from "../actions/languageAction";
import SearchBar from "../components/SearchBar";
import SearchItemView from "../components/SearchItemView";
import { hp } from "../helper/constants";
const LanguageListData = ({ route }: UniversalProps) => {
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const TRICKS_DATA = useAppSelector((e) => e.common.languageData);
  const [footerLoading, setFooterLoading] = useState(false);
  const [onEndReachedCalled, setOnEndReachedCalled] = useState(true);
  const [isDataFound, setIsDataFound] = useState(false);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState<string>("");
  const { searchPostsList } = useAppSelector((e) => e.common);

  useEffect(() => {
    navigation.setOptions({
      title: route.params.heading,
    });
    dispatch({ type: SET_SEARCH_POSTS, payload: [] });
    dispatch({ type: SET_LANGUAGE_DATA, payload: { data: [], page: 1 } });
    dispatch({ type: PRE_LOADER, payload: true });
    let dataTemp = {
      page: page,
      type: route.params.type,
      cr: 1,
      per_page: 10,
    };
    let obj = {
      params: dataTemp,
      onSuccess: (res) => {
        setPage(page + 1);
      },
      onFail: () => {},
    };
    dispatch(getLanguageData(obj));
  }, []);

  const loadMore = () => {
    if (!onEndReachedCalled && !footerLoading) {
      setFooterLoading(true);
      let dataTemp = {
        page: page,
        type: route.params.type,
        cr: 1,
        per_page: 10,
      };
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
      dispatch(getLanguageData(obj));
    }
  };

  useEffect(() => {
    let obj = {
      page: 1,
      per_page: 20,
      search: searchText?.trim().length === 0 ? "null" : searchText,
    };
    let request = {
      type: route.params.type,
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
          contentContainerStyle={{ flexGrow: 1 }}
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

export default LanguageListData;
