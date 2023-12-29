import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-virtualized-view';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../constants';
import OrderCardView from '../components/OrderCardView';
import CartCardView from '../components/CartCardView';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import API from '../services/GlobalAPI';


const Cart = () => {
  const navigation = useNavigation();
  const [cartProductList, setCartProductList] = useState([]); 
  const [userInfoDetail, setUserInfoDetail] = useState([]); 

  const getCartProductList = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); 
      var cart_product_list = await API.requestGET_SP(`/carts?userId=${userId}`); 
      if (cart_product_list) {
        setCartProductList(cart_product_list);
      } else {
        showMessage({
          message: 'Lỗi get sản phẩm trong giỏ hàng',
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

  const getUserInfoDetails = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');
      var userDetails = await API.requestGET_SP(
        `/users/details?id=${userId}&token=${token}`,
      );
      if (userDetails) {
        setUserInfoDetail(userDetails); 
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

  useEffect(() => {
    getCartProductList(); 
  }, []); 

  return (
    <>
      <SafeAreaView>
        <ScrollView>
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
              <Text style={styles.headerText}>Giỏ hàng</Text>
            </View>
          </View>

          <View>
            <FlatList
              data={cartProductList}
              keyExtractor={item => item._id}
              //   maxToRenderPerBatch={2}
              renderItem={({item, index}) => (
                <CartCardView item={item} key={index} />
              )}
              contentContainerStyle={{columnGap: SIZES.medium - 5}}
            />
          </View>

          
          {/* <View style={{marginTop: 30}}>
            <Text
              style={{
                fontSize: SIZES.medium,
                color: COLORS.black,
                marginLeft: 10,
                fontWeight: 'bold',
              }}>
              Thông tin đơn hàng
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 10,
                marginRight: 10,
              }}>
              <Text style={{color: COLORS.black, marginTop: 5}}>Số lượng</Text>
              <Text style={{color: COLORS.black, marginTop: 5}}>10</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginLeft: 10,
                marginRight: 10,
              }}>
              <Text style={{color: COLORS.black, marginTop: 5}}>Tổng tiền</Text>
              <Text style={{color: COLORS.black, marginTop: 5}}>
                1500000000VNĐ
              </Text>
            </View>
          </View> */}

          <View style={{alignItems: 'center', marginTop: 10}}>
            <TouchableOpacity onPress={() => {navigation.navigate('Pay')}} style={styles.makeOrderBtn}>
              <Text style={styles.cartTitle}> Đặt hàng ngay </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Cart;
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
