import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import API from '../../services/GlobalAPI';
const OrderDetail= () => {
    const [username, setUsername] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [productIDsList, setProductIDsList] = useState([]);
    const [products, setProducts] = useState([]);
    const [productsQuantity, setProductsQuantity] = useState([]);
    
    const getUserInfoFromStorage = async () => {
        try {
          const userInfoString = await AsyncStorage.getItem('userInfor');
          if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            setUsername(userInfo.username || '');
        setUserPhone(userInfo.phone || '');
        setUserAddress(userInfo.address || '');
        
           
          }
        } catch (error) {
          console.error('Error retrieving user info from AsyncStorage:', error);
        }
      };
      useEffect(() => {
        getUserInfoFromStorage();
      }, []);

      const getProductIDsFromStorage = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
          const productIDsString = await AsyncStorage.getItem('productIDs');
          if (productIDsString) {
            const productIDs = JSON.parse(productIDsString);
            // Sử dụng danh sách productIDs ở đây
            setProductIDsList(productIDs)
            console.log('Product ID:', productIDsList);
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
             
          }
        } catch (error) {
          console.error('Error retrieving product IDs from AsyncStorage:', error);
        }
      };
      
      useEffect(() => {
        getProductIDsFromStorage();
      }, []);
      
  const renderProductItem = ({ item,index }) => (
    <View style={styles.productItem}>
        {item.images  > 0 && (
      <Image
        source={{ uri: item.images[0].url }} 
      />
    )}
      <Text style={styles.productTitle}>{item.name}, Số lượng:{productsQuantity[index]}</Text>
      <Text style={styles.productPrice}>{item.originalPrice}</Text>
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
      <Text style={styles.userInfor}>Tên người gửi:{username} </Text>
        <Text style={styles.productTitle} >Số điện thoại:{userPhone}</Text>
        <Text style={styles.productTitle}>Địa chỉ:{userAddress}</Text>
        </View>
<View>
  <View style={styles.menuItem}>
    <Text style={styles.address}> Thông tin sản phẩm</Text>
    
    <FlatList
  data={products}
  keyExtractor={(item) => (item.id ? item.id.toString() : '')}
  renderItem={renderProductItem}
/>

    </View>
</View>

<View>
    <Text style={styles.totalRevenueText}> Tổng thanh toán:  </Text>
    <Text style={styles.productTitle}>Trạng thái: đã hoàn thành</Text>
</View>

            </ScrollView>
        
    )
}
const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor:COLORS.lightWhite
    //padding: 20,
    
  },
  container1:{
    flex: 1,
    backgroundColor: COLORS.offwhite, 
    height: SIZES.height/6,

  },
  container2:{
    
    backgroundColor:COLORS.lightWhite,
    borderWidth:1,
    height:65,
    borderRadius:12,
    flexDirection:'row',
    paddingHorizontal:15,
    alignItems:"center",
    

  },
  textContainer:{
    flex:1,
    marginHorizontal:SIZES.medium
  },
 
  header: {
     justifyContent: 'center', 
    alignItems: 'center',
    marginBottom:1,
    marginTop:10
  },
  headerText: {
    fontWeight: 'bold',
    fontFamily:"bold",
    fontSize:SIZES.xLarge,
    color:COLORS.primary,
    marginBottom:SIZES.xLarge
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


 
inputWrapper:{
 backgroundColor:COLORS.primary,
  borderWidth:1,
  height:55,
  borderRadius:12,
  flexDirection:'row',
  paddingHorizontal:15,
  alignItems:"center",
  
 
},
  coverImage: {
      
    width: '100%',
    height: SIZES.height/3,
    resizeMode:"cover"
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding:1.5,
  borderWidth:0.4,
  borderRadius:SIZES.medium,
    marginHorizontal:'auto'
  },

  checkoutButtonText: {
    color: COLORS.white,
    fontFamily: 'bold',
    marginHorizontal:20,
    fontWeight:'600',
    fontSize:13,
    lineHeight:26,
  },


address:{
  lineHeight:26,
  color:COLORS.primary,
  marginVertical:5,
  fontSize:SIZES.large,
  fontFamily: 'bold', 
  fontWeight: 'bold',
},
userInfor:{
lineHeight:26,
  color:COLORS.primary,
  marginVertical:5,
  fontSize:SIZES.medium,
  fontFamily: 'bold', 
  fontWeight: 'bold',
},
menuItem:{
borderBottomWidth:1,
paddingHorizontal:25,
borderColor:COLORS.gray2,
paddingBottom:20
},
productItem: {
    marginBottom: 10,
  },
  productTitle: {
    fontSize: SIZES.medium,
    fontFamily: 'bold',
    color: COLORS.primary,
  },
  productDescription: {
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  productPrice: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  totalRevenueText:{
    fontFamily:"bold",
    fontSize:SIZES.large,
    color:COLORS.black,
    alignItems:"center",
    marginBottom:SIZES.xLarge
  },
});
export default OrderDetail; 
