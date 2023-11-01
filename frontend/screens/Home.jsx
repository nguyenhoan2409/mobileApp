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
//   { useState, useEffect, useCallback, useContext } from "react";
import {useState} from 'react';
import {useEffect} from 'react';
import {useCallback} from 'react';
import {useContext} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SliderBox} from 'react-native-image-slider-box';
import ProductCardView from '../components/ProductCardView';
//   import axios from "axios";

import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {BottomModal, SlideAnimation, ModalContent} from 'react-native-modals';
//   import AsyncStorage from "@react-native-async-storage/async-storage";
//   import { UserType } from "../UserContext";
//   import jwt_decode from "jwt-decode";
import {COLORS, SIZES} from '../constants/index';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const Home = () => {
  const list = [
    {
      id: '0',
      image: 'https://th.bing.com/th/id/R.1bee6d4bc26e55bd466f7e52a14649f2?rik=iEWQcHhdRwed1A&pid=ImgRaw&r=0',
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
      image: 'https://th.bing.com/th/id/OIP.mTSCRAo8PvptYtMxV9OwcgHaDO?pid=ImgDet&rs=1',
      name: 'Thảm, gối, chăn',
    },
    {
      id: '6',
      image: 'https://th.bing.com/th/id/OIP.xjj6DRXcOh4yxwGZjLCZsgHaD3?pid=ImgDet&w=1200&h=627&rs=1',
      name: 'Đồ trang trí',
    },
  ];
  const productList = [{
    title: 'Ghế sofa', 
    supplier: 'ZONO', 
    price: 2000000,
    imageUrl: 'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
    description: 'Ghế sofa',
  },
  {
    title: 'Ghế sofa', 
    supplier: 'ZONO', 
    price: 2000000,
    imageUrl: 'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
    description: 'Ghế sofa',
  }, 
  {
    title: 'Ghế sofa', 
    supplier: 'ZONO', 
    price: 2000000,
    imageUrl: 'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
    description: 'Ghế sofa',
  }, {
    title: 'Ghế sofa', 
    supplier: 'ZONO', 
    price: 2000000,
    imageUrl: 'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
    description: 'Ghế sofa',
  } 
]
  const slides = [
    'https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif',
    'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg',
  ];
  const deals = [
    {
      id: '20',
      title: 'OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)',
      oldPrice: 25000,
      price: 19000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg',
        'https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg',
      ],
      color: 'Stellar Green',
      size: '6 GB RAM 128GB Storage',
    },
    {
      id: '30',
      title:
        'Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers',
      oldPrice: 74000,
      price: 26000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg',
      ],
      color: 'Cloud Navy',
      size: '8 GB RAM 128GB Storage',
    },
    {
      id: '40',
      title:
        'Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger',
      oldPrice: 16000,
      price: 14000,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg',
        'https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg',
      ],
      color: 'Icy Silver',
      size: '6 GB RAM 64GB Storage',
    },
    {
      id: '40',
      title:
        'realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera',
      oldPrice: 12999,
      price: 10999,
      image:
        'https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg',
      ],
    },
  ];
  const offers = [
    {
      id: '0',
      title:
        'Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)',
      offer: '72% off',
      oldPrice: 7500,
      price: 4500,
      image:
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg',
      ],
      color: 'Green',
      size: 'Normal',
    },
    {
      id: '1',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg',
      ],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '2',
      title: 'Aishwariya System On Ear Wireless On Ear Bluetooth Headphones',
      offer: '40%',
      oldPrice: 7955,
      price: 3495,
      image: 'https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg',
      carouselImages: ['https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg'],
      color: 'black',
      size: 'Normal',
    },
    {
      id: '3',
      title:
        'Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery',
      offer: '40%',
      oldPrice: 24999,
      price: 19999,
      image: 'https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg',
      carouselImages: [
        'https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg',
        'https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg',
        'https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg',
      ],
      color: 'Norway Blue',
      size: '8GB RAM, 128GB Storage',
    },
  ];
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [category, setCategory] = useState('jewelery');
  // const { userId, setUserId } = useContext(UserType);
  const [selectedAddress, setSelectedAdress] = useState('');
  console.log(selectedAddress);
  const [items, setItems] = useState([
    {label: "Men's clothing", value: "men's clothing"},
    {label: 'jewelery', value: 'jewelery'},
    {label: 'electronics', value: 'electronics'},
    {label: "women's clothing", value: "women's clothing"},
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.log('error message', error);
      }
    };

    fetchData();
  }, []);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);

  // const cart = useSelector((state) => state.cart.cart);
  const [modalVisible, setModalVisible] = useState(false);
  // useEffect(() => {
  //   if (userId) {
  //     fetchAddresses();
  //   }
  // }, [userId, modalVisible]);
  // const fetchAddresses = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8000/addresses/${userId}`
  //     );
  //     const { addresses } = response.data;

  //     setAddresses(addresses);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = await AsyncStorage.getItem("authToken");
  //     const decodedToken = jwt_decode(token);
  //     const userId = decodedToken.userId;
  //     setUserId(userId);
  //   };

  //   fetchUser();
  // }, []);
  // console.log("address", addresses);
  return (
    <>
      {/* <SafeAreaView
        style={{
          paddinTop: Platform.OS === 'android' ? 40 : 0,
          flex: 1,
          backgroundColor: 'white',
        }}>
        <ScrollView>
          <View
            style={{
              backgroundColor: '#008E97',
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 7,
                gap: 10,
                backgroundColor: 'white',
                borderRadius: 3,
                height: 38,
                flex: 1,
              }}>
              <AntDesign
                style={{paddingLeft: 10}}
                name="search1"
                size={22}
                color="black"
              />
              <TextInput placeholder="Search Amazon.in" />
            </Pressable>

            <Feather name="mic" size={24} color="black" />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <Pressable
                key={index}
                style={{
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
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

          <SliderBox
            images={images}
            autoPlay
            circleLoop
            dotColor={'#13274F'}
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{width: '100%'}}
          />

          <Text style={{paddingTop: 15, paddingLeft: 5, paddingBottom: 5, fontSize: 20, fontWeight: 'bold', color: 'black'}}>
            Trending Deals of the week
          </Text>
          
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                 } key = {index} 
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 180, height: 180, resizeMode: "contain" }}
                  source={{ uri: item?.image }}
                />
              </Pressable>
            ))}
          </View>

        </ScrollView>
      </SafeAreaView> */}
      <SafeAreaView>
        <ScrollView>
          <View style={styles.searchContainer}>
            <TouchableOpacity>
              <Feather name="search" size={24} style={styles.searchIcon} />
            </TouchableOpacity>
            <View style={styles.serachWrapper}>
              <TextInput
                value=""
                // onPressIn={() => {
                //   navigation.navigate('Search'); //important
                // }}
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
          </View>

          <View style={styles.carouselContainer}>
            <SliderBox images={slides}
                dotColor={COLORS.primary}
                inactiveDotColor={COLORS.secondary}
                ImageComponentStyle={{ borderRadius: 15, width: "95%", marginTop: 15 }}
                autoplay circleLoop />
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
                onPress={() => {navigation.navigate('ProductCateList', {item})}}>
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
            <Text style={styles.header}>Đề xuất cho bạn</Text>
            <FlatList data={productList}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (<ProductCardView item={item} />)} horizontal contentContainerStyle={{ columnGap: SIZES.medium - 5 }}>
            </FlatList>
          </View>

          <View style={styles.seenProductWrapper}>
            <Text style={styles.header}>Sản phẩm đã xem</Text>
            <FlatList data={productList}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (<ProductCardView item={item} />)} horizontal contentContainerStyle={{ columnGap: SIZES.medium - 5 }}>
            </FlatList>
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
    paddingBottom: 5
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },
  serachWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
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
  carouselContainer: { 
    flex: 1, 
    alignItems: 'center', 
    paddingBottom: 10,
  },
  recommendProductWrapper: {
    paddingLeft: 10
  }, 
  seenProductWrapper: {
    paddingLeft: 10, 
    paddingTop: 10
  }
});
