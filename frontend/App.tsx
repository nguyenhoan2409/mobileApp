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
import BottomTabNavigation from './navigation/BottomTabNavigation';
import ProductDetail from './screens/ProductDetail';
import ProductCateList from './screens/ProductCateList';
import BottomTabNavigationSeller from './navigation/BottomTabNavSeller';

const Stack = createNativeStackNavigator();
var userType = "buyer";

function App(): JSX.Element {
  if (userType == "buyer") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BottomTab"
            component={BottomTabNavigation}
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
        
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BottomTabSeller"
            component={BottomTabNavigationSeller}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
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
