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
import { ScrollView } from 'react-native-virtualized-view';
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
import { launchImageLibrary } from 'react-native-image-picker';

import {COLORS, SIZES} from '../constants';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import API from '../services/GlobalAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import axios from 'axios';


const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');


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
      name: 'Thảm',
    },
    {
      id: '7',
      image:
        'https://png.pngtree.com/png-clipart/20220110/original/pngtree-pillow-png-image_7042813.png',
      name: 'Gối',
    },
    {
      id: '8',
      image:
        'https://th.bing.com/th/id/OIP.vaOm7I3oJ6oiptbnCoI2QQHaD4?rs=1&pid=ImgDetMain',
      name: 'Chăn',
    },
    {
      id: '9',
      image:
        'https://th.bing.com/th/id/OIP.xjj6DRXcOh4yxwGZjLCZsgHaD3?pid=ImgDet&w=1200&h=627&rs=1',
      name: 'Đồ trang trí',
    },
  ];
  const productList = [
    {
      name: 'Ghế sofa',
      supplier: 'ZONO',
      originalPrice: 2000000,
      imageUrl:
        'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
      description: 'Ghế sofa',
    },
    {
      name: 'Ghế sofa',
      supplier: 'ZONO',
      originalPrice: 2000000,
      imageUrl:
        'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
      description: 'Ghế sofa',
    },
    {
      name: 'Ghế sofa',
      supplier: 'ZONO',
      originalPrice: 2000000,
      imageUrl:
        'https://th.bing.com/th/id/OIP.WMZMXQ1kgEqFi9Qfv7o3VAHaHa?pid=ImgDet&rs=1',
      description: 'Ghế sofa',
    },
    {
      name: 'Ghế sofa',
      supplier: 'ZONO',
      originalPrice: 2000000,
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
  

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (response.assets && response.assets.length > 0) {
          const source = { uri: response.assets[0].uri };
          searchWithImage(source.uri);
        } else {
          console.log("No URI returned from Image Picker");
        }
      }
    });
    
    
  };

  const convertImageToBase64 = (uri) => {
    return new Promise((resolve, reject) => {
      fetch(uri)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
        .catch(error => {
          console.error("Error converting image to Base64:", error);
          reject(error);
        });
        
    });
  };
  
  
  const searchWithImage = async (imageUri) => {
    try {
      const imageBase64 = await convertImageToBase64(imageUri);
      const base64EncodedImage = imageBase64.split(',')[1]; // Loại bỏ phần "data:image/jpeg;base64,"
  
      const body = {
        requests: [
          {
            image: {
              content: base64EncodedImage
            },
            features: [
              { type: "LABEL_DETECTION" }
            ],
            imageContext: {
              languageHints: ["vi"]
            }
          }
        ]
      };
  
      const apiKey = 'AIzaSyAO49E_lWfOEAcl1i-x_r4nBlaZdeI9IGI';
      const response = await axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, body);
  
      if (response) {
        console.log(response)
      }
      const labels = response.data.responses[0].labelAnnotations;
      const firstLabel = labels[0].description;
      setSearchQuery(firstLabel);
    } catch (error) {
      if (error.response) {
        console.log("Error Data:", error.response.data);
        console.log("Error Status:", error.response.status);
        console.log("Error Headers:", error.response.headers);
      } else if (error.request) {
        console.log("Error Request:", error.request);
      } else {
        console.log("Error Message:", error.message);
      }
      console.log("Error Config:", error.config);
    }
  };
  

  const navigation = useNavigation();
  const [categoryList, setCategoryList] = useState([]);
  const [recommendedProductList, setRecommendedProductList] = useState([]); 
  const [recentlyViewedProductList, setRecentlyViewedProductList] = useState([]);
  const [quantityInCart, setQuantityInCart] = useState(0);  
  const [userToken, setUserToken] = useState('');
  const [change, setChange] = useState(true); 
  useEffect(() => {
    const getList = async () => {
      try {
        const value = await AsyncStorage.getItem('userToken');
        setUserToken(value); 
        var response = await API.requestGET_SP(
          `/categories/all?token=${value}`,
        );
        var recommended_product_list = await API.requestGET_SP(`/products/all?token=${value}`); 
        if (response) {
          setCategoryList(response);
        } else {
          showMessage({
            message: 'Lỗi get danh mục sản phẩm',
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
    getList();
  }, []);

  const getSeenProductList = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); 
      var recently_viewed_product_list = await API.requestGET_SP(`/users/recentlyViewed/list?id=${userId}`); 
      if (recently_viewed_product_list) {
        setRecentlyViewedProductList(recently_viewed_product_list.recentlyViewedProducts);
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
  
  const getQuantityInCart = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId'); 
      var total = await API.requestGET_SP(`/carts/quantity?userId=${userId}`); 
      if (total) {
        console.log('hello')
         
        setQuantityInCart(total.totalProduct);
      } else {
        showMessage({
          message: 'Lỗi get số lượng sản phẩm trong giỏ hàng',
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

  const updateQuantityIncart = () => {
    setChange(!change);
  }

  useEffect(() => {
    getSeenProductList(); 
    getQuantityInCart();
  }, []); 

  // useEffect(() => {
    
  // }, [change]); 

  useEffect(() => {
    navigation.addListener('focus', () => {
      getSeenProductList(); 
    })
  }, [])
  
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
              value={searchQuery}
              onPressIn={() => {
                navigation.navigate('Search');
              }}
              placeholder="Tìm kiếm sản phẩm"
              style={styles.searchInput}
              onChangeText={setSearchQuery}
            />
            </View>

            <View>
              <TouchableOpacity style={styles.searchBtn} onPress={selectImage}>
                <Ionicons
                  name="camera-outline"
                  size={SIZES.xLarge}
                  color={COLORS.offwhite}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.cartBtnWrapper}>
              <TouchableOpacity style={styles.cartBtn} onPress={() => {navigation.navigate('Cart')}}>
                <AntDesign
                  name="shoppingcart"
                  size={26}
                  style={styles.cartIcon}
                />
                {/* <View style={styles.cartQuantityWrapper}>
                  <Text style={styles.cartQuantity}>{quantityInCart}</Text>
                </View> */}
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={styles.carouselContainer}>
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
          </View> */}

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row'}}>
                {list.map((item, index) => (
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: 'contain',
                      marginLeft: 10,
                    }}
                    key={index}
                    source={{uri: item.image}}
                  />
                ))}
              </View>

              <View style={{flexDirection: 'row'}}>
                {categoryList.map((item, index) => (
                  <Pressable
                    key={item._id}
                    style={{
                      marginLeft: 30,
                      marginBottom: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      navigation.navigate('ProductCateList', {item});
                      navigation.addListener
                    }}>
                    
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
              </View>
            </View>
          </ScrollView>

          <View style={styles.recommendProductWrapper}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.header}>Đề xuất cho bạn</Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RecommendedProducts', recommendedProductList);
                }}>
                <Text style={{color: COLORS.gray1, paddingRight: SIZES.small}}>
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={recommendedProductList}
              keyExtractor={item => item._id}
              maxToRenderPerBatch={2}
              renderItem={({item, index}) => (
                <ProductCardView item={item} key={item._id} />
              )}
              horizontal
              contentContainerStyle={{columnGap: SIZES.medium - 5}} />
          </View>

          <View style={styles.seenProductWrapper}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.header}>Sản phẩm đã xem</Text>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SeenProducts', recentlyViewedProductList)
                }>
                <Text style={{color: COLORS.gray1, paddingRight: SIZES.small}}>
                  Xem tất cả
                </Text>
              </TouchableOpacity>
            </View>
            {recentlyViewedProductList.length == 0 ? (
              <Text style={{color: COLORS.black}}>
                Bạn chưa xem sản phẩm nào
              </Text>
            ) : (
              <FlatList
                data={recentlyViewedProductList}
                keyExtractor={item => item._id}
                renderItem={({item, index}) => (
                  <ProductCardView item={item} key={item._id} />
                )}
                horizontal
                contentContainerStyle={{
                  columnGap: SIZES.medium - 5,
                }} />
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
    paddingLeft: 5,
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
