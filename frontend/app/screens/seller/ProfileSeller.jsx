// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import { StyleSheet, View, Text } from "react-native";

// const ProfileSeller = () => {
//     const navigation = useNavigation(); 
//     async function removeItemValue(key) {
//         try {
//             await AsyncStorage.removeItem(key);
//             console.log('token was deleted'); 
//             navigation.navigate('Login');
//         }
//         catch(exception) {
//             console.log(exception)
//         }
//     }
//     return (
//         <View>
//             <Text onPress={() => {removeItemValue('userToken')}}>Đăng xuất</Text>
//         </View>
//     )
// }

// export default ProfileSeller; 
// const styles = StyleSheet.create({}); 
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../constants';
import API from '../../services/GlobalAPI';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedUserEmail = await AsyncStorage.getItem('email');
        const storedToken = await AsyncStorage.getItem('token');
          //console.log(storedToken);
       //console.log("UserName",storedUsername);
       
          setUsername(storedUsername);
          setUserEmail(storedUserEmail);
        
        setToken(storedToken);
        
      } catch (error) {
        console.log('Error getting user details:', error);
      }
    };

    getUserDetails();
  }, []); // Chạy chỉ một lần sau khi màn hình được tạo

  const LogOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('userEmail');
      showMessage({
        message: 'Đăng xuất thành công',
        type: 'success',
      });
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error during logout:', error);
      showMessage({
        message: 'Đã xảy ra lỗi khi đăng xuất',
        type: 'danger',
      });
    }
  };
  const handleLogOut =async()=>{
    Alert.alert(
      'Xác nhận đăng xuất?',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy bỏ', style: 'cancel' },
        { text: 'Xác nhận', onPress: () =>LogOut() },
      ]
    );
  }
  const handleDeleteAccount = async () => {
    Alert.alert(
      'Xác nhận xóa tài khoản',
      'Bạn có chắc chắn muốn xóa tài khoản? Thao tác này sẽ không thể hoàn tác.',
      [
        { text: 'Hủy bỏ', style: 'cancel' },
        { text: 'Xác nhận', onPress: () => deleteAccount() },
      ]
    )
  };
  
  const deleteAccount = async () => {
    const responses = await API.requestDELETE_USER(`/users/delete?token=${token}&id=${userId}`);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('username');
    await AsyncStorage.removeItem('userEmail');

    navigation.navigate('Login');
  };
  return (
   <View style={styles.container}>
      
    <StatusBar backgroundColor={COLORS.gray}/>

     <View style={{width:'100%'}}>
      {/* <Image
       source={require('../../../assets/images/space.jpg')} 
       style={styles.coverImage }
       resizeMode='cover'
     /> */}
   </View>
   
      <View style={styles.profileContainer}>
      {/* <Image
        source={require( '../../../assets/images/profile.jpeg' )} 
        style={styles.avatar }
      /> */}

        
        <Text style={styles.name}>{username}</Text>
      <View style={styles.loginBtn}>
     
          <Text style={styles.menuText}>{userEmail}</Text>
        </View>
        </View>
        


      


        <TouchableOpacity onPress={() => navigation.navigate('OrderManagement')}>

  <View style={styles.menuItem}>
  <MaterialCommunityIcons
                  name="truck"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
    <Text style={styles.menuText}>Orders</Text>
  </View>
</TouchableOpacity>




        <TouchableOpacity onPress={handleDeleteAccount}>
        <View style={styles.menuItem}>
        <MaterialCommunityIcons
                  name="delete"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
          <Text style={styles.menuText}>Delete Account</Text>
        </View>
        </TouchableOpacity>


        <TouchableOpacity onPress={handleLogOut}>
  <View style={styles.menuItem}>
  <MaterialCommunityIcons
                  name="logout"
                  size={20}
                  color={COLORS.gray}
                  style={styles.iconStyle}
                />
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
    lineHeight:26,
    color:COLORS.primary,
    marginVertical:5,
    fontSize:SIZES.large,
    fontFamily: 'bold', 
    fontWeight: 'bold',
},
menuText:{
  
  color:COLORS.gray,
  marginHorizontal:20,
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
  flexDirection:'row',
  paddingVertical:13,
  paddingHorizontal:35,
  borderColor:COLORS.gray2,
  borderBottomWidth:1,

//paddingBottom:20
  
},
menuWrapper:{
  //marginTop:SIZES.xLagrge,
  width:SIZES.width-SIZES.large,
  backgroundColor:COLORS.lightWhite,
  borderRadius:14
},
iconStyle: {
  marginRight: 10, 
},
});

export default ProfileScreen; 
