import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import ProductDetail from '../screens/ProductDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import API from '../services/GlobalAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartCardView = ({item}) => {
  const navigation = useNavigation();
  const [count, setCount] = useState(item.quantity);
  const [isShowed, setIsShowed] = useState(true); 

  const increment = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); 
      const data = {
        product_id: item.product_id._id,
        quantity: 1
      }
      var incrementProductInCart = await API.requestPOST_SP(`/carts/add-product?userId=${userId}`, data); 
      if (incrementProductInCart) {
        console.log("Đã tăng số lượng sản phẩm lên 1."); 
        setCount(count + 1); 
      } else {
        showMessage({
          message: 'Lỗi tăng số lượng sản phẩm trong giỏ hàng',
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

  const decrement = async () => {
    if (count > 1) {
        try {
            const userId = await AsyncStorage.getItem('userId'); 
            var decrementProductInCart = await API.requestPOST_SP(`/carts/sub-product?userId=${userId}&productId=${item.product_id._id}`); 
            if (decrementProductInCart) {
              console.log("Đã giảm số lượng sản phẩm xuống 1."); 
              setCount(count - 1); 
            } else {
              showMessage({
                message: 'Lỗi giảm số lượng sản phẩm trong giỏ hàng',
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
    }
  };

  const deleteProductInCart = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); 
      var deleteProductInCart = await API.requestPOST_SP(`/carts/delete-product?userId=${userId}&productId=${item.product_id._id}`); 
      if (deleteProductInCart) {
        console.log("Đã xóa sản phẩm trong giỏ hàng."); 
        setIsShowed(false); 
      } else {
        showMessage({
          message: 'Lỗi xóa sản phẩm trong giỏ hàng',
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

//   const increment = e => {
//     e.preventDefault();
//     setCount(count + 1);
//   };
//   const decrement = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     }
//   };

//   const deleteProductInCart = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     }
//   };
  return (
    isShowed && (<View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imgContainer}>
            <Image
              source={{uri: item.product_id.images[0].url}}
              style={styles.image}
            />
          </View>
  
          <View style={styles.details}>
            <Text style={styles.username} numberOfLines={1}>
              {item.product_id.name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.orderid} numberOfLines={1}>
                {item.product_id.originalPrice} VNĐ
              </Text>
            </View>
          </View>
        </View>
  
        <View style={styles.priceWrapper}>
          <TouchableOpacity onPress={() => {
              increment(); 
          }}>
            <SimpleLineIcons name="plus" size={20} />
          </TouchableOpacity>
          <Text style={styles.quantityText}> {count} </Text>
          <TouchableOpacity
            onPress={() => {
              decrement();
            }}>
            <SimpleLineIcons name="minus" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 15, marginRight: 5}}
            onPress={() => {
              deleteProductInCart();
            }}>
            <MaterialIcons name="cancel" size={24} />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.addBtn}>
                      <Ionicons name='add-circle' size={35} color={COLORS.primary} />
                  </TouchableOpacity> */}
      </View>)
  );
};

export default CartCardView;
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
    flexDirection: 'row',
    alignItems: 'center',
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
  quantityText: {
    color: COLORS.black,
  },
});
