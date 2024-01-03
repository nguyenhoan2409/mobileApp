import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS, SIZES} from '../constants';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/GlobalAPI';
import {showMessage} from 'react-native-flash-message';

const ProductDetail = ({navigation}) => {
  const [count, setCount] = useState(1);
  const [userRoleId, setUserRoleId] = useState('');

  const route = useRoute();
  const {item} = route.params;
  const [location, setLocation] = useState('');

  const getUserInfoDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');
      const user_role_id = await AsyncStorage.getItem('userRoleId');
      setUserRoleId(user_role_id);
      var userDetails = await API.requestGET_SP(
        `/users/details?id=${userId}&token=${token}`,
      );
      if (userDetails) {
        setLocation(userDetails.user.address);
      }
    } catch (error) {
      console.log(error);
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
  };

  const increment = e => {
    e.preventDefault();
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addToCart = async product => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      var response = await API.requestPOST_SP(
        `/carts/add-product?userId=${userId}`,
        {
          product_id: product._id,
          quantity: count,
        },
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

  useEffect(() => {
    getUserInfoDetails();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="heart" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <Image source={{uri: item.images[0].url}} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.name}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{item.originalPrice}VNĐ</Text>
          </View>
        </View>
      </View>
      <View style={styles.ratingRow}>
        <View style={styles.rating}>
          {[1, 2, 3, 4, 5].map(index => (
            <Ionicons key={index} name="star" size={24} color="gold" />
          ))}
          <Text style={styles.ratingText}>(4.9)</Text>
        </View>

        {userRoleId == '653a2547a823940702a4b90e' && (
          <View style={styles.rating}>
            <TouchableOpacity onPress={increment}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
            <Text style={styles.ratingText}> {count} </Text>
            <TouchableOpacity
              onPress={() => {
                decrement();
              }}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.descriptionWrapper}>
        <Text style={styles.description}>Mô tả</Text>
        <Text style={styles.descText}>{item.description}</Text>
      </View>

      <View style={{marginBottom: SIZES.small}}>
        {userRoleId == '653a2547a823940702a4b90e' && (
          <View style={styles.location}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="location-outline" size={24} />
              <Text>{location}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={24} />
              <Text> Miễn phí vận chuyển </Text>
            </View>
          </View>
        )}

        <View style={styles.cartRow}>
          {userRoleId == '653a2547a823940702a4b90e' && (
            <TouchableOpacity
              onPress={() => {
                addToCart(item);
              }}
              style={styles.addToCartBtn}>
              <Text style={styles.cartTitle}> Thêm vào giỏ hàng </Text>
            </TouchableOpacity>
          )}
          {userRoleId == '653a2547a823940702a4b90e' && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Pay');
              }}
              style={styles.makeOrderBtn}>
              <Text style={styles.cartTitle}> Đặt hàng ngay </Text>
            </TouchableOpacity>
          )}
          {(userRoleId == '653a2519a823940702a4b90a' ||
            userRoleId == '653a2551a823940702a4b910') && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UpdateProduct', item);
              }}
              style={styles.makeOrderBtn}>
              <Text style={styles.cartTitle}>
                {' '}
                Chỉnh sửa thông tin sản phẩm{' '}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column"
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    zIndex: 999,
    // backgroundColor: "red",
  },
  image: {
    aspectRatio: 1,
    // width: 50,
    // height: 50,
    resizeMode: 'cover',
  },
  details: {
    marginTop: -SIZES.large,
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginHorizontal: 20,
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 44,
    top: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: SIZES.large,
  },

  priceWrapper: {
    backgroundColor: COLORS.secondary,
  },
  price: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: SIZES.large,
  },
  priceWrapper: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
  },
  ratingRow: {
    paddingBottom: SIZES.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width - 10,
    top: 5,
  },
  rating: {
    top: SIZES.large,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: SIZES.large,
  },
  ratingText: {
    color: COLORS.gray,
    fontFamily: 'medium',
    paddingHorizontal: SIZES.xSmall,
  },
  descriptionWrapper: {
    marginTop: SIZES.large * 2,
    marginHorizontal: SIZES.large,
  },
  description: {
    fontWeight: 'bold',
    fontSize: SIZES.large - 2,
  },
  descText: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    textAlign: 'justify',
    marginBottom: SIZES.small,
  },
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    padding: 5,
    borderRadius: SIZES.large,
  },

  cartRow: {
    paddingBottom: SIZES.small,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SIZES.width,
  },
  addToCartBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.gray,
    padding: SIZES.small,
    borderRadius: SIZES.large,
    marginTop: 10,
  },
  makeOrderBtn: {
    width: SIZES.width * 0.7,
    backgroundColor: COLORS.black,
    padding: SIZES.small,
    borderRadius: SIZES.large,
    marginTop: 10,
  },
  cartTitle: {
    marginLeft: SIZES.small,
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    textAlign: 'center',
  },
  addCart: {
    width: 37,
    height: 37,
    borderRadius: 50,
    margin: SIZES.small,
    backgroundColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
