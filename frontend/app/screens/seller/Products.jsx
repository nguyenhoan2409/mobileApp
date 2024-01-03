import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import React from 'react';
import {useState, useEffect, useCallback, useContext} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SliderBox} from 'react-native-image-slider-box';
import ProductCardView from '../../components/ProductCardView';

import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {BottomModal, SlideAnimation, ModalContent} from 'react-native-modals';

import {COLORS, SIZES} from '../../constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import API from '../../services/GlobalAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

const Products = () => {
  const productList = [
    {
      title: 'Ghế sofa',
      supplier: 'ZONO',
      price: 2000000,
      imageUrl:
        'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
      description: 'Ghế sofa',
    },
    {
      title: 'Ghế sofa',
      supplier: 'ZONO',
      price: 2000000,
      imageUrl:
        'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
      description: 'Ghế sofa',
    },
    {
      title: 'Ghế sofa',
      supplier: 'ZONO',
      price: 2000000,
      imageUrl:
        'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
      description: 'Ghế sofa',
    },
    {
      title: 'Ghế sofa',
      supplier: 'ZONO',
      price: 2000000,
      imageUrl:
        'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
      description: 'Ghế sofa',
    },
  ];
  const navigation = useNavigation();
  const [userToken, setUserToken] = useState('');

  const [recommendedProductList, setRecommendedProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const getList = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      setUserToken(value);
      var recommended_product_list = await API.requestGET_SP(
        `/products/all?token=${value}`,
      );

      if (recommended_product_list) {
        setRecommendedProductList(recommended_product_list);
      } else {
        showMessage({
          message: 'Lỗi get sản phẩm đề xuất',
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
  useEffect(() => {
    getList();
    getCategorylist();
  }, []);

  const getCategorylist = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      var respone = await API.requestGET_SP(`/categories/all?token=${token}`);
      if (respone) {
        setCategoryList(respone);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    navigation.addListener('focus', () => {
      getList(); 
    })
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.searchContainer}>
          <TouchableOpacity>
            <Feather name="search" size={24} style={styles.searchIcon} />
          </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <TextInput
              value=""
              //   onPressIn={() => {
              //     navigation.navigate('Search');
              //   }}
              placeholder="Tìm kiếm sản phẩm"
              style={styles.searchInput}
            />
          </View>

          <View>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons
                name="camera-outline"
                size={SIZES.xLarge}
                color={COLORS.offwhite}
              />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity style={styles.searchBtn} onPress={() => {navigation.navigate('AddProduct', categoryList)}}>
              <Ionicons
                name="add"
                size={SIZES.xLarge}
                color={COLORS.offwhite}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.allProductsWrapper}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.header}>Tất cả sản phẩm</Text>

            <TouchableOpacity>
              <Text style={{color: COLORS.gray1, paddingRight: SIZES.small}}>
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recommendedProductList}
            keyExtractor={item => item._id}
            maxToRenderPerBatch={3}
            renderItem={({item, index}) => (
              <ProductCardView item={item} key={index} />
            )}
            numColumns={2}
            contentContainerStyle={{columnGap: SIZES.medium - 5}}
          />
        </View>

        {/* <View style={styles.bestSellProductWrapper}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.header}>Sản phẩm bán chạy</Text>

            <TouchableOpacity>
              <Text style={{color: COLORS.gray1, paddingRight: SIZES.small}}>
                Xem tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recommendedProductList}
            keyExtractor={item => item._id}
            maxToRenderPerBatch={3}
            renderItem={({item, index}) => (
              <ProductCardView item={item} key={index} />
            )}
            horizontal
            contentContainerStyle={{columnGap: SIZES.medium - 5}}
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Products;
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: 'regular',
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    borderRadius: SIZES.medium,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  allProductsWrapper: {
    paddingLeft: 10,
    paddingTop: 15,
  },
  header: {
    fontWeight: 'bold',
    fontSize: SIZES.xLarge - 2,
    color: COLORS.black,
    paddingBottom: 5,
  },
  bestSellProductWrapper: {
    paddingLeft: 10,
    paddingTop: 15,
  },
});
