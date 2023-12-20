import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ViewComponent,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {SIZES} from '../../constants';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import OrderCardView from '../../components/OrderCardView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const HomeSeller = () => {
  const orderList = [
    {
      customerName: 'Mạnh Hoàn',
      orderId: '#51205325',
      date: '21/11/2023',
      imageUrl:
        'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
      total: '150000VNĐ',
    },
    {
      customerName: 'Trung',
      orderId: '#51205325',
      date: '21/11/2023',
      imageUrl:
        'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
      total: '150000VNĐ',
    },
    {
      customerName: 'Hoàng Lan',
      orderId: '#51205325',
      date: '21/11/2023',
      imageUrl:
        'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
      total: '150000VNĐ',
    },
    {
      customerName: 'Lai',
      orderId: '#51205325',
      date: '21/11/2023',
      imageUrl:
        'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
      total: '150000VNĐ',
    },
  ];
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.headerWrapper}>
            <Text style={styles.headerText}>Trang chủ</Text>

            <View style={styles.notificationBtn}>
              <TouchableOpacity>
                <Feather
                  name="bell"
                  size={24}
                  style={styles.notificationIcon}
                />
                <View style={styles.notifyQuantityWrapper}>
                  <Text style={styles.notificationQuantity}>8</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={styles.statisValueWrapper}>
              <View style={styles.statisValue}>
                <Text style={styles.statisValueHeader}>Tổng doanh thu</Text>
                <Text>2000000VNĐ</Text>
              </View>
              <View style={styles.statisValue}>
                <Text style={styles.statisValueHeader}>Tổng sản phẩm bán ra</Text>
                <Text>3</Text>
              </View>
            </View>
            <View style={styles.statisValueWrapper}>
              <View style={styles.statisValue}>
                <Text style={styles.statisValueHeader}>Số lượt xem</Text>
                <Text>45</Text>
              </View>
              <View style={styles.statisValue}>
                <Text style={styles.statisValueHeader}>Số lượng đơn hàng</Text>
                <Text>4</Text>
              </View>
            </View>
          </View>

          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: SIZES.large,
                fontWeight: 'bold',
                marginLeft: SIZES.xSmall,
              }}>
              Đơn hàng gần đây
            </Text>
            <Text style={{color: COLORS.black, marginRight: 10, marginTop: 5}}>Xem tất cả</Text>
            </View>

            <FlatList
              data={orderList}
              keyExtractor={item => item._id}
              //   maxToRenderPerBatch={2}
              renderItem={({item, index}) => (
                <OrderCardView item={item} key={index} />
              )}
              contentContainerStyle={{columnGap: SIZES.medium - 5}}></FlatList>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeSeller;
const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerText: {
    fontSize: 30,
    color: COLORS.black,
    fontWeight: 'bold',
    marginLeft: SIZES.xSmall,
  },
  notificationIcon: {
    color: COLORS.black,
    marginTop: SIZES.xSmall,
    marginRight: SIZES.medium,
  },
  notifyQuantityWrapper: {
    backgroundColor: COLORS.red,
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    alignItems: 'center',
    position: 'absolute',
    left: 12,
  },
  notificationQuantity: {
    // position: 'absolute',
    // right: 12,
    color: COLORS.white,
    fontSize: 12,
  },
  statisValueWrapper: {
    flexDirection: 'row',
  },
  statisValue: {
    backgroundColor: COLORS.gray3,
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 180,
    margin: 10,
  },
  statisValueHeader: {
    color: COLORS.black,
    fontSize: SIZES.large,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
