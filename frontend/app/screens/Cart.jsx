import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
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

const Cart = () => {
  const navigation = useNavigation();
  const productList = [
    {
      customerName: 'Ghế sofa',
      orderId: '150000 * 1',
      date: '',
      imageUrl:
        'https://res.cloudinary.com/dzahzhy9f/image/upload/v1702970193/products/jprqudqoowafvqtfase6.jpg',
      total: '150000VNĐ',
    },
    {
      customerName: 'Bàn học 1',
      orderId: '150000 * 2',
      date: '',
      imageUrl:
        'https://res.cloudinary.com/dzahzhy9f/image/upload/v1702981896/products/nhjkzklzc0omyifyrklt.jpg',
      total: '150000VNĐ',
    },
    {
      customerName: 'Bàn học 2',
      orderId: '150000 * 3',
      date: '',
      imageUrl:
        'https://res.cloudinary.com/dzahzhy9f/image/upload/v1702981911/products/w78rcnalfdbxvq31yeww.jpg',
      total: '150000VNĐ',
    },
    {
      customerName: 'Bàn học 3',
      orderId: '150000 * 4',
      date: '',
      imageUrl:
        'https://res.cloudinary.com/dzahzhy9f/image/upload/v1702981923/products/wlwdlu9fkyeyei6oac6o.jpg',
      total: '150000VNĐ',
    },
  ];

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
              data={productList}
              keyExtractor={item => item._id}
              //   maxToRenderPerBatch={2}
              renderItem={({item, index}) => (
                <OrderCardView item={item} key={index} />
              )}
              contentContainerStyle={{columnGap: SIZES.medium - 5}}
            />
          </View>

          <View style={{marginTop: 30}}>
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
          </View>

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
