import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


import Home from '../screens/Home';
import Search from '../screens/Search';
import Profile from '../screens/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeSeller from '../screens/seller/HomeSeller';
import Orders from '../screens/seller/Orders';
import Products from '../screens/seller/Products';
import ProfileSeller from '../screens/seller/ProfileSeller';

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabbarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 70,
  },
};

const BottomTabNavigationSeller = () => {
    return (
    <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen
      name="Trang chủ"
      component={HomeSeller}
      options={{
        tabBarIcon: ({focused}) => {
          return <Ionicons name={focused ? "home" : "home-outline"}
          size = {24}
          color={focused ? "#008E97" : "black"}
          />
        }
      }}></Tab.Screen>
      {/* <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({focused}) => {
          return <Ionicons name={focused ? "search" : "search-outline"}
          size = {24}
          color={focused ? "#008E97" : "black"}
          />
        }
      }}></Tab.Screen> */}
    <Tab.Screen
      name="Đơn hàng"
      component={Orders}
      options={{
        tabBarIcon: ({focused}) => {
          return <Entypo name={focused ? "text-document-inverted" : "text-document"}
          size = {24}
          color={focused ? "#008E97" : "black"}
          />
        }
      }}></Tab.Screen>
    <Tab.Screen
      name="Sản phẩm"
      component={Products}
      options={{
        tabBarIcon: ({focused}) => {
          return <Entypo name={focused ? "list" : "list"}
          size = {24}
          color={focused ? "#008E97" : "black"}
          />
        }
      }}></Tab.Screen>
      <Tab.Screen
      name="Cá nhân"
      component={ProfileSeller}
      options={{
        tabBarIcon: ({focused}) => {
          return <FontAwesome name={focused ? "user" : "user-o"}
          size = {24}
          color={focused ? "#008E97" : "black"}
          />
        }
      }}></Tab.Screen>
  </Tab.Navigator>
    );
};

export default BottomTabNavigationSeller;
