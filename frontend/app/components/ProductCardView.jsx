import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import {TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/GlobalAPI';

const ProductCardView = ({item}) => {
  const navigation = useNavigation();
  const [id, setId] = useState(''); 

  const addToSeenProductList = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      var response = await API.requestPOST_SP(
        `/users/addRecentlyViewed?id=${userId}`,
        {productId: item._id},
      );
      if (response) {
        console.log('Đã thêm vào danh sách sản phẩm đã xem');
      } else {
        showMessage({
          message: 'Lỗi thêm vào list sản phẩm đã xem',
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

  const addToCart = async (product) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      var response = await API.requestPOST_SP(
        `/carts/add-product?userId=${userId}`, {
          product_id: product._id, 
          quantity: 1
        }
      );
      if (response && response.user_id) {
        showMessage({
          message: 'Đã thêm vào giỏ hàng',
          description: '',
          type: 'success',
          position: 'top',
          duration: 2000,
          icon: props => (
            <AntDesign
              name="checkcircleo"
              size={22}
              color={COLORS.white}
              style={{padding: 10}}
              {...props}
            />
          ),
        });
      } else {
        showMessage({
          message: 'Lỗi thêm vào giỏ hàng',
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

  const getUserRoleID = async () => {
    try {
      const userRoleId = await AsyncStorage.getItem('userRoleId');
      setId(userRoleId); 
    } catch (error) {
      console.log('Lỗi khi lấy userRoleId:', error);
    }
  };

  useEffect(() => {
    getUserRoleID(); 
  }, [])

  return (
    <TouchableOpacity
      onPress={() => {
        addToSeenProductList();
        navigation.navigate('ProductDetail', {item});
      }}
      style={{marginTop: 10}}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={{uri: item.images[0].url}} style={styles.image} />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          {/* <Text style={styles.supplier} numberOfLines={1}>{item.supplier}</Text> */}
          <Text style={styles.price}> ${item.originalPrice}VNĐ </Text>

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.black,
              borderRadius: 100,
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              addToCart(item);
              }}>
            {(id == "653a2547a823940702a4b90e") && (<Text style={{color: COLORS.white, padding: 5}}>
              Thêm vào giỏ hàng
            </Text>)}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
const styles = StyleSheet.create({
  container: {
    width: 175,
    height: 250,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.gray3,
  },
  imgContainer: {
    flex: 1,
    width: 160,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: 'hidden',
    // backgroundColor: COLORS.gray2,
  },
  image: {
    aspectRatio: 1, /// ???
    resizeMode: 'cover',
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    marginBottom: 1,
    color: COLORS.black,
  },
  supplier: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  price: {
    fontWeight: 'regular',
    fontSize: SIZES.medium,
    color: COLORS.black,
  },

  addBtn: {
    position: 'absolute',
    bottom: 1,
    right: SIZES.xSmall,
  },
});
