// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { jwtDecode } from "jwt-decode";
// import React from "react";
// import { StyleSheet, View, Text } from "react-native";

// const OrderDetail = () => {
//     return (
//         <View>
//             <Text>OrderDetail</Text>
//         </View>
//     )
// }

// export default OrderDetail; 
// const styles = StyleSheet.create({}); 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants';
import API from '../services/GlobalAPI';
import { showMessage } from 'react-native-flash-message';

const OrderDetail = ({ route }) => {
    const navigation = useNavigation();
    const {orderId } = route.params;
  const [username, setUsername] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [productIDsList, setProductIDsList] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsQuantity, setProductsQuantity] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [status, setStatus] = useState('');
  const [address, setAddress] = useState('');
  const [createAt, setCreatedAt] = useState('');

  const [pendingProductQuanttity, setPendingProductQuantity] = useState([]);

  const getOrderDetail = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const { orderId } = route.params;
      const response = await API.requestGET_SP(`/orders?token=${storedToken}&id=${orderId}`);
      if (response) {
        const { userId, totalAmount, status, address, createdAt } = response;
      
        setTotalAmount(totalAmount);
        setStatus(status);
        setAddress(address);
        setCreatedAt(createdAt);
      
        getUserDetails(userId);
      }
      
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const getUserDetails = async (userId) => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const response  = await API.requestGET_SP(`/users/details?token=${storedToken}&id=${userId}`);
      if (response && response.success && response.user) {
        const { username, phone } = response.user;
        setUsername(username);
        setUserPhone(phone);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  

  useEffect(() => {
    getOrderDetail();
    getUserDetails();
  }, []);

  const updateOrderStatus = async (newStatus) => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const response = await API.requestPOST_SP(`/orders/update?token=${storedToken}&id=${orderId}`, {
        status: newStatus,
      });
  
      if (response) {
        setStatus(newStatus);
        showMessage({
            message: "Đơn hàng đã được cập nhật",
            type: "success",
          });
        console.log('Order status updated:', response);
        navigation.goBack();
    }
    } catch (error) {
      console.error('Error updating order status:', error);
      showMessage({
        message: "Cập nhật đơn hàng thất bại",
        type: "danger",
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order detail </Text>
      </View>

      <View style={styles.menuItem}>
        <Text style={styles.address}>Địa chỉ nhận hàng</Text>
        <Text style={styles.userInfor}>Tên người nhận: {username} </Text>
        <Text style={styles.productTitle}>Số điện thoại: {userPhone}</Text>
        <Text style={styles.productTitle}>Địa chỉ: {address}</Text>
    </View>

        <View style={styles.footer}>
            <Text style={styles.status}>Trạng thái: {status}</Text>
            <Text style={styles.status}>Mã đơn hàng: {orderId}</Text>
            <Text style={styles.totalPayment}> Tổng thanh toán: {totalAmount} VNĐ</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => updateOrderStatus('completed')}>
        <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.red }]} onPress={() => updateOrderStatus('cancelled')}>
        <Text style={styles.buttonText}>Từ chối</Text>
        </TouchableOpacity>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontFamily: 'bold',
    fontSize: SIZES.xLarge,
    color: COLORS.black,
    marginBottom: SIZES.xLarge,
  },
  menuItem: {
    borderBottomWidth: 1,
    paddingHorizontal: 25,
    borderColor: COLORS.gray2,
    paddingBottom: 20,
  },
  productItem: {
    //marginBottom: 10,
    flexDirection: 'row',
    
  },
  productTitle: {
    fontSize: SIZES.medium,
    fontFamily: 'bold',
    color: '#333333',
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  productPrice: {
    fontSize: SIZES.medium,
    color: '#333333',
  },
  totalRevenueText: {
    fontFamily: 'bold',
    fontSize: SIZES.large,
    color: '#333333',
    alignItems: 'center',
    marginBottom: SIZES.xLarge,
  },
  address: {
    lineHeight: 26,
    color: COLORS.black,
    marginVertical: 5,
    fontSize: SIZES.large,
    fontFamily: 'bold',
    fontWeight: 'bold',
  },
  userInfor: {
    lineHeight: 26,
    color: '#333333',
    //marginVertical: 5,
    fontSize:17,
    fontFamily: 'bold',
    fontWeight: 'bold',
  },
  footer:{
    //marginVertical: 15,
    paddingHorizontal: 25,
    paddingBottom: 20,
    marginTop:10,
  }, 
  status:{
    //paddingHorizontal:5,
    marginVertical:2,
    fontSize: SIZES.medium,
    fontFamily: 'bold',
    color: '#333333',
  },
  totalPayment:{
    lineHeight: 26,
    color: COLORS.black,
   
    fontSize: SIZES.large,
    fontFamily: 'bold',
    fontWeight: 'bold',
  },
  productName:{
    fontSize: SIZES.medium,
    fontFamily: 'bold',
    color: COLORS.black,

  },
  infoBox: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  infoText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 5,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
});

export default OrderDetail;
