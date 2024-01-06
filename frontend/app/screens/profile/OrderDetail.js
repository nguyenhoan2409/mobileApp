import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import API from '../../services/GlobalAPI';

const OrderDetail = ({ route }) => {
  const [username, setUsername] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [productIDsList, setProductIDsList] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsQuantity, setProductsQuantity] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pendingProductQuanttity, setPendingProductQuantity] = useState([]);
  const { eachPendingProductQuantity, totalPayment, status, userInfor, productIDs, orderId } = route.params;
  
  const getUserInfoFromStorage = async () => {
    try {
      const { userInfor } = route.params;
      const { username, phone, address } = userInfor || {};
      setUsername(username || '');
      setUserPhone(phone || '');
      setUserAddress(address || '');
    } catch (error) {
      console.error('Error retrieving user info from route params:', error);
    }
  };
  

  const getProductIDsFromStorage = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      setProductIDsList(productIDs);

      const productDetails = await Promise.all(
        productIDs.map(async (productID) => {
          const productDetail = await API.requestGET_SP(`/products?token=${storedToken}&id=${productID}`);
          return productDetail;
        })
      );

      setProducts(productDetails);

      const quantities = await Promise.all(
        productIDs.map(async (productID) => {
          const quantity = await AsyncStorage.getItem(`totalQuantity_${productID}`);
          return quantity ? parseInt(quantity, 10) : 0;
        })
      );

      setProductsQuantity(quantities);
    } catch (error) {
      console.error('Error retrieving product IDs from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getProductIDsFromStorage();
    getUserInfoFromStorage();
  }, []);

  const calculateTotalAmount = () => {
    const total = products.reduce((acc, product, index) => {
      const quantity = productsQuantity[index];
      const price = parseFloat(product.originalPrice);
      return acc + quantity * price;
    }, 0);

    setTotalAmount(total);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [products, productsQuantity]);

  
  
  const renderProductItem = ({ item, index }) => (
    <View style={styles.productItem}>
      {item.images && item.images.length > 0 && (
        <Image source={{ uri: item.images[0].url }} style={styles.productImage} />
      )}
      <View style={styles.productDetails}>
        <View style={styles.productItem}>
        <Text style={styles.productName}>{item.name} </Text>
        <Text style={styles.productTitle}> ,Số lượng: {eachPendingProductQuantity[index]}</Text>
        </View>
        <Text style={styles.productPrice}>{item.originalPrice}x1</Text>
      </View>
    </View>
  );

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order detail </Text>
      </View>

      <View style={styles.menuItem}>
        <Text style={styles.address}>Địa chỉ nhận hàng</Text>
        <Text style={styles.userInfor}>Tên người nhận: {username} </Text>
        <Text style={styles.productTitle}>Số điện thoại: {userPhone}</Text>
        <Text style={styles.productTitle}>Địa chỉ: {userAddress}</Text>
      </View>

      
        <View style={styles.menuItem}>
          <Text style={styles.address}> Thông tin sản phẩm</Text>

          <FlatList
  data={products}
  keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
  renderItem={renderProductItem}
/>
      </View>

      <View style={styles.footer}>
      <Text style={styles.status}>Trạng thái: {status}</Text>
        <Text style={styles.status}>Mã đơn hàng: {orderId}</Text>
        <Text style={styles.totalPayment}> Tổng thanh toán: {totalPayment} </Text>
        
      </View>
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

  }
});

export default OrderDetail;
