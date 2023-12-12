import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import ProductDetail from '../screens/ProductDetail';

const OrderCardView = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OrderDetail', {item});
      }}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imgContainer}>
            <Image source={{uri: item.imageUrl}} style={styles.image} />
          </View>

          <View style={styles.details}>
            <Text style={styles.username} numberOfLines={1}>
              {item.customerName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.orderid} numberOfLines={1}>
                {item.orderId},
              </Text>
              <Text style={styles.date}> {item.date} </Text>
            </View>
          </View>
        </View>

        <View style={styles.priceWrapper}>
          <Text style={styles.price}> {item.total} </Text>
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
