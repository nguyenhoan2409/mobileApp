import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-virtualized-view';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, SIZES} from '../constants';
import { showMessage } from 'react-native-flash-message';

const Paying = () => {
  const navigation = useNavigation();

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
              <Text style={styles.headerText}>Thanh toán</Text>
            </View>
          </View>

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
                <TextInput placeholder="Email" />
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
                <TextInput placeholder="Địa chỉ" />
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

            <View>
              <Text style={styles.label}>Thông tin đơn hàng</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Text style={{color: COLORS.black, marginTop: 5}}>
                  Ghế sofa, SL: 5
                </Text>
                <Text style={{color: COLORS.black, marginTop: 5}}>
                  15000VNĐ
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Text style={{color: COLORS.black, marginTop: 5}}>
                  Bàn học 1, SL: 2
                </Text>
                <Text style={{color: COLORS.black, marginTop: 5}}>
                  100000VNĐ
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
                <Text style={{color: COLORS.black, marginTop: 5}}>
                  1500000000VNĐ
                </Text>
              </View>
            </View>
          </View>

          <View style={{alignItems: 'center', marginTop: 30}}>
            <TouchableOpacity onPress={() => {
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
                navigation.navigate('BottomTabBuyer')}} style={styles.makeOrderBtn}>
              <Text style={styles.cartTitle}> Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
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
