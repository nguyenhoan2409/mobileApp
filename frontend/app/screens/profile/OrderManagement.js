import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS, SIZES } from '../../constants';
import API from '../../services/GlobalAPI';
const OrderManagement = () => {
  const navigation = useNavigation();
  const [showUnpaidOrders, setShowUnpaidOrders] = useState(false);
  const [showCompletedOrders, setShowCompletedOrders] = useState(false);
  const [completedOrdersList, setCompletedOrdersList] = useState([]);
  const [pendingOrdersList, setPendingOrdersList] = useState([]);
  const [completedOrdersWithUsernames, setCompletedOrdersWithUsernames] = useState([]);
  const [getAllOrdersCompletedOrder, setgetAllOrdersCompletedOrder] = useState([]);
  const [pendingOrdersWithUsernames, setPendingOrdersWithUsernames]=useState([]);
  const [totalQuantityPendingOrders,setTotalQuantityPendingOrders]=useState([]);
  const [pendingOrderProductID,setPendingOrderProductID]=useState([]);
  const [unpaidOrders, setUnpaidOrders] = useState([
  ]);

  const [completedOrders, setCompletedOrders] = useState([
    
  ]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [PendingProductQuantity,setPendingProductQuantity]= useState([]);
  const tempQuantity = [];

  const handleToPayPress = () => {
    setShowUnpaidOrders(true);
    setShowCompletedOrders(false);
  };

  const handleCompletedPress = () => {
    setShowUnpaidOrders(false);
    setShowCompletedOrders(true);
  };
  const handleDeleteOrder = async (orderId, orderStatus) => {
    try {
      // Hiển thị hộp thoại xác nhận
      Alert.alert(
        'Xác nhận xóa đơn hàng',
        'Bạn muốn xóa đơn hàng này?',
        [
          {
            text: 'Hủy bỏ',
            style: 'cancel',
          },
          {
            text: 'Xác nhận',
            onPress: async () => {
              const storedToken = await AsyncStorage.getItem('token');
              const response = await API.requestDELETE_ORDER(
                `/delete?token=${storedToken}&id=${orderId}`
              );
  
              if (response.status === 200) {
                console.log('Đơn hàng đã được xóa thành công');
  
                if (orderStatus === 'completed') {
                  setCompletedOrdersList((prevList) =>
                    prevList.filter((order) => order._id !== orderId)
                  );
                } else if (orderStatus === 'pending') {
                  setPendingOrdersList((prevList) =>
                    prevList.filter((order) => order._id !== orderId)
                  );
                }
              } else {
                console.log('Có lỗi xảy ra khi xóa đơn hàng');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.log('Lỗi khi xóa đơn hàng:', error);
    }
  };
  
  const handleGetCompletedOrders = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const getAllOrders = await API.requestGET_SP(`/orders/all?token=${storedToken}`);

      

      const completedOrders = getAllOrders.filter((order) => order.status === 'completed');

      setCompletedOrders(completedOrders);
      setCompletedOrdersList(completedOrders)

      const completedOrdersWithUsernames = await Promise.all(
        completedOrders.map(async (order) => {
          const getUserID = await API.requestGET_USER_DETAILS(
            `/users/details?id=${order.userId}&token=${storedToken}`
          );
          const { user } = getUserID;
          const { username } = user;
          return { ...order, customerName: username };
        })
      );
      setCompletedOrdersWithUsernames(completedOrdersWithUsernames);

      const totalQuantities = completedOrders.map((order) =>
        order.cart.reduce((acc, product) => acc + product.quantity, 0)
      );

      setgetAllOrdersCompletedOrder(totalQuantities);
    } catch (error) {
      console.log('Error getting user details:', error);
    }
  };

  useEffect(() => {
    handleGetCompletedOrders();
   
  }, []);

  useEffect(() => {
    const handleGetPendingOrders = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const getAllOrders = await API.requestGET_SP(`/orders/all?token=${storedToken}`);
        const pendingOrders = getAllOrders.filter((order) => order.status === 'pending');
        
        setPendingOrdersList(pendingOrders)
        const pendingOrdersWithUsernames = await Promise.all(
          pendingOrders.map(async (order) => {
            const getUserID = await API.requestGET_USER_DETAILS(`/users/details?id=${order.userId}&token=${storedToken}`);
            const { user } = getUserID;
            const { username } = user;
            return { ...order, customerName: username };
          })
        );
  
        setPendingOrdersWithUsernames(pendingOrdersWithUsernames);
        //console.log('PendingProductQuantity:', PendingProductQuantity);
        const getTotalAmount = pendingOrders.map((order) => {
          
          const totalAmount = order.totalAmount || 0;
          
          // Lưu totalAmount vào AsyncStorage
          AsyncStorage.setItem(`totalAmount_${order._id}`, totalAmount.toString());
  
          return order.cart.reduce((acc, product) => acc + product.quantity, 0);
        });
       

  
        const pendingOrdersWithQuantity = pendingOrders.map((order) => {
          const totalQuantity = order.cart.reduce((acc, product) => {
            const productQuantity = product.quantity;
            
            tempQuantity.push(productQuantity);
            return acc + productQuantity;
          }, 0);
          AsyncStorage.setItem(`totalQuantity_${order._id}`, totalQuantity.toString());
         
          

          const productIDs = order.cart.map((product) => product.product_id);
          
          const pendingproductQuantity=order.cart.map((product)=>product.quantity);
          setPendingProductQuantity((prevPendingProductQuantity)=>[...prevPendingProductQuantity,{id:order._id,pendingproductQuantity}]);
          setPendingOrderProductID((prevProductIDs) => [...prevProductIDs, { id: order._id, productIDs }]);
         
          return {
            id: order._id,
            customer: order.customerName, 
            total: totalQuantity,
            isPaid: order.isPaid,
          };
        });
  
        const totalQuantities = pendingOrders.map((order) =>
          order.cart.reduce((acc, product) => acc + product.quantity, 0)
        );
  setTotalQuantityPendingOrders(totalQuantities)

 
      } catch (error) {
        console.log('Error getting pending orders:', error);
      }

    };
  
    handleGetPendingOrders();
  }, []);

  const handleOrderClick =  (order) => {
    
    console.log('Order clicked:', order);
    
  
  };
  const handleCheckout= async(order, status) => {
    const { userId, _id: orderId, totalAmount,  } = order;

    const storedToken = await AsyncStorage.getItem('token');
    
    const userDetail = await API.requestGET_USER_DETAILS(`/users/details?id=${userId}&token=${storedToken}`);
   
    const { user } = userDetail;
    const {username,phone,address}=user;
    const productIDs = order.cart.map((product) => product.product_id);
  const eachPendingProductQuantity = order.cart.map((product) => product.quantity);

    navigation.navigate('OrderDetail',{
      eachPendingProductQuantity,
      totalPayment: totalAmount,
      status,
      userInfor: { username, phone, address },
      productIDs,
      orderId
    });
    

   const quantities = productQuantity.map(item => item.quantity);
   await AsyncStorage.setItem('productQuantities', JSON.stringify(quantities));

            await AsyncStorage.setItem('userInfor', JSON.stringify(user));

            await AsyncStorage.setItem('productIDs', JSON.stringify(productIDs));
            await AsyncStorage.setItem('pendingProductQuantity', JSON.stringify(eachPendingProductQuantity));

  };
  const calculateTotalRevenue = () => {
    const revenue = completedOrdersList.reduce((total, order) => total + order.totalAmount, 0);
    setTotalRevenue(revenue);
  };
  
  
  useEffect(() => {
    calculateTotalRevenue();
   
  }, [completedOrdersList]);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order management </Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.inputWrapper}>
          <View style={styles.infoBottom}>
            <TouchableOpacity style={styles.left} onPress={handleToPayPress}>
              <Text style={styles.tasksDone}>{pendingOrdersList.length}</Text>
              <Text style={styles.tasksDone}>Chờ duyệt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.right} onPress={handleCompletedPress}>
              <Text style={styles.tasksDone}>{completedOrdersList.length}</Text>
              <Text style={styles.tasksDone}>Đã giao</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {showUnpaidOrders && (
  <>
    {totalQuantityPendingOrders.map((total,index) => (
      <View key={index} style={styles.wrapper}>
        <TouchableOpacity
          style={styles.container2}
          onPress={() => handleOrderClick(totalQuantityPendingOrders[index])}
        >
          <View style={styles.textContainer}>
            <Text style={styles.productTiltle}>{pendingOrdersWithUsernames[index]?.customerName}</Text>
            <Text>Tổng sản phẩm: {total}</Text>
            
              <Text style={{ color: '#FFCC33' }}>Đang xử lý</Text>
              
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => handleCheckout(pendingOrdersList[index],'đang xử lý')}

          >
            <Text style={styles.checkoutButtonText}>Check-out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteIcon}
            onPress={() =>handleDeleteOrder(pendingOrdersList[index]._id,'pending')}
          >
            <AntDesign name="delete" size={25} color="#EE0000" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    ))}
  </>
)}


      {showCompletedOrders && (
        <>
          {getAllOrdersCompletedOrder.map((total, index) => (
            <View key={index} style={styles.wrapper}>
              <TouchableOpacity
                style={styles.container2}
                onPress={() => handleOrderClick(getAllOrdersCompletedOrder[index])}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.productTiltle}>
                    {completedOrdersWithUsernames[index]?.customerName}
                  </Text>
                  <Text>Tổng sản phẩm: {total}</Text>
                  <Text style={{ color: '#00CC00' }}>Hoàn thành</Text>
                </View>

                <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={() => handleCheckout(completedOrdersList[index],'đã hoàn thành')}
                >
                  <Text style={styles.checkoutButtonText}>Check-out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => handleDeleteOrder(completedOrdersList[index]._id,'completed')}
                >
                   <AntDesign name="delete" size={25} color="#EE0000" />

                </TouchableOpacity>
              </TouchableOpacity>
              <View style={styles.wrapper}>
      <Text style={styles.totalRevenueText}>Tổng doanh thu: {totalRevenue}</Text>
    </View>

            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
    marginTop: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontFamily: 'bold',
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginBottom: SIZES.xLarge,
  
  },
  wrapper: {
    marginHorizontal: 20,
    paddingTop: 20,
  },
  inputWrapper: {
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    height: 55,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  infoBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    height: 50,
    width: '80%',
    marginHorizontal: 'auto',
  },
  left: {
    alignItems: 'center',
    width: '55%',
  },
  right: {
    alignItems: 'center',
    width: '30%',
  },
  tasksDone: {
    fontFamily: 'bold',
    color: COLORS.white,
    fontSize: 15,
  },
  container2: {
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 65,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTiltle: {
    fontSize: SIZES.medium,
    fontFamily: 'bold',
    color: COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: 1.5,
    borderWidth: 0.4,
    borderRadius: SIZES.medium,
    marginHorizontal: 'auto',
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontFamily: 'bold',
    marginHorizontal: 20,
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 26,
  },
  deleteIcon: {
    marginHorizontal: 'auto',
  },
  totalRevenueText:{
    lineHeight: 26,
    color: COLORS.black,
    marginVertical: 5,
    fontSize: SIZES.xLarge,
    fontFamily: 'bold',
    fontWeight: 'bold',
  },
});

export default OrderManagement;
