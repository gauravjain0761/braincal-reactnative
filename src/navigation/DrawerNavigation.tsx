import React, {FC} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screen/Home';

export type RootDrawerParamList = {
  Home: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigation: FC = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false}}>
      <Drawer.Screen name={'Home'} component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
