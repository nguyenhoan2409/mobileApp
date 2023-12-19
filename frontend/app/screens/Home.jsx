import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {useState, useEffect, useCallback, useContext} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SliderBox} from 'react-native-image-slider-box';
import ProductCardView from '../components/ProductCardView';

import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {BottomModal, SlideAnimation, ModalContent} from 'react-native-modals';

import {COLORS, SIZES} from '../constants'
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Home = () => {
  const list = [
    {
      id: '0',
      image:
        'https://th.bing.com/th/id/R.1bee6d4bc26e55bd466f7e52a14649f2?rik=iEWQcHhdRwed1A&pid=ImgRaw&r=0',
      name: 'Bàn',
    },
    {
      id: '1',
      image:
        'https://th.bing.com/th/id/R.bbb193f0e0465f56dbf902b530acea78?rik=bRfwk29PpnO8DQ&riu=http%3a%2f%2fpngimg.com%2fuploads%2fbed%2fbed_PNG17395.png&ehk=pNB%2bkWfzJitTo5PyEMeMpvnOZVuAmhSCNo1%2bfwEfUAY%3d&risl=&pid=ImgRaw&r=0',
      name: 'Giường',
    },
    {
      id: '3',
      image:
        'https://th.bing.com/th/id/R.28ce8a5bd1e631b8cce64181e3505d3f?rik=4m37lXNm6omsZg&pid=ImgRaw&r=0',
      name: 'Ghế',
    },
    {
      id: '4',
      image:
        'https://th.bing.com/th/id/R.11e91286e0e4212e01a11d678a589fd3?rik=DZcWWA3yzXDgiQ&pid=ImgRaw&r=0',
      name: 'Đèn',
    },
    {
      id: '5',
      image:
        'https://p7.hiclipart.com/preview/73/595/750/sink-bathroom-set-the-sink.jpg',
      name: 'Bồn tắm',
    },
    {
      id: '6',
      image:
        'https://th.bing.com/th/id/OIP.mTSCRAo8PvptYtMxV9OwcgHaDO?pid=ImgDet&rs=1',
      name: 'Thảm, gối, chăn',
    },
    {
      id: '6',
      image:
        'https://th.bing.com/th/id/OIP.xjj6DRXcOh4yxwGZjLCZsgHaD3?pid=ImgDet&w=1200&h=627&rs=1',
      name: 'Đồ trang trí',
    },
  ];
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
  const slides = [
    'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
  ];
  

  const navigation = useNavigation();
  
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.searchContainer}>
            <TouchableOpacity>
              <Feather name="search" size={24} style={styles.searchIcon} />
            </TouchableOpacity>
            <View style={styles.searchWrapper}>
              <TextInput
                value=""
                onPressIn={() => {
                  navigation.navigate('Search');
                }}
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

            <View style={styles.cartBtnWrapper}>
              <TouchableOpacity style={styles.cartBtn}>
                <AntDesign
                  name="shoppingcart"
                  size={26}
                  style={styles.cartIcon}
                />
                <View style={styles.cartQuantityWrapper}>
                  <Text style={styles.cartQuantity}>8</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.carouselContainer}>
            <SliderBox
              images={slides}
              dotColor={COLORS.primary}
              inactiveDotColor={COLORS.secondary}
              ImageComponentStyle={{
                borderRadius: 15,
                width: '95%',
                marginTop: 15,
              }}
              autoplay
              circleLoop
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('ProductCateList', {item});
                }}>
                <Image
                  style={{width: 50, height: 50, resizeMode: 'contain'}}
                  source={{uri: item.image}}
                />

                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: '500',
                    marginTop: 5,
                  }}>
                  {item?.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.recommendProductWrapper}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.header}>Đề xuất cho bạn</Text>
              
              <TouchableOpacity onPress={() => {navigation.navigate('RecommendedProducts', productList)}}>
              <Text style={{color: COLORS.gray1, paddingRight: SIZES.small}}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={productList}
              keyExtractor={item => item._id}
              maxToRenderPerBatch={2}
              renderItem={({item, index}) => (
                <ProductCardView item={item} key={index} />
              )}
              horizontal
              contentContainerStyle={{columnGap: SIZES.medium - 5}}></FlatList>
          </View>

          <View style={styles.seenProductWrapper}>
          <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.header}>Sản phẩm đã xem</Text>
              
              <TouchableOpacity onPress={() => navigation.navigate('SeenProducts', productList)}>
              <Text style={{color: COLORS.gray1, paddingRight: SIZES.small}}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>
            {productList.length < 0 ? (
              <Text style={{color: COLORS.black}}>
                Bạn chưa xem sản phẩm nào
              </Text>
            ) : (
              <FlatList
                data={productList}
                keyExtractor={item => item._id}
                renderItem={({item, index}) => (
                  <ProductCardView item={item} key={index} />
                )}
                horizontal
                contentContainerStyle={{
                  columnGap: SIZES.medium - 5,
                }}></FlatList>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: SIZES.xLarge - 2,
    color: COLORS.black,
    paddingBottom: 5,
  },
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
  cartIcon: {
    color: COLORS.black,
    marginTop: SIZES.xSmall,
    marginRight: SIZES.medium,
  },
  cartBtn: {
    borderRadius: SIZES.medium,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  cartBtnWrapper: {
    alignItems: 'center', 
    justifyContent: 'center', 
    // backgroundColor: COLORS.black
    paddingLeft: 5
  },
  cartQuantityWrapper: {
    backgroundColor: COLORS.red,
    width: 18,
    height: 18,
    borderRadius: 18 / 2,
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    bottom: 16,
  },
  cartQuantity: {
    // position: 'absolute',
    // bottom: 28,
    // right: 6,
    // fontWeight: 'bold',
    // color: 'white',
    // zIndex: 999,
    color: COLORS.white,
    fontSize: 12,
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 10,
  },
  recommendProductWrapper: {
    paddingLeft: 10,
  },
  seenProductWrapper: {
    paddingLeft: 10,
    paddingTop: 10,
  },
});
