import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import ProductDetail from '../screens/ProductDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/GlobalAPI';
import { showMessage } from 'react-native-flash-message';

const OrderCardView = ({item}) => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState([]); 
  const [firstProductInfo, setFirstProductInfo] = useState([]); 

  const getUserInfoDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      var userDetails = await API.requestGET_SP(
        `/users/details?id=${item.userId}&token=${token}`,
      );
      if (userDetails) {
        setUserInfo(userDetails.user);
  
      } else {
        showMessage({
          message: 'Lỗi lấy thông tin khách hàng',
          description: '',
          type: 'danger',
          position: 'top',
          duration: 2000,
          icon: props => (
            <AntDesign
              name="warning"
              size={22}
              color={COLORS.white}
              style={{padding: 10}}
              {...props}
            />
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const returnStatus = (status) => {
    switch(status) {
      case 'completed': return "Đã xử lý";
      case 'pending': return "Đang chờ xử lý";
    }
  }
  

  useEffect(() => {
    getUserInfoDetails(); 
  }, []); 

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OrderDetail', { orderId: item._id });
      }}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imgContainer}>
            {/* <Image source={{uri: ((firstProductInfo.images)[0]).url}} style={styles.image} /> */}
          </View>

          <View style={styles.details}>
            <Text style={styles.username} numberOfLines={1}>
              {userInfo.username}
            </Text>
            <View >
              <Text style={styles.orderid} numberOfLines={1}>
                #ID: {item._id}
              </Text>
              <Text style={styles.date}> {item.createdAt.substring(0, 10)} </Text>
              {/* <Text style={styles.date}> Trạng thái: {returnStatus(item.status)} </Text> */}
            </View>
          </View>
        </View>

        <View style={styles.priceWrapper}>
          <Text style={styles.price}> {item.totalAmount} VNĐ </Text>
        </View>
        {/* <TouchableOpacity style={styles.addBtn}>
                    <Ionicons name='add-circle' size={35} color={COLORS.primary} />
                </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
};

export default OrderCardView;
const styles = StyleSheet.create({
  container: {
    // width: 172,
    // height: 210,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.gray3,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imgContainer: {
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    overflow: 'hidden',
    // backgroundColor: COLORS.gray2,
  },
  image: {
    aspectRatio: 1, /// ???
    resizeMode: 'cover',
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  details: {
    padding: SIZES.small,
  },
  username: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    marginBottom: 1,
    color: COLORS.black,
  },
  orderid: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  date: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  priceWrapper: {
    justifyContent: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.black,
  },

  addBtn: {
    position: 'absolute',
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});
