import React from 'react';
import { View, Text,TextInput, Image, StyleSheet, Touchable } from 'react-native';
import {COLORS, SIZES} from '../../constants';
import {AntDesign,MaterialCommunityIcons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from 'project/screens/Button'
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

const ProfileScreen = () => {
  const [userLogin,setUserLogin]=useState(true);
  return (
   
    <View style={styles.container}>
     <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.gray}/>

      <View style={{width:'100%'}}>
       <Image
        source={require('./space.jpg')} 
        style={styles.coverImage}
        resizeMode='cover'
      />
    </View>

      <View style={styles.profileContainer}>
      <Image
        source={require( './profile.jpeg' )} 
        style={styles.avatar}
      />
      <Text 
      style={styles.name}>{userLogin===true? "Andre":"Please login into account"}
      </Text>

      {userLogin===false?(
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
          <View style={styles.loginBTN}>
          <Text style={styles.menuText}>L O G I N</Text>
          </View>
        </TouchableOpacity>
      ):(
        <View style={styles.loginBTN}>
          <Text style={styles.menuText}>example.com</Text>
        </View>
      )}
    
      {userLogin===false?(
        <View></View>
      ):(
        
      <View style={styles.menuWrapper}>

      <TouchableOpacity onPress={()=>{}}>
        <View style={styles.menuItem(0.2)}>
          <MaterialCommunityIcons
          name="heart-outline"
          color={COLORS.primary}
          size={24}
          />
          <Text style={styles.menuText}>Favorites</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.menuItem(0.2)}>
        <MaterialCommunityIcons
          name="truck"
          color={COLORS.primary}
          size={24}
          />
          <Text style={styles.menuText}>Orders</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.menuItem(0.2)}>
          <MaterialCommunityIcons
          name="bag-carry-on"
          color={COLORS.primary}
          size={24}
          />
          <Text style={styles.menuText}>Cart</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.menuItem(0.2)}>
          <MaterialCommunityIcons
          name="cached"
          color={COLORS.primary}
          size={24}
          />
          <Text style={styles.menuText}>Clear Cache</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.menuItem(0.2)}>
          <AntDesign
          name="delete"
            color={COLORS.primary}
          size={24}
          />
          <Text style={styles.menuText}>Delete Account</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{}}>
        <View style={styles.menuItem(0.2)}>
          <AntDesign
          name="logout"
          color={COLORS.primary}
          size={24}
          />
          <Text style={styles.menuText}>Logout</Text>
        </View>
        </TouchableOpacity>
        </View>
      )}
  

        </View>
      </View>
    </View>
   
  );
};


export default ProfileScreen;


