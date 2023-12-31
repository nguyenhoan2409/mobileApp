/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigation from './app/navigation/BottomTabNavigation';
import ProductDetail from './app/screens/ProductDetail';
import ProductCateList from './app/screens/ProductCateList';
import BottomTabNavigationSeller from './app/navigation/BottomTabNavSeller';
import RecommendedProducts from './app/screens/RecommendedProducts';
import SeenProducts from './app/screens/SeenProducts';
import Login from './app/screens/auth/Login';
import Signup from './app/screens/auth/Signup';
import FlashMessage from 'react-native-flash-message';
import Cart from './app/screens/Cart';
import Paying from './app/screens/Paying';
import ProfileScreen from './app/screens/profile/ProfileScreen';
import OrderManagement from './app/screens/profile/OrderManagement';
import SellerProfile from './app/screens/profile/SellerProfile';
import OrderDetail from './app/screens/profile/OrderDetail';
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTabBuyer"
          component={BottomTabNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTabSeller"
          component={BottomTabNavigationSeller}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ProductCateList"
          component={ProductCateList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RecommendedProducts"
          component={RecommendedProducts}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SeenProducts"
          component={SeenProducts}
          options={{headerShown: false}}
        />
      
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pay"
          component={Paying}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
      <Stack.Screen
          name="OrderManagement"
          component={OrderManagement}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="SellerProfile"
          component={SellerProfile}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    
      <FlashMessage position={"bottom"} />
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
