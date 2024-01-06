import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ViewComponent,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-virtualized-view';
import {SIZES} from '../../constants';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import OrderCardView from '../../components/OrderCardView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import API from '../../services/GlobalAPI';

const HomeSeller = () => {
  const navigation = useNavigation();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSoldProduct, setTotalSoldProduct] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [recentlyOrderList, setRecentlyOrderList] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const getStatisticNumbers = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      var respone = await API.requestGET_SP(
        `/orders/sales-stats/total?token=${token}`,
      );
      if (respone) {
        setTotalRevenue(respone.totalRevenue);
        setTotalSoldProduct(respone.totalProductsSold);
        setTotalOrder(respone.totalOrders);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Lỗi lấy thông tin số liệu thống kê',
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

  const getRecentlyOrderList = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      var respone = await API.requestGET_SP(`/orders/all?token=${token}`);
      if (respone) {
        setRecentlyOrderList(respone);
      }
    } catch (error) {
      console.log(error);
      showMessage({
        message: 'Lỗi lấy thông tin số liệu thống kê',
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
    getStatisticNumbers();
    getRecentlyOrderList();
  }, []);
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
                <Text>{totalRevenue} VNĐ</Text>
              </View>
              <View style={styles.statisValue}>
                <Text style={styles.statisValueHeader}>
                  Tổng sản phẩm bán ra
                </Text>
                <Text>{totalSoldProduct}</Text>
              </View>
            </View>
            <View style={styles.statisValueWrapper}>
              <View style={styles.statisValue}>
                <Text style={styles.statisValueHeader}>Số lượt xem</Text>
                <Text>45</Text>
              </View>
              <View style={styles.statisValue}>
                <Text style={styles.statisValueHeader}>Số lượng đơn hàng</Text>
                <Text>{totalOrder}</Text>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: SIZES.large,
                  fontWeight: 'bold',
                  marginLeft: SIZES.xSmall,
                }}>
                Đơn hàng gần đây
              </Text>
              <Text
                style={{color: COLORS.black, marginRight: 10, marginTop: 5}}>
                Xem tất cả
              </Text>
            </View>

            <FlatList
              data={recentlyOrderList}
              keyExtractor={item => item._id}
              //   maxToRenderPerBatch={2}
              renderItem={({item, index}) => (
                <OrderCardView item={item} key={index} />
              )}
              contentContainerStyle={{columnGap: SIZES.medium - 5}}
            />
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
