import React from 'react';
import { View, Text,TextInput, Image, StyleSheet, Touchable } from 'react-native';
import {COLORS, SIZES} from '../../constants';
import {AntDesign,MaterialCommunityIcons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  StyleProp,
  ViewStyle,
  Touchable,
  TouchableOpacity, 
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {COLORS, SIZES} from '../MyApp/constans';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
 
  return (
   <View style={styles.container}>
      
    <StatusBar backgroundColor={COLORS.gray}/>

     <View style={{width:'100%'}}>
      <Image
       source={require('../MyApp/screens/space.jpg')} 
       style={styles.coverImage }
       resizeMode='cover'
     />
   </View>
   
      <View style={styles.profileContainer}>
      <Image
        source={require( '../MyApp/screens/profile.jpeg' )} 
        style={styles.avatar }
      />
        
      <View style={styles.loginBtn}>
          <Text style={styles.menuText}>example.com</Text>
        </View>
        </View>
        


        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.menuItem}>
        
          <Text style={styles.menuText}>Favorites</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Orders</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Cart</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Clear Cache</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Delete Account</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.menuItem}>
          <Text style={styles.menuText}>Log out</Text>
        </View>
        </TouchableOpacity>

         </View>
   
  );
};
const styles = StyleSheet.create({

  coverImage: {
      
    width: '100%',
    height: SIZES.height/3,
    resizeMode:"cover"
  },
  container: {
    flex: 1,
    backgroundColor:COLORS.lightWhite
    
  },
  profileContainer:{
    //flex:1,
    alignItems:"center",
    marginTop: -40,
  marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 999,
    marginTop: -90,
    resizeMode:"cover",
    borderWidth:2,
    borderColor:COLORS.primary
  },
  name:{
    fontFamily:"bold",/*bold/*/
    color:COLORS.primary,
    marginVertical:5,
  
},
menuText:{
  fontFamily:"Poppins",//regular
  color:COLORS.gray,
  marginLeft:20,
  fontWeight:'600',
  fontSize:14,
  lineHeight:26
},
loginBtn:{
  backgroundColor:COLORS.secondary,
  padding:1.5,
  borderWidth:0.4,
  borderColor:COLORS.primary,
  borderRadius:SIZES.medium
},
menuItem:{
  borderBottomWidth:1,
  flexDirection:'row',
  paddingVertical:13,
  paddingHorizontal:35,
  borderColor:COLORS.gray2
},
menuWrapper:{
  //marginTop:SIZES.xLagrge,
  width:SIZES.width-SIZES.large,
  backgroundColor:COLORS.lightWhite,
  borderRadius:12
},
});

export default ProfileScreen;
