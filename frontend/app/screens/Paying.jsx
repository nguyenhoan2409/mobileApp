import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
// import {ScrollView} from 'react-native-virtualized-view';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../constants';
import {showMessage} from 'react-native-flash-message';
import API from '../services/GlobalAPI';

const Paying = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [productListInCart, setProductListInCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantityTotal, setQuantityTotal] = useState(0); 

  const getUserInfoDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');
      var userDetails = await API.requestGET_SP(
        `/users/details?id=${userId}&token=${token}`,
      );
      if (userDetails) {
        setEmail(userDetails.user.email);
        setLocation(userDetails.user.address);
        setPhone(userDetails.user.phone);
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

  const getProductListInCart = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      var productList = await API.requestGET_SP(`/carts?userId=${userId}`);
      var total = await API.requestGET_SP(
        `/carts/quantity/totalValue?userId=${userId}`,
      );
      var quantityTotal = await API.requestGET_SP(`/carts/quantity?userId=${userId}`); 
      if (productList) {
        setProductListInCart(productList);
      }
      if (total) {
        setTotal(total.totalValue);
      }
      if (quantityTotal) {
        setQuantityTotal(quantityTotal.totalProduct); 
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: error,
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


  const createOrder = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const data = {
        userId: userId,
        address: location,
        couponId: "65538b65bd15fb3ac793a7f0",
      }
      var response = await API.requestPOST_SP(
        `/carts/create-order`, data
      );
      if (response) {
        showMessage({
          message: 'Đã đặt hàng thành công',
          description: '',
          type: 'success',
          position: 'top',
          duration: 3000,
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
        navigation.navigate('BottomTabBuyer');
      } 
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Không đặt hàng thành công',
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

  useEffect(() => {
    getUserInfoDetails();
    getProductListInCart();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <View style={styles.headerContainer}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.goBackBtn}
            />
            <View style={styles.header}>
              <Text style={styles.headerText}>Thanh toán</Text>
            </View>
          </View>

          <View>
            <View style={styles.payingInfoContainer}>
              <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                  />
                </View>
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Số điện thoại</Text>
                <View style={styles.inputWrapper}>
                  <AntDesign
                    name="phone"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    placeholder="Số điện thoại"
                    value={phone}
                    onChangeText={text => setPhone(text)}
                  />
                </View>
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Địa chỉ</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    placeholder="Địa chỉ"
                    value={location}
                    onChangeText={text => setLocation(text)}
                  />
                </View>
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Hình thức thanh toán</Text>
                <View style={styles.inputWrapper}>
                  <Fontisto
                    name="paypal"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    placeholder="Tiền mặt khi nhận hàng"
                    style={{color: COLORS.black}}
                    editable={false}
                  />
                </View>
              </View>
            </View>

            <View style={{marginLeft: 10}}>
              <Text style={styles.label}>Thông tin đơn hàng</Text>
              {productListInCart.map((item, index) => {
                return (
                  <View
                    key={item.product_id._id}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginLeft: 10,
                      marginRight: 10,
                    }}>
                    <Text style={{color: COLORS.black, marginTop: 5}}>
                      {item.product_id.name}
                    </Text>
                    <Text style={{color: COLORS.black, marginTop: 5}}>
                      {item.product_id.originalPrice} * {item.quantity} ={' '}
                      {item.product_id.originalPrice * item.quantity} VNĐ
                    </Text>
                  </View>
                );
              })}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    marginTop: 5,
                    fontWeight: 'bold',
                  }}>
                  Tổng sản phẩm
                </Text>
                <Text style={{color: COLORS.black, marginTop: 5, fontWeight: 'bold'}}>
                  {quantityTotal} sp
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    color: COLORS.black,
                    marginTop: 5,
                    fontWeight: 'bold',
                  }}>
                  Tổng tiền
                </Text>
                <Text style={{color: COLORS.black, marginTop: 5, fontWeight: 'bold'}}>
                  {total} VNĐ
                </Text>
              </View>
            </View>
          </View>

          <View style={{alignItems: 'center', marginTop: 30}}>
            <TouchableOpacity
              onPress={() => {
                createOrder(); 
              }}
              style={styles.makeOrderBtn}>
              <Text style={styles.cartTitle}> Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Paying;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginVertical: SIZES.large,
  },
  header: {
    position: 'absolute',
    alignItems: 'center',
    left: '25%',
    right: '25%',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: SIZES.xLarge - 2,
    color: COLORS.black,
    paddingBottom: 5,
  },
  goBackBtn: {
    paddingLeft: 10,
  },
  payingInfoContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  wrapper: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: SIZES.medium,
    marginBottom: 5,
    marginEnd: 5,
    color: COLORS.black,
  },
  inputWrapper: {
    borderColor: COLORS.black,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 45,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
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
});
