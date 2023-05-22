import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./Navigation";

type UniversalScreenRouteProp = RouteProp<RootStackParamList>;

type UniversalScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type UniversalProps = {
  route: UniversalScreenRouteProp;
  navigation: UniversalScreenNavigationProp;
};
